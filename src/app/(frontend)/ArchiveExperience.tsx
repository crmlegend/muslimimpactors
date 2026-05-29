'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import ArchiveHeader from './ArchiveHeader'
import {
  canFetchWikipediaSummary,
  editorsPicks,
  featuredPersonality,
  getPersonalityStory,
  getPersonalityVideo,
  getRelatedStoriesForPerson,
  historicalPersonalities,
  popularPersonalities,
  sponsorRows,
  storyRows,
  youtubeVideos,
} from './archiveData'

type ArchiveExperienceSettings = {
  brandColors?: {
    lightAccentColor?: string
    neutralColor?: string
    primaryColor?: string
    secondaryColor?: string
    tertiaryColor?: string
  }
  homepageCopy?: {
    leftRailBody?: string
    leftRailButtonLabel?: string
    leftRailEyebrow?: string
    leftRailHeading?: string
    rightRailEyebrow?: string
    rightRailHeading?: string
  }
  editorChoiceSlugs?: string[]
  featuredPersonalitySource?: 'daily' | 'manual'
  featuredPersonalitySlug?: string
  recommendedStorySlugs?: string[]
  sponsorLabels?: Record<string, string>
  sponsorSlugs?: string[]
}

type ArchiveExperienceProps = {
  settings?: ArchiveExperienceSettings
}

const uniqueBySlug = <T extends { slug: string }>(items: T[]) => {
  const seen = new Set<string>()

  return items.filter((item) => {
    if (seen.has(item.slug)) {
      return false
    }

    seen.add(item.slug)
    return true
  })
}

const isDefined = <T,>(value: T | null | undefined): value is T => Boolean(value)

const professionalFeatureSlugs = new Set([
  'keith-ellison',
  'ilhan-omar',
  'rashida-tlaib',
  'andre-carson',
  'huma-abedin',
  'nusrat-choudhury',
  'zahid-quraishi',
  'hamdi-ulukaya',
  'shahid-khan',
  'jawed-karim',
  'aziz-sancar',
  'muhammad-suhail-zubairy',
  'zia-mian',
  'ayesha-jalal',
  'talal-asad',
  'akbar-ahmed',
  'fareed-zakaria',
  'khaled-hosseini',
  'laila-lalami',
  'humayun-khan',
  'kareem-rashad-sultan-khan',
  'james-yee',
  'ahmed-kousay-al-taie',
])

export default function ArchiveExperience({ settings }: ArchiveExperienceProps) {
  const [portraitImages, setPortraitImages] = useState<Record<string, string>>({})
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(null)
  const configuredFeaturedPersonality = popularPersonalities.find(
    (person) => person.slug === settings?.featuredPersonalitySlug,
  )
  const shouldUseConfiguredFeatured = configuredFeaturedPersonality
    ? professionalFeatureSlugs.has(configuredFeaturedPersonality.slug)
    : false
  const activeFeaturedPersonality =
    shouldUseConfiguredFeatured && configuredFeaturedPersonality
      ? configuredFeaturedPersonality
      : featuredPersonality
  const portraitPeople = useMemo(
    () =>
      uniqueBySlug([
        activeFeaturedPersonality,
        ...popularPersonalities.filter((person) => person.slug !== activeFeaturedPersonality.slug),
      ]).slice(0, 24),
    [activeFeaturedPersonality],
  )
  const goldenAgePeople = useMemo(
    () =>
      historicalPersonalities
        .filter((person) =>
          [
            'Ibn Khaldun',
            'Al-Biruni',
            'Fatima al-Fihri',
            'Ibn Sina',
            'Al-Khwarizmi',
            'Ibn al-Haytham',
            'Al-Jazari',
            'Mimar Sinan',
          ].includes(person.name),
        )
        .slice(0, 8),
    [],
  )
  const editorChoicePeople =
    settings?.editorChoiceSlugs
      ?.map((slug) => popularPersonalities.find((person) => person.slug === slug))
      .filter(isDefined) || editorsPicks
  const recommendedStories =
    settings?.recommendedStorySlugs
      ?.map((slug) => storyRows.find((story) => story.slug === slug))
      .filter(isDefined) || storyRows.slice(0, 6)
  const sponsorAds =
    settings?.sponsorSlugs
      ?.map((slug) => sponsorRows.find((sponsor) => sponsor.slug === slug))
      .filter(isDefined) || sponsorRows
  const brandStyle = {
    '--brand-light': settings?.brandColors?.lightAccentColor || '#E1DFDE',
    '--brand-neutral': settings?.brandColors?.neutralColor || '#FFFFFF',
    '--brand-primary': settings?.brandColors?.primaryColor || '#0D76BC',
    '--brand-secondary': settings?.brandColors?.secondaryColor || '#F2673C',
    '--brand-tertiary': settings?.brandColors?.tertiaryColor || '#DF5A32',
  } as React.CSSProperties
  const homepageCopy = {
    leftRailBody:
      settings?.homepageCopy?.leftRailBody ||
      'A focused rail for scholars, institution builders, physicians, jurists, scientists, and artists who shaped the intellectual foundations behind the archive.',
    leftRailButtonLabel: settings?.homepageCopy?.leftRailButtonLabel || 'Open Golden Age Index',
    leftRailEyebrow: settings?.homepageCopy?.leftRailEyebrow || 'From The Golden Age',
    leftRailHeading: settings?.homepageCopy?.leftRailHeading || 'Muslims in History',
    rightRailEyebrow: settings?.homepageCopy?.rightRailEyebrow || 'Our Sponsors',
    rightRailHeading: settings?.homepageCopy?.rightRailHeading || 'Project Sponsors',
  }
  const selectedPerson = selectedPersonSlug
    ? popularPersonalities.find((person) => person.slug === selectedPersonSlug)
    : null
  const selectedStory = selectedPerson ? getPersonalityStory(selectedPerson) : null
  const selectedVideo =
    selectedPerson && selectedStory ? getPersonalityVideo(selectedPerson, selectedStory) : null
  const selectedRelatedStories = selectedPerson ? getRelatedStoriesForPerson(selectedPerson) : []

  const logVisitorEvent = useCallback(
    (event: {
      eventType: string
      metadata?: string
      targetSlug?: string
      targetType?: string
    }) => {
      if (typeof window === 'undefined') {
        return
      }

      const storageKey = 'muslim-impactors-visitor-id'
      const existingId = window.localStorage.getItem(storageKey)
      const visitorId =
        existingId ||
        `mi-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

      if (!existingId) {
        window.localStorage.setItem(storageKey, visitorId)
      }

      void fetch('/api/visitor-event', {
        body: JSON.stringify({
          ...event,
          path: window.location.pathname,
          visitorId,
        }),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        method: 'POST',
      }).catch(() => undefined)
    },
    [],
  )

  useEffect(() => {
    const controller = new AbortController()
    const people = portraitPeople.filter((person) => canFetchWikipediaSummary(person.wikipediaTitle))

    const loadImages = async () => {
      const entries = await Promise.all(
        people.map(async (person) => {
          try {
            const response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                person.wikipediaTitle,
              )}`,
              { signal: controller.signal },
            )

            if (!response.ok) {
              return null
            }

            const data = (await response.json()) as { thumbnail?: { source?: string } }
            return data.thumbnail?.source ? [person.slug, data.thumbnail.source] : null
          } catch {
            return null
          }
        }),
      )

      if (!controller.signal.aborted) {
        setPortraitImages(Object.fromEntries(entries.filter(Boolean) as [string, string][]))
      }
    }

    void loadImages()

    return () => controller.abort()
  }, [portraitPeople])

  useEffect(() => {
    logVisitorEvent({ eventType: 'page_view' })
  }, [logVisitorEvent])

  return (
    <div className="archive-shell stories" style={brandStyle}>
      <ArchiveHeader />

      <main>
        <section className="review-home-grid" id="portrait-index">
          <aside className="golden-age-rail">
            <span>{homepageCopy.leftRailEyebrow}</span>
            <h2>{homepageCopy.leftRailHeading}</h2>
            <p>{homepageCopy.leftRailBody}</p>
            <div>
              {goldenAgePeople.map((person) => (
                <Link href={person.href} key={person.slug}>
                  <strong>{person.name}</strong>
                  <small>{person.category}</small>
                </Link>
              ))}
            </div>
            <Link className="rail-link" href="/muslims-in-history">
              {homepageCopy.leftRailButtonLabel}
            </Link>
          </aside>

          <section className="review-feature-panel webstories-home-stage">
            <div className="portrait-wall-panel">
              <h1 className="sr-only">Muslim Impactors civic and professional portrait archive</h1>
              <div className="portrait-mosaic" aria-label="Personality portrait index">
                {portraitPeople.map((person, index) => {
                  const portraitImage = portraitImages[person.slug] || person.imageUrl

                  return (
                    <button
                      className={`portrait-tile ${
                        person.slug === activeFeaturedPersonality.slug ? 'is-featured' : ''
                      } ${portraitImage ? 'has-photo' : ''} portrait-variant-${index % 5}`}
                      data-person-slug={person.slug}
                      key={person.slug}
                      onClick={() => {
                        setSelectedPersonSlug(person.slug)
                        logVisitorEvent({
                          eventType: 'video_open',
                          targetSlug: person.slug,
                          targetType: 'personality',
                        })
                      }}
                      style={
                        {
                          '--portrait-image': portraitImage ? `url("${portraitImage}")` : undefined,
                          '--portrait-tone': person.tone,
                        } as React.CSSProperties
                      }
                      type="button"
                    >
                      <span className="portrait-picture" aria-hidden="true">
                        <span className="portrait-arch" />
                        <span className="portrait-halo" />
                        <span className="portrait-turban" />
                        <span className="portrait-head" />
                        <span className="portrait-beard" />
                        <span className="portrait-robe" />
                        <span className="portrait-book" />
                      </span>
                      <span className="portrait-overlay">
                        <strong>{person.name}</strong>
                        <small>{person.role}</small>
                        <em>{person.summary}</em>
                      </span>
                      <span className="portrait-hover-card" aria-hidden="true">
                        <strong>{getPersonalityStory(person).story}</strong>
                        <span>{person.name}</span>
                        <small>{person.role}</small>
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="portrait-wall-caption">
                Hover over a portrait for a record preview. Click any portrait to open the video
                card.
              </p>
            </div>
          </section>

          <aside className="sponsor-ad-rail" aria-label="Sponsor placements">
            <span>{homepageCopy.rightRailEyebrow}</span>
            <h2>{homepageCopy.rightRailHeading}</h2>
            <div>
              {sponsorAds.map((sponsor) => (
                <Link
                  className="sponsor-ad-card"
                  href={sponsor.href}
                  key={sponsor.slug}
                  onClick={() =>
                    logVisitorEvent({
                      eventType: 'sponsor_click',
                      targetSlug: sponsor.slug,
                      targetType: 'sponsor',
                    })
                  }
                >
                  <small>{settings?.sponsorLabels?.[sponsor.slug] || sponsor.adLabel}</small>
                  <strong>{sponsor.name}</strong>
                  <p>{sponsor.focus}</p>
                </Link>
              ))}
            </div>
            <Link className="rail-link" href="/sponsors">
              View sponsor directory
            </Link>
          </aside>
        </section>

        <section className="homepage-review-secondary">
          <div className="editor-pick-main">
            <div className="panel-heading">
              <span>Editor&apos;s Choice</span>
              <h2>Profiles selected for first review</h2>
            </div>
            <div className="compact-person-grid">
              {editorChoicePeople.map((person) => (
                <Link href={person.href} key={person.slug}>
                  <span>{person.category}</span>
                  <h3>{person.name}</h3>
                  <p>{person.summary}</p>
                </Link>
              ))}
            </div>

            <div className="recommended-video-strip" aria-label="Recommended video references">
              <div className="panel-heading">
                <span>Recommended Videos</span>
                <h2>Documentary references selected for review</h2>
              </div>
              <div className="video-grid">
                {recommendedStories.slice(0, 3).map((story, index) => {
                  const person = popularPersonalities.find((item) => item.name === story.name)
                  const video = person ? getPersonalityVideo(person, story) : youtubeVideos[index]

                  return (
                    <article key={story.slug}>
                      <div className="video-frame">
                        <iframe
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          src={`https://www.youtube-nocookie.com/embed/${video?.embedId || youtubeVideos[0].embedId}`}
                          title={video?.title || story.story}
                        />
                      </div>
                      <span>{video?.topic || story.role}</span>
                      <h3>{story.story}</h3>
                      <p>{video?.source || story.name}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>

          <aside className="popular-personality-rail">
            <div className="panel-heading">
              <span>Popular Personalities</span>
              <h2>High-interest entry points</h2>
            </div>
            <div className="ranked-list">
              {popularPersonalities.slice(0, 8).map((person, index) => (
                <Link href={person.href} key={person.slug}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{person.name}</strong>
                  <small>{person.category}</small>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </main>

      {selectedPerson && selectedStory ? (
        <div
          className="story-preview-backdrop"
          onClick={() => setSelectedPersonSlug(null)}
          role="presentation"
        >
          <section
            aria-labelledby="story-preview-title"
            aria-modal="true"
            className="story-preview-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close story preview"
              className="story-preview-close"
              onClick={() => setSelectedPersonSlug(null)}
              type="button"
            >
              X
            </button>
            <div className="story-preview-main">
              <div className="story-preview-video">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo?.embedId || youtubeVideos[0].embedId}`}
                  title={selectedVideo?.title || selectedStory.story}
                />
              </div>
              <div className="story-preview-copy">
                <h2 id="story-preview-title">{selectedStory.story}</h2>
                <strong>{selectedPerson.name}</strong>
                <p>{selectedPerson.role}</p>
                {selectedVideo ? <small>{selectedVideo.source}</small> : null}
                <Link href={selectedPerson.href}>Go to speaker&apos;s page</Link>
              </div>
            </div>
            <div className="story-preview-related">
              <span>Related stories</span>
              <div>
                {selectedRelatedStories.map((story) => {
                  const relatedPerson = popularPersonalities.find(
                    (person) => person.name === story.name,
                  )
                  const image = relatedPerson ? portraitImages[relatedPerson.slug] : null

                  return (
                    <Link href={story.href} key={story.slug}>
                      <span
                        className={image ? 'has-photo' : ''}
                        style={
                          {
                            '--portrait-image': image ? `url("${image}")` : undefined,
                            '--portrait-tone': relatedPerson?.tone || selectedPerson.tone,
                          } as React.CSSProperties
                        }
                      >
                        {image ? null : relatedPerson?.initials || story.name.slice(0, 2)}
                      </span>
                      <strong>{story.story}</strong>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}
