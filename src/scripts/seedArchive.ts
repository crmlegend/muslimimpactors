import 'dotenv/config'

import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { getPayload } from 'payload'

process.env.PAYLOAD_MIGRATING = 'true'

import {
  getPersonalityDetailSections,
  getPersonalityStory,
  getPersonalityVideo,
  getStoryChapters,
  getStoryDetailSections,
  getArticleDetail,
  articleRows,
  contributors,
  personalities,
  personalityCategories,
  sourceRows,
  sponsorRows,
  storyRows,
  workflowTests,
} from '../app/(frontend)/archiveData'

const publicSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://muslimimpactors.americanmotivations.com'
).replace(/\/$/, '')

type SeedCollectionSlug =
  | 'ai-jobs'
  | 'articles'
  | 'contributor-applications'
  | 'expert-essays'
  | 'media'
  | 'occupations'
  | 'pages'
  | 'people'
  | 'places'
  | 'social-accounts'
  | 'social-posts'
  | 'sources'
  | 'sponsors'
  | 'stories'
  | 'tags'
  | 'topics'
  | 'users'

type SeedDoc = { id: number | string }

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const durationToSeconds = (duration: string) => {
  const [minutes, seconds] = duration.split(':').map(Number)

  return minutes * 60 + seconds
}

const personTypeFor = (role: string) => {
  const normalized = role.toLowerCase()

  if (normalized.includes('jurist')) return 'jurist'
  if (normalized.includes('hadith')) return 'hadith_scholar'
  if (normalized.includes('historian') || normalized.includes('biographer')) return 'historian'
  if (
    normalized.includes('physician') ||
    normalized.includes('astronomer') ||
    normalized.includes('mathematician') ||
    normalized.includes('engineer') ||
    normalized.includes('inventor')
  ) {
    return 'scientist_physician'
  }
  if (normalized.includes('poet') || normalized.includes('literary') || normalized.includes('writer')) {
    return 'poet_litterateur'
  }
  if (normalized.includes('ruler') || normalized.includes('sultan') || normalized.includes('caliph')) {
    return 'ruler_statesperson'
  }
  if (normalized.includes('founder') || normalized.includes('patron')) return 'institution_builder'
  if (normalized.includes('early community')) return 'early_community_figure'

  return 'scholar'
}

const richText = (text: string) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

const upsertByField = async ({
  collection,
  data,
  field,
  payload,
  value,
}: {
  collection: SeedCollectionSlug
  data: Record<string, unknown>
  field: string
  payload: Awaited<ReturnType<typeof getPayload>>
  value: number | string
}): Promise<SeedDoc> => {
  const api = payload as never as {
    create: (args: Record<string, unknown>) => Promise<SeedDoc>
    find: (args: Record<string, unknown>) => Promise<{ docs: SeedDoc[] }>
    update: (args: Record<string, unknown>) => Promise<SeedDoc>
  }

  const existing = await api.find({
    collection,
    depth: 0,
    limit: 1,
    where: { [field]: { equals: value } },
  })

  if (existing.docs[0]) {
    return api.update({
      collection,
      data,
      id: existing.docs[0].id,
      overrideAccess: true,
    })
  }

  return api.create({
    collection,
    data,
    overrideAccess: true,
  })
}

const upsertBySlug = async ({
  collection,
  data,
  payload,
}: {
  collection: SeedCollectionSlug
  data: Record<string, unknown> & { slug: string }
  payload: Awaited<ReturnType<typeof getPayload>>
}) => upsertByField({ collection, data, field: 'slug', payload, value: data.slug })

const createMediaIfMissing = async ({
  data,
  filePath,
  payload,
}: {
  data: Record<string, unknown> & { title: string }
  filePath: string
  payload: Awaited<ReturnType<typeof getPayload>>
}) => {
  const api = payload as never as {
    create: (args: Record<string, unknown>) => Promise<SeedDoc>
    find: (args: Record<string, unknown>) => Promise<{ docs: SeedDoc[] }>
  }

  const existing = await api.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    where: { title: { equals: data.title } },
  })

  if (existing.docs[0]) return existing.docs[0]

  return api.create({
    collection: 'media',
    data,
    filePath,
    overrideAccess: true,
  })
}

const createSeedMediaFiles = async () => {
  const sharp = (await import('sharp')).default
  const seedDir = path.join(os.tmpdir(), 'epoch-archive-seed-media')
  await mkdir(seedDir, { recursive: true })

  const imageFiles = [
    { color: '#0D76BC', file: 'manuscript-reference.png', label: 'Manuscript reference panel' },
    { color: '#253c59', file: 'portrait-reference.png', label: 'Portrait reference panel' },
    { color: '#7b3f35', file: 'map-reference.png', label: 'Map reference panel' },
    { color: '#6f5a28', file: 'source-card-reference.png', label: 'Source card reference panel' },
  ]

  for (const item of imageFiles) {
    const svg = `
      <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="800" fill="${item.color}"/>
        <rect x="80" y="80" width="1040" height="640" fill="#f5f1e8" opacity="0.14"/>
        <text x="110" y="400" font-size="64" font-family="Georgia" fill="#f5f1e8">${item.label}</text>
        <text x="110" y="470" font-size="28" font-family="Arial" fill="#d8caa4">Seed archive media for local CMS testing</text>
      </svg>
    `

    await sharp(Buffer.from(svg)).png().toFile(path.join(seedDir, item.file))
  }

  const pdfPath = path.join(seedDir, 'expert-essay-submission.pdf')
  const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>endobj
4 0 obj<</Length 152>>stream
BT /F1 18 Tf 72 720 Td (Expert Essay Submission - Seed Document) Tj 0 -32 Td /F1 12 Tf (This PDF models an uploaded expert essay for editor extraction and approval workflow testing.) Tj ET
endstream endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000231 00000 n 
0000000433 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
503
%%EOF`
  await writeFile(pdfPath, pdf)

  return {
    expertPdf: pdfPath,
    images: imageFiles.map((item) => ({
      ...item,
      path: path.join(seedDir, item.file),
    })),
  }
}

const occupationSlugForRole = (role: string) => {
  const normalized = role.toLowerCase()

  if (normalized.includes('historian') || normalized.includes('biographer')) return 'historian'
  if (normalized.includes('astronomer') || normalized.includes('mathematician')) return 'astronomer-mathematician'
  if (normalized.includes('physician')) return 'physician'
  if (normalized.includes('jurist')) return 'jurist'
  if (normalized.includes('hadith')) return 'hadith-scholar'
  if (normalized.includes('poet')) return 'poet'
  if (normalized.includes('architect')) return 'architect'
  if (normalized.includes('ruler') || normalized.includes('sultan') || normalized.includes('caliph')) return 'ruler'
  if (normalized.includes('traveler')) return 'traveler'
  if (normalized.includes('founder') || normalized.includes('patron')) return 'institution-builder'
  if (normalized.includes('philosopher')) return 'philosopher'
  if (normalized.includes('translator')) return 'translator'
  if (normalized.includes('engineer') || normalized.includes('inventor')) return 'engineer'

  return 'scholar'
}

const placeSlugForRegion = (region: string) => {
  const normalized = region.toLowerCase()

  if (normalized.includes('baghdad')) return 'baghdad'
  if (normalized.includes('cairo') || normalized.includes('egypt')) return 'cairo'
  if (normalized.includes('damascus') || normalized.includes('syria')) return 'damascus'
  if (normalized.includes('cordoba') || normalized.includes('andalus')) return 'cordoba'
  if (normalized.includes('fez') || normalized.includes('morocco')) return 'fez'
  if (normalized.includes('nishapur') || normalized.includes('persia')) return 'persia-and-central-asia'
  if (normalized.includes('bukhara')) return 'bukhara'
  if (normalized.includes('delhi') || normalized.includes('india') || normalized.includes('south asia')) return 'delhi'
  if (normalized.includes('istanbul') || normalized.includes('ottoman')) return 'istanbul'
  if (normalized.includes('samarkand') || normalized.includes('khwarazm')) return 'khwarazm'
  if (normalized.includes('medina')) return 'medina'
  if (normalized.includes('mecca')) return 'mecca'
  if (normalized.includes('basra')) return 'basra'
  if (normalized.includes('kufa')) return 'kufa'
  if (normalized.includes('konya') || normalized.includes('anatolia')) return 'konya'
  if (normalized.includes('north africa')) return 'north-africa'
  if (normalized.includes('west africa') || normalized.includes('mali') || normalized.includes('sokoto')) return 'west-africa'

  return 'wider-islamic-world'
}

export const seedArchive = async (options: { includeMedia?: boolean } = {}) => {
  const includeMedia = options.includeMedia ?? true
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const seedMediaFiles = includeMedia ? await createSeedMediaFiles() : null
  const api = payload as never as {
    find: (args: Record<string, unknown>) => Promise<{ docs: Array<Record<string, unknown> & SeedDoc> }>
    update: (args: Record<string, unknown>) => Promise<SeedDoc>
  }
  const userIds = new Map<string, number | string>()
  const mediaIds = new Map<string, number | string>()
  const sourceIds = new Map<string, number | string>()
  const tagIds = new Map<string, number | string>()
  const occupationIds = new Map<string, number | string>()
  const placeIds = new Map<string, number | string>()
  const topicIds = new Map<string, number | string>()
  const personIds = new Map<string, number | string>()
  const storyIds = new Map<string, number | string>()
  const articleIds = new Map<string, number | string>()
  const sponsorIds = new Map<string, number | string>()

  const demoUsers = [
    {
      email: 'writer.researcher@epoch.local',
      name: 'Demo Writer Researcher',
      role: 'writer_researcher',
      topics: ['History and historiography', 'Hadith scholarship'],
    },
    {
      email: 'editor@epoch.local',
      name: 'Demo Editor',
      role: 'editor',
      topics: ['Medicine and philosophy', 'Women in Islamic history'],
    },
    {
      email: 'rights.reviewer@epoch.local',
      name: 'Demo Legal Rights Reviewer',
      role: 'legal_rights_reviewer',
      topics: ['Libraries and translation'],
    },
    {
      email: 'publisher.admin@epoch.local',
      name: 'Demo Publisher Admin',
      role: 'publisher_admin',
      topics: ['Law and governance'],
    },
    {
      email: 'social.manager@epoch.local',
      name: 'Demo Social Manager',
      role: 'social_manager',
      topics: ['Education and reform'],
    },
    {
      email: 'read.only.reviewer@epoch.local',
      name: 'Demo Read Only Reviewer',
      role: 'read_only_reviewer',
      topics: ['Astronomy and mathematics'],
    },
  ]

  for (const category of personalityCategories) {
    const topic = await upsertBySlug({
      collection: 'topics',
      data: {
        description: `Seed research theme for ${category.toLowerCase()}, connected to public personalities, stories, sources, and review workflows.`,
        name: category,
        slug: slugify(category),
        workflowStatus: 'draft',
      },
      payload,
    })

    topicIds.set(category, topic.id)
  }

  for (const category of ['Editorial contributors', 'Reference policy', 'Social publishing']) {
    const topic = await upsertBySlug({
      collection: 'topics',
      data: {
        description: `Operational seed topic for ${category.toLowerCase()} records and internal workflow testing.`,
        name: category,
        slug: slugify(category),
        workflowStatus: 'draft',
      },
      payload,
    })

    topicIds.set(category, topic.id)
  }

  for (const user of demoUsers) {
    const assignedTopics = user.topics.map((topic) => topicIds.get(topic)).filter(Boolean)
    const existing = await api.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      where: { email: { equals: user.email } },
    })

    const data = {
      active: true,
      assignedTopics,
      email: user.email,
      name: user.name,
      notes: 'Seed account for local role and workflow testing. Replace before launch.',
      role: user.role,
    }

    const record = existing.docs[0]
      ? await api.update({
          collection: 'users',
          data,
          id: existing.docs[0].id,
          overrideAccess: true,
        })
      : await (payload as never as { create: (args: Record<string, unknown>) => Promise<SeedDoc> }).create({
          collection: 'users',
          data: {
            ...data,
            password: 'ArchiveDemo123!',
          },
          overrideAccess: true,
        })

    userIds.set(user.role, record.id)
  }

  const contributorApplication = await upsertByField({
    collection: 'contributor-applications',
    data: {
      articleSummary:
        'A sample public submission for a profile on American Muslim mutual-aid organizations and food relief work.',
      biography:
        'Sample contributor biography for testing: an educator interested in public history, Muslim American civic life, and community service records.',
      email: 'sample.author@public.local',
      expertise: 'Education, local history, community documentation',
      name: 'Sample Public Author',
      proposedTopic: 'American Muslim mutual aid and food relief',
      requestedRole: 'author',
      sourceOwnership: 'original',
      status: 'new',
    },
    field: 'email',
    payload,
    value: 'sample.author@public.local',
  })

  userIds.set('sample_public_author_application', contributorApplication.id)

  const mediaRecords = seedMediaFiles
    ? [
    {
      data: {
        altText: 'Seed manuscript media panel for public archive testing.',
        caption: 'Placeholder manuscript panel used to test gallery, source, and page builder workflows.',
        creditLine: 'Seed media generated locally for MVP testing.',
        licenseName: 'Internal demo asset',
        mediaKind: 'image',
        publicDeliveryAllowed: false,
        requiresWatermark: true,
        rightsStatus: 'owned',
        title: 'Seed Manuscript Reference Panel',
        watermarkApplied: false,
        workflowStatus: 'draft',
      },
      filePath: seedMediaFiles.images[0].path,
      key: 'manuscript',
    },
    {
      data: {
        altText: 'Seed portrait media panel for personality cards.',
        caption: 'Placeholder portrait reference used to test personality image workflows.',
        creditLine: 'Seed media generated locally for MVP testing.',
        licenseName: 'Internal demo asset',
        mediaKind: 'image',
        publicDeliveryAllowed: false,
        requiresWatermark: true,
        rightsStatus: 'owned',
        title: 'Seed Portrait Reference Panel',
        watermarkApplied: false,
        workflowStatus: 'draft',
      },
      filePath: seedMediaFiles.images[1].path,
      key: 'portrait',
    },
    {
      data: {
        altText: 'Seed map panel for place and timeline records.',
        caption: 'Placeholder map reference used to test article blocks and place-linked content.',
        creditLine: 'Seed media generated locally for MVP testing.',
        licenseName: 'Internal demo asset',
        mediaKind: 'image',
        publicDeliveryAllowed: false,
        requiresWatermark: true,
        rightsStatus: 'owned',
        title: 'Seed Map Reference Panel',
        watermarkApplied: false,
        workflowStatus: 'draft',
      },
      filePath: seedMediaFiles.images[2].path,
      key: 'map',
    },
    {
      data: {
        caption: 'Uploaded document placeholder for expert essay workflow testing.',
        creditLine: 'Seed document generated locally for MVP testing.',
        licenseName: 'Internal demo asset',
        mediaKind: 'document',
        publicDeliveryAllowed: false,
        rightsStatus: 'owned',
        title: 'Seed Expert Essay Submission PDF',
        workflowStatus: 'draft',
      },
      filePath: seedMediaFiles.expertPdf,
      key: 'expertPdf',
    },
      ]
    : []

  for (const media of mediaRecords) {
    const record = await createMediaIfMissing({
      data: media.data,
      filePath: media.filePath,
      payload,
    })
    mediaIds.set(media.key, record.id)
  }

  const tags = [
    ['Source-backed', 'editorial'],
    ['Open-license starter reference', 'rights'],
    ['Needs rights review', 'rights'],
    ['Editor pick', 'editorial'],
    ['AI video ready', 'ai'],
    ['Timeline ready', 'editorial'],
    ['Manuscript culture', 'theme'],
    ['Public beta showcase', 'general'],
    ['Expert review requested', 'editorial'],
    ['Social excerpt candidate', 'general'],
  ] as const

  for (const [name, tagType] of tags) {
    const tag = await upsertBySlug({
      collection: 'tags',
      data: {
        name,
        slug: slugify(name),
        tagType,
      },
      payload,
    })
    tagIds.set(slugify(name), tag.id)
  }

  const occupations = [
    ['Scholar', 'General learned figure or teacher.'],
    ['Historian', 'Writer or compiler of historical, biographical, or civilizational records.'],
    ['Astronomer Mathematician', 'Scholar of calculation, measurement, astronomy, or mathematical sciences.'],
    ['Physician', 'Medical author, clinician, hospital figure, or commentator.'],
    ['Jurist', 'Legal scholar or public authority in jurisprudence.'],
    ['Hadith Scholar', 'Transmitter, compiler, critic, or commentator of hadith.'],
    ['Poet', 'Poet, literary artist, or devotional writer.'],
    ['Architect', 'Architect, builder, patron of structures, or visual culture figure.'],
    ['Ruler', 'Political ruler, administrator, or public statesperson.'],
    ['Traveler', 'Traveler, geographer, envoy, or route witness.'],
    ['Institution Builder', 'Founder or patron of institutions, schools, libraries, or public works.'],
    ['Philosopher', 'Philosopher, theologian, logician, or metaphysical author.'],
    ['Translator', 'Translator, language mediator, or library-connected scholar.'],
    ['Engineer', 'Engineer, inventor, instrument maker, or craft scientist.'],
  ]

  for (const [name, description] of occupations) {
    const occupation = await upsertBySlug({
      collection: 'occupations',
      data: {
        description,
        name,
        slug: slugify(name),
      },
      payload,
    })
    occupationIds.set(slugify(name), occupation.id)
  }

  const places = [
    ['Baghdad', 'city', 'Abbasid capital and major center for learning, translation, libraries, medicine, and court culture.'],
    ['Cairo', 'city', 'Major center for scholarship, administration, manuscript culture, hospitals, and public institutions.'],
    ['Damascus', 'city', 'Longstanding center for hadith, law, history, and scholarly teaching networks.'],
    ['Cordoba', 'city', 'Andalusian center for learning, governance, medicine, philosophy, and literary culture.'],
    ['Fez', 'city', 'North African center connected to al-Qarawiyyin, patronage, and education.'],
    ['Persia and Central Asia', 'region', 'Broad seed region for figures connected to Persianate and Central Asian scholarly networks.'],
    ['Bukhara', 'city', 'Important Transoxanian city associated with hadith, law, and scholarship.'],
    ['Delhi', 'city', 'South Asian center for education, reform, poetry, and political history.'],
    ['Istanbul', 'city', 'Ottoman capital connected to architecture, governance, manuscripts, and museums.'],
    ['Khwarazm', 'region', 'Region associated with mathematics, astronomy, geography, and scholarly travel.'],
    ['Medina', 'city', 'Early community center tied to hadith, law, and formative historical memory.'],
    ['Mecca', 'city', 'Pilgrimage and scholarly transmission center.'],
    ['Basra', 'city', 'Iraqi city linked to language, piety, theology, and early intellectual life.'],
    ['Kufa', 'city', 'Iraqi city linked to law, hadith, language, and early scholarship.'],
    ['Konya', 'city', 'Anatolian center connected to poetry, Sufism, and public memory.'],
    ['North Africa', 'region', 'Regional seed node for Maghribi historians, travelers, and institutions.'],
    ['West Africa', 'region', 'Regional seed node for education, reform, governance, and manuscript networks.'],
    ['Wider Islamic World', 'region', 'Fallback regional index for records spanning multiple places.'],
  ] as const

  for (const [name, placeType, description] of places) {
    const place = await upsertBySlug({
      collection: 'places',
      data: {
        description,
        name,
        placeType,
        slug: slugify(name),
      },
      payload,
    })
    placeIds.set(slugify(name), place.id)
  }

  const sourceSeedRows = [
    ...sourceRows.map((source) => ({
      fullCitation: `${source.title}. ${source.note}`,
      shortCitation: source.title,
      sourceType: 'other',
      title: source.title,
      url: 'https://en.wikipedia.org/',
    })),
    {
      authors: [{ name: 'Wikipedia contributors' }],
      fullCitation:
        'Wikipedia contributors. "Ibn Khaldun." Wikipedia, The Free Encyclopedia. Used as a starter reference requiring attribution and editorial verification.',
      publication: 'Wikipedia',
      publicationDateText: 'Accessed May 2, 2026',
      shortCitation: 'Wikipedia: Ibn Khaldun',
      sourceType: 'web_article',
      title: 'Ibn Khaldun',
      url: 'https://en.wikipedia.org/wiki/Ibn_Khaldun',
    },
    {
      authors: [{ name: 'Wikipedia contributors' }],
      fullCitation:
        'Wikipedia contributors. "Al-Biruni." Wikipedia, The Free Encyclopedia. Used as a starter reference requiring attribution and editorial verification.',
      publication: 'Wikipedia',
      publicationDateText: 'Accessed May 2, 2026',
      shortCitation: 'Wikipedia: Al-Biruni',
      sourceType: 'web_article',
      title: 'Al-Biruni',
      url: 'https://en.wikipedia.org/wiki/Al-Biruni',
    },
    {
      authors: [{ name: 'Wikipedia contributors' }],
      fullCitation:
        'Wikipedia contributors. "Avicenna." Wikipedia, The Free Encyclopedia. Used as a starter reference requiring attribution and editorial verification.',
      publication: 'Wikipedia',
      publicationDateText: 'Accessed May 2, 2026',
      shortCitation: 'Wikipedia: Ibn Sina / Avicenna',
      sourceType: 'web_article',
      title: 'Avicenna',
      url: 'https://en.wikipedia.org/wiki/Avicenna',
    },
    {
      fullCitation:
        'Muslim Impactors Editorial Team. "Seed expert interview transcript." Private transcript model for rights and workflow testing.',
      interviewDetails: {
        interviewee: 'Dr. Maryam Siddiqui',
        interviewer: 'Muslim Impactors Editorial Team',
        location: 'Remote editorial review',
        mediaType: 'Text transcript',
      },
      mediaType: 'text',
      shortCitation: 'Seed expert transcript: historiography review',
      sourceType: 'private_interview',
      title: 'Seed expert interview transcript',
    },
  ]

  for (const source of sourceSeedRows) {
    const record = await upsertByField({
      collection: 'sources',
      data: {
        ...source,
        relatedTopics: [topicIds.get('Reference policy')].filter(Boolean),
        rightsStatus: source.sourceType === 'private_interview' ? 'restricted' : 'permission_pending',
        workflowStatus: 'draft',
      },
      field: 'shortCitation',
      payload,
      value: source.shortCitation,
    })
    sourceIds.set(source.shortCitation, record.id)
  }

  for (const person of personalities) {
    const video = getPersonalityVideo(person)
    const detailSections = getPersonalityDetailSections(person)
    const publicReferences = [
      `Wikipedia starter reference: https://en.wikipedia.org/wiki/${person.wikipediaTitle}`,
      `WikiShia search starter: https://en.wikishia.net/index.php?search=${encodeURIComponent(person.name)}`,
    ]

    const record = await upsertBySlug({
      collection: 'people',
      data: {
        archiveTrack:
          person.theme === 'muslims_in_history' ? 'golden_age_history' : 'american_civic_impact',
        editorApproved: false,
        eraLabel: person.era,
        externalVideoNote: video.note,
        externalVideoSource: video.source,
        externalVideoUrl: `https://www.youtube.com/watch?v=${video.embedId}`,
        nationality: person.region,
        name: person.name,
        personType: personTypeFor(person.role),
        primaryWorks: `${person.summary}\n\nStarter references:\n${publicReferences.join('\n')}`,
        relatedTopics: topicIds.get(person.category) ? [topicIds.get(person.category)] : [],
        relatedPlaces: [placeIds.get(placeSlugForRegion(person.region))].filter(Boolean),
        rightsCleared: false,
        scholarlyTradition: person.category,
        seo: {
          description: person.summary,
          title: `${person.name} | Muslim Impactors`,
        },
        shortBio: `${person.summary} ${detailSections[0]?.body || ''}`,
        slug: person.slug,
        sources: [
          sourceIds.get(`Wikipedia: ${person.name}`),
          sourceIds.get('Open encyclopedia reference'),
          sourceIds.get('Wikipedia: Ibn Khaldun'),
        ].filter(Boolean),
        tags: [
          tagIds.get('source-backed'),
          person.editorsPick ? tagIds.get('editor-pick') : undefined,
          tagIds.get('open-license-starter-reference'),
        ].filter(Boolean),
        occupations: [occupationIds.get(occupationSlugForRole(person.role))].filter(Boolean),
        workflowStatus: 'draft',
        youtubeEmbedId: video.embedId,
      },
      payload,
    })

    personIds.set(person.slug, record.id)
  }

  for (const contributor of contributors) {
    const contributorTopicId = topicIds.get('Editorial contributors')
    const record = await upsertBySlug({
      collection: 'people',
      data: {
        archiveTrack: 'contributor',
        editorApproved: false,
        name: contributor.name,
        personType: 'expert_contributor',
        primaryWorks: contributor.focus,
        relatedTopics: contributorTopicId ? [contributorTopicId] : [],
        rightsCleared: false,
        scholarlyTradition: 'Editorial contributor',
        shortBio: `${contributor.role}. ${contributor.focus}`,
        slug: slugify(contributor.name),
        tags: [tagIds.get('expert-review-requested'), tagIds.get('source-backed')].filter(Boolean),
        workflowStatus: 'draft',
      },
      payload,
    })

    personIds.set(slugify(contributor.name), record.id)
  }

  const storiesToSeed = [...storyRows]

  for (const person of personalities) {
    if (!storiesToSeed.some((story) => story.name === person.name)) {
      storiesToSeed.push(getPersonalityStory(person))
    }
  }

  for (const story of storiesToSeed) {
    const person = personalities.find((item) => item.name === story.name)
    if (!person) continue

    const video = getPersonalityVideo(person, story)
    const chapters = getStoryChapters(person)
    const storySections = getStoryDetailSections(story, person)
    const storySlug = story.slug || slugify(story.story || `${story.name} story`)

    const storyRecord = await upsertBySlug({
      collection: 'stories',
      data: {
        durationSeconds: durationToSeconds(story.length),
        externalVideoNote: video.note,
        externalVideoSource: video.source,
        externalVideoUrl: `https://www.youtube.com/watch?v=${video.embedId}`,
        format: 'video',
        body: richText(
          storySections
            .map((section) => `${section.heading}\n${section.body.join('\n\n')}`)
            .join('\n\n'),
        ),
        primaryPerson: personIds.get(person.slug),
        placesMentioned: [placeIds.get(placeSlugForRegion(person.region))].filter(Boolean),
        rightsCleared: false,
        rightsStatus: 'unknown',
        seo: {
          description: story.summary,
          title: `${story.story} | Muslim Impactors`,
        },
        slug: storySlug,
        storyOrder: storiesToSeed.findIndex((item) => (item.slug || item.story) === (story.slug || story.story)) + 1,
        summary: story.summary,
        sources: [
          sourceIds.get(`Wikipedia: ${person.name}`),
          sourceIds.get('Open encyclopedia reference'),
          sourceIds.get('Seed expert transcript: historiography review'),
        ].filter(Boolean),
        tags: [
          tagIds.get('source-backed'),
          tagIds.get('timeline-ready'),
          tagIds.get('ai-video-ready'),
        ].filter(Boolean),
        themes: topicIds.get(person.category) ? [topicIds.get(person.category)] : [],
        title: story.story,
        transcript: richText(chapters.map((chapter) => `${chapter.title}: ${chapter.transcript}`).join('\n\n')),
        transcriptSegments: chapters.map((chapter) => ({
          endSeconds: chapter.startSeconds + durationToSeconds(chapter.duration),
          speaker: story.name,
          startSeconds: chapter.startSeconds,
          text: chapter.transcript,
        })),
        workflowStatus: 'draft',
        youtubeEmbedId: video.embedId,
      },
      payload,
    })

    storyIds.set(storySlug, storyRecord.id)
  }

  const articleSeeds = [...articleRows]

  for (const article of articleSeeds) {
    const articleType =
      article.kind === 'Institution'
        ? 'organization'
        : article.kind === 'Historical Event'
          ? 'historical_event'
          : article.kind === 'Policy'
            ? 'policy'
            : article.kind === 'Object'
              ? 'technical_milestone'
              : 'concept'
    const detail = getArticleDetail(article)
    const linkedPeople = detail.relatedPeople.map(slugify)
      .map((slug) => personIds.get(slug))
      .filter(Boolean)
    const linkedStories = [
      'writing-history-as-a-science-of-society',
      'measuring-the-earth-reading-cultures',
      'medicine-method-and-the-canon-tradition',
    ]
      .map((slug) => storyIds.get(slug))
      .filter(Boolean)
    const linkedSources = [
      sourceIds.get('Wikipedia: Ibn Khaldun'),
      sourceIds.get('Wikipedia: Al-Biruni'),
      sourceIds.get('Wikipedia: Ibn Sina / Avicenna'),
    ].filter(Boolean)

    const record = await upsertBySlug({
      collection: 'articles',
      data: {
        articleType,
        editorApproved: false,
        infobox: detail.infobox,
        leadSummary: article.summary,
        relatedPeople: linkedPeople,
        relatedPlaces: [placeIds.get('baghdad'), placeIds.get('cairo')].filter(Boolean),
        relatedStories: linkedStories,
        relatedTopics: [topicIds.get('Reference policy'), topicIds.get('Libraries and translation')].filter(Boolean),
        rightsCleared: false,
        sections: detail.sections.map((section) => ({
          body: richText(section.body.join('\n\n')),
          heading: section.heading,
          sectionSources: linkedSources,
        })),
        seo: {
          description: article.summary,
          title: `${article.title} | Muslim Impactors`,
        },
        slug: article.slug,
        sources: linkedSources,
        title: article.title,
        workflowStatus: 'draft',
      },
      payload,
    })

    articleIds.set(article.slug, record.id)
  }

  const personIdList = Array.from(personIds.values())
  const storyIdList = Array.from(storyIds.values())
  const articleIdList = Array.from(articleIds.values())

  for (const sponsor of sponsorRows) {
    const sponsorRecord = await upsertBySlug({
      collection: 'sponsors',
      data: {
        editorApproved: false,
        name: sponsor.name,
        adPlacementOrder: sponsorRows.findIndex((item) => item.slug === sponsor.slug) + 1,
        bannerLabel: sponsor.adLabel,
        homepageAdEnabled: true,
        primaryCallToActionLabel: sponsor.websiteLabel,
        primaryCallToActionUrl: sponsor.websiteUrl,
        publicCreditLine: `Research support provided by ${sponsor.name}.`,
        slug: sponsor.slug,
        sponsorType:
          sponsor.type === 'Campaign'
            ? 'campaign'
            : sponsor.type === 'Foundation'
              ? 'foundation'
              : 'organization',
        sponsoredArticles: articleIdList.slice(0, 4),
        sponsoredPeople: personIdList.slice(0, 8),
        sponsoredStories: storyIdList.slice(0, 6),
        sponsorPageDetails: sponsor.details?.map((detail) => `${detail.heading}: ${detail.body}`).join('\n\n'),
        summary: sponsor.summary,
        websiteUrl: sponsor.websiteUrl,
        workflowStatus: 'draft',
      },
      payload,
    })

    sponsorIds.set(sponsor.slug, sponsorRecord.id)
  }

  const settingsApi = payload as never as {
    updateGlobal: (args: Record<string, unknown>) => Promise<unknown>
  }

  await settingsApi.updateGlobal({
    slug: 'site-settings',
    data: {
      branding: {
        lightAccentColor: '#E1DFDE',
        neutralColor: '#FFFFFF',
        primaryColor: '#0D76BC',
        secondaryColor: '#F2673C',
        tertiaryColor: '#DF5A32',
      },
      homepageCopy: {
        leftRailBody:
          'A focused rail for scholars, institution builders, physicians, jurists, scientists, and artists who shaped the intellectual foundations behind the archive.',
        leftRailButtonLabel: 'Open Golden Age Index',
        leftRailEyebrow: 'From The Golden Age',
        leftRailHeading: 'From The Golden Age',
        rightRailEyebrow: 'Our Sponsors',
        rightRailHeading: 'Our Sponsors',
        showLeftRailBody: false,
        showRightRailBody: false,
      },
      homepage: {
        dailyFeaturedPersonality: personIds.get('keith-ellison') || personIdList[0],
        editorsChoice: [
          personIds.get('keith-ellison'),
          personIds.get('ilhan-omar'),
          personIds.get('rashida-tlaib'),
          personIds.get('andre-carson'),
          personIds.get('nusrat-choudhury'),
          personIds.get('zahid-quraishi'),
          personIds.get('hamdi-ulukaya'),
          personIds.get('shahid-khan'),
          personIds.get('aziz-sancar'),
          personIds.get('zia-mian'),
        ].filter(Boolean),
        goldenAgeHighlights: [
          personIds.get('ibn-khaldun'),
          personIds.get('al-biruni'),
          personIds.get('fatima-al-fihri'),
          personIds.get('ibn-sina'),
          personIds.get('al-jazari'),
          personIds.get('mimar-sinan'),
        ].filter(Boolean),
        recommendedStories: [
          storyIds.get('service-sacrifice-and-american-muslim-memory'),
          storyIds.get('enterprise-philanthropy-and-community-care'),
          storyIds.get('science-research-and-public-good'),
          storyIds.get('american-muslim-public-life-and-humanity'),
        ].filter(Boolean),
        sponsorAdSlots: [
          'switzerland-of-asia',
          'hashim-group',
          'patient-benefits-foundation',
          'emirates',
        ]
          .map((slug, index) => {
            const sponsor = sponsorRows.find((item) => item.slug === slug)
            const id = sponsorIds.get(slug)

            if (!id || !sponsor) return null

            return {
              active: true,
              placementLabel: sponsor.adLabel || 'Homepage sponsor',
              placementOrder: index + 1,
              sponsor: id,
            }
          })
          .filter(Boolean),
      },
    },
    overrideAccess: true,
  })

  const essaySeeds = [
    {
      expert: 'dr-maryam-siddiqui',
      slug: 'reading-ibn-khaldun-for-institutional-history',
      title: 'Reading Ibn Khaldun for Institutional History',
      topic: 'History and historiography',
    },
    {
      expert: 'omar-faruqi',
      slug: 'how-editors-should-treat-manuscript-metadata',
      title: 'How Editors Should Treat Manuscript Metadata',
      topic: 'Calligraphy and book arts',
    },
    {
      expert: 'dr-hamza-qureshi',
      slug: 'source-hierarchy-in-tafsir-and-hadith-pages',
      title: 'Source Hierarchy in Tafsir and Hadith Pages',
      topic: 'Tafsir and hadith',
    },
    {
      expert: 'layla-rahman',
      slug: 'turning-biography-into-a-public-story-chapter',
      title: 'Turning Biography into a Public Story Chapter',
      topic: 'Editorial contributors',
    },
  ]

  for (const essay of essaySeeds) {
    await upsertBySlug({
      collection: 'expert-essays',
      data: {
        authorDashboard: {
          editableDraft: richText(`Seed editable draft for ${essay.title}. Editors can paste extracted Word/PDF content here, revise it, and then move the final approved version into the body field.`),
          extractedText: `Extracted seed text for ${essay.title}.`,
          sourceDocument: mediaIds.get('expertPdf'),
          submissionReceivedAt: new Date().toISOString(),
          submissionSource: 'pdf',
          submissionStatus: 'editing',
        },
        body: richText(`${essay.title} is a seed expert essay connected to source review, editorial approval, and public article relationships. Replace with approved expert text before publication.`),
        editorApproved: false,
        expert: personIds.get(essay.expert),
        expertApproved: false,
        expertTitle: 'Seed expert contributor',
        pullQuotes: [{ quote: 'Seed quote for testing pull-quote display and approval workflow.' }],
        relatedArticles: [articleIds.get('source-confidence'), articleIds.get('muqaddimah')].filter(Boolean),
        relatedPeople: [personIds.get('ibn-khaldun'), personIds.get('al-biruni')].filter(Boolean),
        relatedStories: [storyIds.get('writing-history-as-a-science-of-society')].filter(Boolean),
        relatedTopics: [topicIds.get(essay.topic)].filter(Boolean),
        requiredCreditLine: `By ${contributors.find((contributor) => slugify(contributor.name) === essay.expert)?.name || 'Seed Expert Contributor'}, for Muslim Impactors seed review.`,
        rightsCleared: false,
        rightsStatus: 'permission_pending',
        seo: {
          description: `Seed expert essay for ${essay.topic}.`,
          title: `${essay.title} | Muslim Impactors`,
        },
        slug: essay.slug,
        sources: [sourceIds.get('Seed expert transcript: historiography review')].filter(Boolean),
        title: essay.title,
        workflowStatus: 'draft',
      },
      payload,
    })
  }

  const pageSeeds = [
    {
      pagePurpose: 'landing',
      slug: 'home-research-showcase',
      title: 'Home Research Showcase',
    },
    {
      pagePurpose: 'topic_landing',
      slug: 'themes-research-hub',
      title: 'Themes Research Hub',
    },
    {
      pagePurpose: 'collection',
      slug: 'personalities-collection-model',
      title: 'Personalities Collection Model',
    },
    {
      pagePurpose: 'about',
      slug: 'source-and-rights-policy',
      title: 'Source and Rights Policy',
    },
  ]

  for (const page of pageSeeds) {
    await upsertBySlug({
      collection: 'pages',
      data: {
        editorApproved: false,
        layoutBlocks: [
          {
            blockType: 'hero',
            body: 'Seed page-builder layout with reusable blocks, connected records, and editorial review fields.',
            heading: page.title,
            image: mediaIds.get('manuscript'),
            kicker: 'Seed page module',
            primaryLinkLabel: 'Open personalities',
            primaryLinkUrl: '/personalities',
          },
          {
            blockType: 'featuredPeople',
            heading: 'Featured personalities',
            people: ['ibn-khaldun', 'al-biruni', 'ibn-sina', 'fatima-al-fihri']
              .map((slug) => personIds.get(slug))
              .filter(Boolean),
          },
          {
            blockType: 'featuredStories',
            heading: 'Featured story chapters',
            stories: [
              'writing-history-as-a-science-of-society',
              'measuring-the-earth-reading-cultures',
              'medicine-method-and-the-canon-tradition',
            ]
              .map((slug) => storyIds.get(slug))
              .filter(Boolean),
          },
          {
            blockType: 'featuredArticles',
            articles: ['source-confidence', 'house-of-wisdom', 'muqaddimah']
              .map((slug) => articleIds.get(slug))
              .filter(Boolean),
            heading: 'Reference articles',
          },
          {
            blockType: 'sourceTable',
            heading: 'Starter sources',
            sources: [
              sourceIds.get('Wikipedia: Ibn Khaldun'),
              sourceIds.get('Wikipedia: Al-Biruni'),
              sourceIds.get('Open encyclopedia reference'),
            ].filter(Boolean),
          },
        ],
        pagePurpose: page.pagePurpose,
        rightsCleared: false,
        seo: {
          description: `${page.title} seed page for testing the admin page builder.`,
          title: `${page.title} | Muslim Impactors`,
        },
        slug: page.slug,
        title: page.title,
        workflowStatus: 'draft',
      },
      payload,
    })
  }

  const aiJobs = [
    {
      inputCollection: 'stories',
      inputDocumentId: String(storyIds.get('writing-history-as-a-science-of-society') || ''),
      jobType: 'qa_index',
      outputDraft: 'Seed Q&A index draft: answer only from transcript, sources, and connected article summaries.',
      promptSummary: 'Create reader-search chunks for Ibn Khaldun story transcript and source notes.',
      status: 'needs_review',
    },
    {
      inputCollection: 'people',
      inputDocumentId: String(personIds.get('al-biruni') || ''),
      jobType: 'video_script',
      outputDraft: 'Seed documentary script outline for Al-Biruni with AI disclosure and source review reminders.',
      promptSummary: 'Draft a short literature-style educational video script from approved database content.',
      status: 'queued',
    },
    {
      inputCollection: 'articles',
      inputDocumentId: String(articleIds.get('source-confidence') || ''),
      jobType: 'citation_check',
      outputDraft: 'Seed citation checklist: verify URL, license, access date, claim support, and attribution language.',
      promptSummary: 'Check whether article claims have attached sources and rights status.',
      status: 'needs_review',
    },
  ]

  for (const job of aiJobs) {
    await upsertByField({
      collection: 'ai-jobs',
      data: {
        ...job,
        costEstimate: 0.24,
        model: 'future-rag-agent',
        provider: 'Internal AI workflow placeholder',
        reviewedBy: userIds.get('editor'),
      },
      field: 'promptSummary',
      payload,
      value: job.promptSummary,
    })
  }

  const socialAccounts = [
    {
      active: false,
      connectedBy: userIds.get('publisher_admin'),
      connectedEntityType: 'company_page',
      displayName: 'Muslim Impactors - LinkedIn Seed',
      externalAccountId: 'demo-linkedin-page',
      notes: 'Demo account only. OAuth connection is intentionally not active.',
      platform: 'linkedin',
      tokenReference: 'not-connected-demo-linkedin',
    },
    {
      active: false,
      connectedBy: userIds.get('publisher_admin'),
      connectedEntityType: 'organization',
      displayName: 'Muslim Impactors - X Seed',
      externalAccountId: 'demo-x-page',
      notes: 'Demo account only. OAuth connection is intentionally not active.',
      platform: 'x',
      tokenReference: 'not-connected-demo-x',
    },
  ]

  const socialAccountIds: Array<number | string> = []
  for (const account of socialAccounts) {
    const record = await upsertByField({
      collection: 'social-accounts',
      data: account,
      field: 'displayName',
      payload,
      value: account.displayName,
    })
    socialAccountIds.push(record.id)
  }

  const socialPosts = [
    {
      sourceContentType: 'story',
      sourceStory: storyIds.get('writing-history-as-a-science-of-society'),
      title: 'Launch excerpt: Ibn Khaldun story chapter',
    },
    {
      sourceArticle: articleIds.get('source-confidence'),
      sourceContentType: 'article',
      title: 'Reference article: source confidence',
    },
    {
      sourceContentType: 'person',
      sourcePerson: personIds.get('fatima-al-fihri'),
      title: 'Personality spotlight: Fatima al-Fihri',
    },
  ]

  for (const post of socialPosts) {
    await upsertByField({
      collection: 'social-posts',
      data: {
        ...post,
        analyticsSnapshot: { clicks: 0, comments: 0, likes: 0, shares: 0 },
        approvalStatus: 'draft',
        platformVariants: [
          {
            hashtags: '#AmericanMuslims #DigitalArchive #Education',
            link: publicSiteUrl,
            platform: 'linkedin',
            postText: `${post.title}. Seed social draft for approval workflow testing.`,
          },
          {
            hashtags: '#AmericanMuslims #Archive',
            link: publicSiteUrl,
            platform: 'x',
            postText: `${post.title}. Seed draft, not connected to live publishing.`,
          },
        ],
        remotePostIds: {},
        scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        targetAccounts: socialAccountIds,
      },
      field: 'title',
      payload,
      value: post.title,
    })
  }

  payload.logger.info(
    `Seeded connected archive data: ${personalityCategories.length + 3} topics, ${personalities.length + contributors.length} people/contributors, ${storiesToSeed.length} stories, ${articleSeeds.length} articles, ${essaySeeds.length} essays, ${pageSeeds.length} pages, ${workflowTests.length} workflow checklist items reflected in jobs/social drafts.`,
  )
}

const isDirectRun =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1] || '').href

if (isDirectRun) {
  await seedArchive()
  process.exit(0)
}
