import config from '@payload-config'
import { getPayload } from 'payload'

import type { Media, Occupation, Person, Place, Topic } from '@/payload-types'
import type { Where } from 'payload'

import {
  initialsFor,
  personalities as staticPersonalities,
  slugify,
  type ArchiveTrack,
  type Personality,
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

const richTextToPlainText = (value: Person['fullBio']) => {
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
    editorsPick: staticMatch?.editorsPick || false,
    era: person.eraLabel || person.birthDateText || staticMatch?.era || 'Current',
    externalVideoNote: cmsVideoIsStale
      ? staticMatch?.externalVideoNote
      : person.externalVideoNote || staticMatch?.externalVideoNote,
    externalVideoSource: cmsVideoIsStale
      ? staticMatch?.externalVideoSource
      : person.externalVideoSource || staticMatch?.externalVideoSource,
    fullBio: richTextToPlainText(person.fullBio) || staticMatch?.fullBio,
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

export const getPersonalityCategoryURL = (category: string) =>
  `/search?category=${encodeURIComponent(category)}`

export const getFallbackSlug = slugify
