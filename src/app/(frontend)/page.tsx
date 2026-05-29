import React from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import ArchiveExperience from './ArchiveExperience'
import './styles.css'

export const dynamic = 'force-dynamic'

type RelationshipValue = number | string | { slug?: unknown } | null | undefined

type RawSiteSettings = {
  branding?: {
    lightAccentColor?: unknown
    neutralColor?: unknown
    primaryColor?: unknown
    secondaryColor?: unknown
    tertiaryColor?: unknown
  }
  homepage?: {
    dailyFeaturedPersonality?: RelationshipValue
    editorsChoice?: RelationshipValue[]
    manualFeaturedEndsAt?: unknown
    manualFeaturedPersonality?: RelationshipValue
    manualFeaturedStartsAt?: unknown
    recommendedStories?: RelationshipValue[]
    sponsorAdSlots?: {
      active?: unknown
      placementLabel?: unknown
      placementOrder?: unknown
      sponsor?: RelationshipValue
    }[]
  }
}

const asText = (value: unknown) => (typeof value === 'string' ? value : undefined)

const isDefined = <T,>(value: T | null | undefined): value is T => Boolean(value)

const relationshipSlug = (value: RelationshipValue) => {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  return asText(value.slug)
}

const isWithinManualWindow = (startsAt: unknown, endsAt: unknown) => {
  const now = Date.now()
  const start = asText(startsAt)
  const end = asText(endsAt)
  const startsOk = !start || Date.parse(start) <= now
  const endsOk = !end || Date.parse(end) >= now

  return startsOk && endsOk
}

const getHomepageSettings = async () => {
  try {
    const payload = (await getPayload({ config })) as unknown as {
      findGlobal: (args: Record<string, unknown>) => Promise<RawSiteSettings>
    }
    const settings = await payload.findGlobal({
      depth: 2,
      overrideAccess: true,
      slug: 'site-settings',
    })
    const homepage = settings.homepage || {}
    const manualFeaturedSlug = relationshipSlug(homepage.manualFeaturedPersonality)
    const dailyFeaturedSlug = relationshipSlug(homepage.dailyFeaturedPersonality)
    const manualFeaturedIsActive =
      Boolean(manualFeaturedSlug) &&
      isWithinManualWindow(homepage.manualFeaturedStartsAt, homepage.manualFeaturedEndsAt)
    const featuredPersonalitySource = manualFeaturedIsActive
      ? ('manual' as const)
      : dailyFeaturedSlug
        ? ('daily' as const)
        : undefined
    const sponsorSlots = [...(homepage.sponsorAdSlots || [])]
      .filter((slot) => slot.active !== false)
      .sort((left, right) => Number(left.placementOrder || 99) - Number(right.placementOrder || 99))

    return {
      brandColors: {
        lightAccentColor: asText(settings.branding?.lightAccentColor),
        neutralColor: asText(settings.branding?.neutralColor),
        primaryColor: asText(settings.branding?.primaryColor),
        secondaryColor: asText(settings.branding?.secondaryColor),
        tertiaryColor: asText(settings.branding?.tertiaryColor),
      },
      editorChoiceSlugs: homepage.editorsChoice?.map(relationshipSlug).filter(isDefined),
      featuredPersonalitySource,
      featuredPersonalitySlug: manualFeaturedIsActive ? manualFeaturedSlug : dailyFeaturedSlug,
      recommendedStorySlugs: homepage.recommendedStories?.map(relationshipSlug).filter(isDefined),
      sponsorLabels: Object.fromEntries(
        sponsorSlots
          .map((slot) => {
            const slug = relationshipSlug(slot.sponsor)
            return slug ? [slug, asText(slot.placementLabel) || 'Homepage sponsor'] : null
          })
          .filter(Boolean) as [string, string][],
      ),
      sponsorSlugs: sponsorSlots.map((slot) => relationshipSlug(slot.sponsor)).filter(isDefined),
    }
  } catch {
    return undefined
  }
}

export default async function HomePage() {
  const settings = await getHomepageSettings()

  return <ArchiveExperience settings={settings} />
}
