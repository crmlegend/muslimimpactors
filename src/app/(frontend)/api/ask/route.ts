import config from '@payload-config'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { articleRows, personalities, sourceRows, storyRows } from '../../archiveData'

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const scoreText = (query: string, text: string) => {
  const terms = normalize(query).split(/\s+/).filter((term) => term.length > 2)
  const haystack = normalize(text)

  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0)
}

export const POST = async (request: NextRequest) => {
  const body = (await request.json().catch(() => ({}))) as {
    helpMode?: boolean
    question?: string
  }
  const question = typeof body.question === 'string' ? body.question.trim() : ''

  if (!question) {
    return Response.json({ error: 'Question is required.' }, { status: 400 })
  }

  const peopleMatches = personalities
    .map((person) => ({
      href: person.href,
      label: person.name,
      score: scoreText(question, `${person.name} ${person.role} ${person.category} ${person.summary}`),
      summary: `${person.name} is indexed as ${person.role.toLowerCase()} in ${person.category}. ${person.summary}`,
      type: 'Profile',
    }))
    .filter((item) => item.score > 0)
  const storyMatches = storyRows
    .map((story) => ({
      href: story.href,
      label: story.story,
      score: scoreText(question, `${story.story} ${story.name} ${story.role} ${story.summary}`),
      summary: `${story.story} connects ${story.name} to ${story.summary.toLowerCase()}`,
      type: 'Story',
    }))
    .filter((item) => item.score > 0)
  const articleMatches = articleRows
    .map((article) => ({
      href: `/articles/${article.slug}`,
      label: article.title,
      score: scoreText(question, `${article.title} ${article.kind} ${article.summary}`),
      summary: `${article.title} is an article page covering ${article.summary.toLowerCase()}`,
      type: 'Article',
    }))
    .filter((item) => item.score > 0)

  const ranked = [...peopleMatches, ...storyMatches, ...articleMatches]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  const fallback = personalities
    .filter((person) => person.theme === 'american_muslims')
    .slice(0, 3)
    .map((person) => ({
      href: person.href,
      label: person.name,
      score: 1,
      summary: `${person.name} is part of the American Muslim profile index: ${person.summary}`,
      type: 'Profile',
    }))

  const matches = ranked.length > 0 ? ranked : fallback
  const answer = body.helpMode
    ? `I found ${matches.length} relevant archive records. For a help request, start with ${matches[0].label}; if that does not answer the visitor question, the team can review the request from the AI Jobs / help queue. ${matches.map((match) => match.summary).join(' ')}`
    : `Based on the current archive dataset, ${matches.map((match) => match.summary).join(' ')}`

  if (body.helpMode) {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'ai-jobs',
      data: {
        inputCollection: 'public-help-widget',
        jobType: 'qa_index',
        model: 'local-archive-search-mvp',
        outputDraft: answer,
        promptSummary: question,
        provider: 'MVP internal responder',
        status: 'needs_review',
      },
      overrideAccess: true,
    })
  }

  return Response.json({
    answer,
    citations: [
      ...matches.map((match) => ({
        href: match.href,
        label: match.label,
        type: match.type,
      })),
      {
        href: '/sources',
        label: sourceRows[0]?.title || 'Source library',
        type: 'Source',
      },
    ],
  })
}
