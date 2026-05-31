import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'

import { isSuperAdminRole } from '@/access/roles'

type CommandMode = 'execute' | 'preview'

type CommandResult = {
  canExecute: boolean
  message: string
  operations: {
    details: string
    status: 'blocked' | 'completed' | 'preview'
    title: string
  }[]
  warnings: string[]
}

const archiveTracks = {
  'american civic impact': 'american_civic_impact',
  'american civic': 'american_civic_impact',
  'civic impact': 'american_civic_impact',
  contributor: 'contributor',
  'global modern impact': 'global_modern_impact',
  'global modern': 'global_modern_impact',
  'golden age history': 'golden_age_history',
  'golden age': 'golden_age_history',
  history: 'golden_age_history',
  other: 'other',
} as const

const sourceTypesByUrl = [
  { pattern: /youtu\.?be|youtube\.com/i, sourceType: 'online_video' },
  { pattern: /\.pdf(?:$|[?#])/i, sourceType: 'document_scan' },
] as const

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const sponsorSlugCandidates = (name: string) =>
  Array.from(
    new Set(
      [
        slugify(name),
        slugify(
          name.replace(
            /\b(airline|airlines|airways|company|companies|corporation|corp|foundation|group|inc|incorporated|limited|llc|ltd|organization)\b/gi,
            ' ',
          ),
        ),
      ].filter(Boolean),
    ),
  )

const getArchiveTrack = (prompt: string) => {
  const normalized = normalizeName(prompt)
  const match = Object.entries(archiveTracks).find(([label]) => normalized.includes(label))

  return match?.[1]
}

const getUrls = (prompt: string) =>
  Array.from(prompt.matchAll(/https?:\/\/[^\s),]+/gi)).map((match) => match[0])

const getYouTubeEmbedId = (url: string) => {
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/)
  const embedMatch = url.match(/youtube(?:-nocookie)?\.com\/embed\/([^?&/]+)/)

  return watchMatch?.[1] || shortMatch?.[1] || embedMatch?.[1]
}

const listTermsAfterLabel = (prompt: string, label: string) => {
  const match = prompt.match(new RegExp(`${label}s?\\s*:\\s*([\\s\\S]+)`, 'i'))
  const text = match?.[1]

  if (!text) {
    return []
  }

  return text
    .split(/[\n,;]+/)
    .map((item) => item.replace(/^[-*0-9.)\s]+/, '').trim())
    .filter(Boolean)
}

const quotedTerms = (prompt: string) =>
  Array.from(prompt.matchAll(/["“”']([^"“”']+)["“”']/g))
    .map((match) => match[1]?.trim())
    .filter((value): value is string => Boolean(value))

const sponsorTerms = (prompt: string) => {
  const addMatch = prompt.match(/add\s+(.+?)\s+as\s+(?:a\s+)?sponsor/i)
  const labeled = listTermsAfterLabel(prompt, 'sponsor')
  const quoted = quotedTerms(prompt)

  return Array.from(
    new Set(
      [
        ...labeled,
        ...quoted,
        addMatch?.[1]
          ?.replace(/\b(the|new|draft|public|published)\b/gi, '')
          .replace(/\s+/g, ' ')
          .trim(),
      ].filter((value): value is string => Boolean(value && value.length > 1)),
    ),
  )
}

const sourceTitleForUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const sourceTypeForUrl = (url: string) =>
  sourceTypesByUrl.find((entry) => entry.pattern.test(url))?.sourceType || 'web_article'

const findPeopleInPrompt = async ({
  payload,
  prompt,
  user,
}: {
  payload: Awaited<ReturnType<typeof getPayload>>
  prompt: string
  user: unknown
}) => {
  const result = await payload.find({
    collection: 'people',
    limit: 500,
    overrideAccess: false,
    pagination: false,
    user,
  })
  const normalizedPrompt = normalizeName(prompt)
  const explicitTerms = [...listTermsAfterLabel(prompt, 'name'), ...quotedTerms(prompt)].map(normalizeName)
  const updatesAllPeople =
    /\ball\s+(public\s+)?personalit/i.test(prompt) || /\ball\s+people\b/i.test(prompt)

  if (updatesAllPeople) {
    return result.docs
  }

  return result.docs.filter((person) => {
    const name = normalizeName(person.name)
    const slug = normalizeName(person.slug)

    return (
      normalizedPrompt.includes(name) ||
      explicitTerms.some((term) => term === name || term === slug || name.includes(term))
    )
  })
}

const createAuditJob = async ({
  mode,
  payload,
  prompt,
  result,
  user,
}: {
  mode: CommandMode
  payload: Awaited<ReturnType<typeof getPayload>>
  prompt: string
  result: CommandResult
  user: unknown
}) =>
  payload.create({
    collection: 'ai-jobs',
    data: {
      jobType: 'other',
      model: 'controlled-command-v0',
      outputDraft: JSON.stringify(result, null, 2),
      promptSummary: prompt,
      provider: 'Admin AI Command Center',
      status:
        mode === 'execute' && result.operations.some((operation) => operation.status === 'completed')
          ? 'approved'
          : 'needs_review',
    },
    overrideAccess: false,
    user,
  })

export const POST = async (request: NextRequest) => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })

  if (!isSuperAdminRole(user)) {
    return Response.json({ message: 'Super admin access is required.' }, { status: 403 })
  }

  const body = (await request.json()) as { mode?: CommandMode; prompt?: string }
  const prompt = body.prompt?.trim() || ''
  const mode: CommandMode = body.mode === 'execute' ? 'execute' : 'preview'

  if (!prompt) {
    return Response.json({ message: 'Prompt is required.' }, { status: 400 })
  }

  const operations: CommandResult['operations'] = []
  const warnings: string[] = []

  if (/archive|track|type/i.test(prompt)) {
    const archiveTrack = getArchiveTrack(prompt)
    const matchedPeople = await findPeopleInPrompt({ payload, prompt, user })

    if (!archiveTrack) {
      warnings.push('No supported archive track was detected.')
    } else if (!matchedPeople.length) {
      warnings.push('No matching people records were found by name or slug.')
    } else {
      if (mode === 'execute') {
        await Promise.all(
          matchedPeople.map((person) =>
            payload.update({
              collection: 'people',
              data: { archiveTrack },
              id: person.id,
              overrideAccess: false,
              user,
            }),
          ),
        )
      }

      operations.push({
        details: `${matchedPeople.map((person) => person.name).join(', ')} -> ${archiveTrack}`,
        status: mode === 'execute' ? 'completed' : 'preview',
        title: `Update archive track on ${matchedPeople.length} people record(s)`,
      })
    }
  }

  const youtubeUrl = getUrls(prompt).find((url) => getYouTubeEmbedId(url))

  if (youtubeUrl && /video|youtube|external/i.test(prompt)) {
    const embedId = getYouTubeEmbedId(youtubeUrl)
    const matchedPeople = await findPeopleInPrompt({ payload, prompt, user })

    if (!embedId) {
      warnings.push('A YouTube URL was found, but no embed ID could be parsed.')
    } else if (!matchedPeople.length) {
      warnings.push('No matching people records were found for the video update.')
    } else {
      if (mode === 'execute') {
        await Promise.all(
          matchedPeople.map((person) =>
            payload.update({
              collection: 'people',
              data: {
                externalVideoNote:
                  'Approved by super admin through Admin AI Command Center. Verify relevance and rights before public promotion.',
                externalVideoSource: 'Admin AI Command Center',
                externalVideoUrl: youtubeUrl,
                youtubeEmbedId: embedId,
              },
              id: person.id,
              overrideAccess: false,
              user,
            }),
          ),
        )
      }

      operations.push({
        details: `${matchedPeople.map((person) => person.name).join(', ')} -> ${youtubeUrl}`,
        status: mode === 'execute' ? 'completed' : 'preview',
        title: `Update external YouTube video on ${matchedPeople.length} people record(s)`,
      })
    }
  }

  if (/sponsor/i.test(prompt)) {
    const names = sponsorTerms(prompt)

    for (const name of names) {
      const slugs = sponsorSlugCandidates(name)
      const slug = slugs[0]
      const existing = await payload.find({
        collection: 'sponsors',
        limit: 1,
        overrideAccess: false,
        user,
        where: {
          or: slugs.map((candidate) => ({
            slug: {
              equals: candidate,
            },
          })),
        },
      })

      if (existing.docs.length) {
        const existingSponsor = existing.docs[0]
        operations.push({
          details: `${name} already exists as ${existingSponsor.slug}.`,
          status: 'preview',
          title: 'Skip existing sponsor',
        })
        continue
      }

      if (mode === 'execute') {
        await payload.create({
          collection: 'sponsors',
          data: {
            bannerLabel: 'Sponsor research draft',
            homepageAdEnabled: false,
            name,
            slug,
            sponsorPageDetails:
              'Draft sponsor profile created by the Admin AI Command Center. Add verified humanitarian work, Muslim community relevance, official links, and approved public claims before publishing.',
            sponsorType: 'organization',
            summary: `${name} sponsor research draft. Verify official website, public-benefit work, source links, and approved sponsor copy before publishing.`,
            workflowStatus: 'draft',
          },
          overrideAccess: false,
          user,
        })
      }

      operations.push({
        details: `${name} -> draft sponsor record (${slug})`,
        status: mode === 'execute' ? 'completed' : 'preview',
        title: 'Create draft sponsor',
      })
    }

    if (!names.length) {
      warnings.push('Sponsor command detected, but no sponsor names were parsed.')
    }
  }

  const urls = getUrls(prompt)

  if (/source|reference|url/i.test(prompt) && urls.length) {
    for (const url of urls) {
      if (mode === 'execute') {
        const title = sourceTitleForUrl(url)

        await payload.create({
          collection: 'sources',
          data: {
            accessedDate: new Date().toISOString(),
            fullCitation: `${title}. Web source candidate added by Admin AI Command Center. URL: ${url}`,
            reliabilityNotes:
              'Created as a source candidate. Verify author, date, publisher, reliability, and rights before publication.',
            rightsNotes: 'Rights unknown. Review before reuse.',
            rightsStatus: 'unknown',
            shortCitation: title,
            sourceType: sourceTypeForUrl(url),
            title,
            url,
            workflowStatus: 'draft',
          },
          overrideAccess: false,
          user,
        })
      }

      operations.push({
        details: url,
        status: mode === 'execute' ? 'completed' : 'preview',
        title: 'Create draft source record',
      })
    }
  }

  if (!operations.length) {
    operations.push({
      details:
        'This request will be saved to AI Jobs for developer/editor review. Direct code, schema, permission, deployment, and secret changes are intentionally not executed from production chat.',
      status: 'blocked',
      title: 'Capture implementation request',
    })
  }

  const result: CommandResult = {
    canExecute: operations.every((operation) => operation.status !== 'blocked'),
    message:
      mode === 'execute'
        ? 'Command processed. Review the operation log before making additional changes.'
        : 'Preview generated. Use Execute only when the planned changes are correct.',
    operations,
    warnings,
  }

  await createAuditJob({ mode, payload, prompt, result, user })

  return Response.json(result)
}
