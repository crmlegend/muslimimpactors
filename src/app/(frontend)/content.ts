import config from '@payload-config'
import { getPayload } from 'payload'

import type { Media, Occupation, Person, Place, Sponsor, Story, Topic } from '@/payload-types'
import type { Where } from 'payload'

import {
  initialsFor,
  personalities as staticPersonalities,
  sponsorRows,
  storyRows,
  slugify,
  type ArchiveTrack,
  type DisplayRegion,
  type Personality,
  type SponsorRow,
  type StoryRow,
} from './archiveData'

type RelationshipValue<T> = number | T

const personTypeLabels: Record<Person['personType'], string> = {
  author: 'Author',
  early_community_figure: 'Companion or early community figure',
  expert_contributor: 'Expert contributor',
  hadith_scholar: 'Hadith scholar',
  historian: 'Historian',
  institutional_contact: 'Institutional contact',
  institution_builder: 'Institution builder',
  interviewer: 'Interviewer',
  jurist: 'Jurist',
  narrator: 'Narrator',
  other: 'Public figure',
  poet_litterateur: 'Poet or litterateur',
  ruler_statesperson: 'Ruler or statesperson',
  scholar: 'Scholar',
  scientist_physician: 'Scientist or physician',
}

const archiveTrackLabels: Record<ArchiveTrack, string> = {
  american_civic_impact: 'American civic impact',
  contributor: 'Contributor',
  global_modern_impact: 'Global modern impact',
  golden_age_history: 'Golden Age history',
  other: 'Archive profile',
}

const sponsorTypeLabels: Record<Sponsor['sponsorType'], string> = {
  campaign: 'Campaign',
  family: 'Family',
  foundation: 'Foundation',
  individual: 'Individual',
  institution: 'Institution',
  organization: 'Organization',
}

const tones = ['#0D76BC', '#173653', '#F2673C', '#DF5A32', '#4B8DC4', '#5D6F7F', '#C95135']

const isObjectRelation = <T extends object>(value: RelationshipValue<T> | null | undefined): value is T =>
  Boolean(value && typeof value === 'object')

const relationNames = <T extends { name?: string }>(values?: RelationshipValue<T>[] | null) =>
  values?.filter(isObjectRelation).map((value) => value.name).filter(Boolean) || []

const firstRelationName = <T extends { name?: string }>(values?: RelationshipValue<T>[] | null) =>
  relationNames(values)[0]

const mediaURL = (media?: RelationshipValue<Media> | null) => {
  if (!isObjectRelation(media)) {
    return undefined
  }

  return media.sizes?.public?.url || media.url || media.thumbnailURL || undefined
}

const fallbackWikipediaTitle = (name: string) => name.replace(/\s+/g, '_')

const toneForSlug = (slug: string) => {
  const total = Array.from(slug).reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return tones[total % tones.length]
}

const themeForTrack = (archiveTrack: ArchiveTrack): Personality['theme'] =>
  archiveTrack === 'golden_age_history' ? 'muslims_in_history' : 'american_muslims'

const nonEmptyText = (value?: string | null) => {
  const text = value?.trim()

  return text || undefined
}

const lexicalText = (node: unknown): string => {
  if (!node || typeof node !== 'object') {
    return ''
  }

  const value = node as { children?: unknown; text?: unknown }

  if (typeof value.text === 'string') {
    return value.text
  }

  if (Array.isArray(value.children)) {
    return value.children.map(lexicalText).join('')
  }

  return ''
}

type LexicalValue = { root?: { children?: unknown } } | null | undefined

const richTextToPlainText = (value: LexicalValue) => {
  const root = value?.root as { children?: unknown } | undefined

  if (!Array.isArray(root?.children)) {
    return undefined
  }

  const paragraphs = root.children
    .map((child) => lexicalText(child).trim())
    .filter(Boolean)

  return paragraphs.length ? paragraphs.join('\n\n') : undefined
}

const isStaleSeedVideo = (person: Person) => {
  const note = person.externalVideoNote || ''

  return Boolean(
    person.youtubeEmbedId &&
      (person.youtubeEmbedId === 'BpeZAm7rKHY' ||
        note.startsWith('Theme-level seed embed') ||
        note.startsWith('Person-specific seed embed')),
  )
}

const mapCMSPersonality = (person: Person, index: number): Personality => {
  const staticMatch = staticPersonalities.find((item) => item.slug === person.slug)
  const archiveTrack = (person.archiveTrack || staticMatch?.archiveTrack || 'other') as ArchiveTrack
  const topicName = firstRelationName<Topic>(person.relatedTopics)
  const occupationName = firstRelationName<Occupation>(person.occupations)
  const placeName = firstRelationName<Place>(person.relatedPlaces)
  const role = person.displayTitle || occupationName || personTypeLabels[person.personType]
  const category =
    person.scholarlyTradition || topicName || staticMatch?.category || archiveTrackLabels[archiveTrack]
  const region = person.nationality || person.birthPlace || placeName || staticMatch?.region || 'Archive'
  const cmsVideoIsStale = isStaleSeedVideo(person)

  return {
    archiveTrack,
    category,
    countryCode: nonEmptyText(person.countryCode) || staticMatch?.countryCode,
    createdAt: person.createdAt || staticMatch?.createdAt,
    displayPriority: person.displayPriority || staticMatch?.displayPriority || 500,
    displayRegion: (person.displayRegion ||
      staticMatch?.displayRegion ||
      (archiveTrack === 'american_civic_impact' ? 'us' : 'global')) as DisplayRegion,
    editorsPick: staticMatch?.editorsPick || false,
    era: person.eraLabel || person.birthDateText || staticMatch?.era || 'Current',
    externalVideoNote: cmsVideoIsStale
      ? staticMatch?.externalVideoNote
      : person.externalVideoNote || staticMatch?.externalVideoNote,
    externalVideoSource: cmsVideoIsStale
      ? staticMatch?.externalVideoSource
      : person.externalVideoSource || staticMatch?.externalVideoSource,
    fullBio: richTextToPlainText(person.fullBio) || staticMatch?.fullBio,
    homepageDisplayEnabled:
      person.homepageDisplayEnabled ??
      staticMatch?.homepageDisplayEnabled ??
      archiveTrack === 'american_civic_impact',
    hoverBannerText:
      nonEmptyText(person.hoverBannerText) || staticMatch?.hoverBannerText || person.shortBio,
    href: `/personalities/${person.slug}`,
    imageUrl: mediaURL(person.portrait) || staticMatch?.imageUrl,
    initials: initialsFor(person.name),
    name: person.name,
    popularity: staticMatch?.popularity || 900 - index,
    region,
    role,
    slug: person.slug,
    summary: person.shortBio,
    theme: themeForTrack(archiveTrack),
    todayRelevance: staticMatch?.todayRelevance,
    tone: staticMatch?.tone || toneForSlug(person.slug),
    wikipediaTitle: staticMatch?.wikipediaTitle || fallbackWikipediaTitle(person.name),
    youtubeEmbedId: cmsVideoIsStale
      ? staticMatch?.youtubeEmbedId
      : person.youtubeEmbedId || staticMatch?.youtubeEmbedId,
  }
}

const fallbackSponsorPeople = (sponsor: Pick<SponsorRow, 'slug'>) =>
  staticPersonalities
    .filter((person, index) => (index + sponsor.slug.length) % sponsorRows.length === 0)
    .slice(0, 6)

const fallbackSponsorStories = (sponsor: Pick<SponsorRow, 'slug'>) =>
  storyRows
    .filter((story, index) => (index + sponsor.slug.length) % sponsorRows.length === 0)
    .slice(0, 5)

const durationLabel = (durationSeconds?: number | null) => {
  if (!durationSeconds || durationSeconds <= 0) {
    return undefined
  }

  const minutes = Math.max(1, Math.round(durationSeconds / 60))

  return `${minutes} min`
}

const mapCMSStoryRow = (story: Story, index: number): StoryRow => {
  const staticMatch = storyRows.find((item) => item.slug === story.slug)
  const primaryPerson = isObjectRelation<Person>(story.primaryPerson)
    ? mapCMSPersonality(story.primaryPerson, index)
    : undefined

  return {
    body: richTextToPlainText(story.body) || staticMatch?.body || story.summary,
    embedId: story.youtubeEmbedId || staticMatch?.embedId,
    href: `/stories/${story.slug}`,
    length: durationLabel(story.durationSeconds) || staticMatch?.length || 'Story chapter',
    name: primaryPerson?.name || staticMatch?.name || 'Archive record',
    role: primaryPerson?.role || staticMatch?.role || 'Story record',
    slug: story.slug,
    story: story.title,
    summary: story.summary,
  }
}

const mapCMSSponsor = (sponsor: Sponsor, _index: number): SponsorRow => {
  const staticMatch = sponsorRows.find((item) => item.slug === sponsor.slug)
  const fallbackForRelationships = staticMatch || {
    slug: sponsor.slug,
  }
  const relationshipPeople =
    sponsor.sponsoredPeople
      ?.filter(isObjectRelation<Person>)
      .filter((person) => person.workflowStatus === 'published')
      .map(mapCMSPersonality)
      .slice(0, 6) || []
  const relationshipStories =
    sponsor.sponsoredStories
      ?.filter(isObjectRelation<Story>)
      .filter((story) => story.workflowStatus === 'published')
      .map(mapCMSStoryRow)
      .slice(0, 5) || []
  const detailSections =
    sponsor.detailSections
      ?.map((section) => ({
        body: nonEmptyText(section.body),
        heading: nonEmptyText(section.heading),
      }))
      .filter((section): section is { body: string; heading: string } =>
        Boolean(section.body && section.heading),
      ) ||
    staticMatch?.details ||
    (sponsor.sponsorPageDetails
      ? [
          {
            body: sponsor.sponsorPageDetails,
            heading: 'Overview',
          },
        ]
      : undefined)
  const impactHighlights =
    sponsor.impactHighlights
      ?.map((highlight) => ({
        body: nonEmptyText(highlight.body),
        label: nonEmptyText(highlight.label),
        value: nonEmptyText(highlight.value),
      }))
      .filter((highlight): highlight is { body: string; label: string; value: string } =>
        Boolean(highlight.body && highlight.label && highlight.value),
      ) || staticMatch?.impactHighlights
  const recognitionPoints =
    sponsor.recognitionPoints?.map((item) => nonEmptyText(item.point)).filter(Boolean) ||
    staticMatch?.recognitionPoints

  return {
    adLabel: sponsor.bannerLabel || staticMatch?.adLabel,
    bannerImage: mediaURL(sponsor.bannerImage) || mediaURL(sponsor.logo) || staticMatch?.bannerImage,
    details: detailSections,
    focus:
      nonEmptyText(sponsor.focus) ||
      staticMatch?.focus ||
      'Sponsor support connected to public archive presentation.',
    gratitudeStatement: sponsor.gratitudeStatement || staticMatch?.gratitudeStatement,
    href: `/sponsors/${sponsor.slug}`,
    impactHighlights,
    name: sponsor.name,
    recognitionPoints: recognitionPoints as string[] | undefined,
    slug: sponsor.slug,
    sponsoredPeople: relationshipPeople.length
      ? relationshipPeople
      : fallbackSponsorPeople(fallbackForRelationships),
    sponsoredStories: relationshipStories.length
      ? relationshipStories
      : fallbackSponsorStories(fallbackForRelationships),
    summary: sponsor.summary,
    type: sponsorTypeLabels[sponsor.sponsorType],
    websiteLabel:
      sponsor.primaryCallToActionLabel ||
      staticMatch?.websiteLabel ||
      (sponsor.websiteUrl ? 'Visit sponsor website' : undefined),
    websiteUrl: sponsor.primaryCallToActionUrl || sponsor.websiteUrl || staticMatch?.websiteUrl,
  }
}

const findCMSPersonalities = async (where?: Where) => {
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'people',
    depth: 2,
    limit: 300,
    pagination: false,
    sort: 'name',
    where: where || {
      workflowStatus: {
        equals: 'published',
      },
    },
  })
}

const findCMSSponsors = async (where?: Where) => {
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'sponsors',
    depth: 2,
    limit: 100,
    pagination: false,
    sort: 'adPlacementOrder',
    where: where || {
      workflowStatus: {
        equals: 'published',
      },
    },
  })
}

const staticSponsorBySlug = new Map(sponsorRows.map((sponsor) => [sponsor.slug, sponsor]))

const mergeSponsorsWithStaticFallback = (cmsSponsors: SponsorRow[]) => {
  if (!cmsSponsors.length) {
    return sponsorRows
  }

  const cmsBySlug = new Map(cmsSponsors.map((sponsor) => [sponsor.slug, sponsor]))
  const mergedStaticSponsors = sponsorRows.map((sponsor) => cmsBySlug.get(sponsor.slug) || sponsor)
  const cmsOnlySponsors = cmsSponsors.filter((sponsor) => !staticSponsorBySlug.has(sponsor.slug))

  return [...mergedStaticSponsors, ...cmsOnlySponsors]
}

export const getPublicPersonalities = async () => {
  try {
    const result = await findCMSPersonalities()
    const cmsPersonalities = result.docs.map(mapCMSPersonality)

    return cmsPersonalities.length ? cmsPersonalities : staticPersonalities
  } catch (error) {
    console.error('Falling back to static personalities after CMS query failed', error)
    return staticPersonalities
  }
}

export const getPublicPersonalityBySlug = async (slug: string) => {
  try {
    const result = await findCMSPersonalities({
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          workflowStatus: {
            equals: 'published',
          },
        },
      ],
    })
    const person = result.docs[0]

    return person ? mapCMSPersonality(person, 0) : staticPersonalities.find((item) => item.slug === slug)
  } catch (error) {
    console.error(`Falling back to static personality "${slug}" after CMS query failed`, error)
    return staticPersonalities.find((item) => item.slug === slug)
  }
}

export const getPublicSponsors = async () => {
  try {
    const result = await findCMSSponsors()
    const cmsSponsors = result.docs.map(mapCMSSponsor)

    return mergeSponsorsWithStaticFallback(cmsSponsors)
  } catch (error) {
    console.error('Falling back to static sponsors after CMS query failed', error)
    return sponsorRows
  }
}

export const getPublicSponsorBySlug = async (slug: string) => {
  try {
    const result = await findCMSSponsors({
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          workflowStatus: {
            equals: 'published',
          },
        },
      ],
    })
    const sponsor = result.docs[0]

    return sponsor ? mapCMSSponsor(sponsor, 0) : sponsorRows.find((item) => item.slug === slug)
  } catch (error) {
    console.error(`Falling back to static sponsor "${slug}" after CMS query failed`, error)
    return sponsorRows.find((item) => item.slug === slug)
  }
}

export const getPersonalityCategoryURL = (category: string) =>
  `/search?category=${encodeURIComponent(category)}`

export const getFallbackSlug = slugify
