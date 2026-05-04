'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import ArchiveHeader from './ArchiveHeader'
import {
  editorsPicks,
  featuredPersonality,
  getPersonalityStory,
  getPersonalityVideo,
  getRelatedStoriesForPerson,
  popularPersonalities,
  storyRows,
  themes,
  youtubeVideos,
} from './archiveData'

export default function ArchiveExperience() {
  const [portraitImages, setPortraitImages] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(null)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const selectedPerson = selectedPersonSlug
    ? popularPersonalities.find((person) => person.slug === selectedPersonSlug)
    : null
  const selectedStory = selectedPerson ? getPersonalityStory(selectedPerson) : null
  const selectedVideo =
    selectedPerson && selectedStory ? getPersonalityVideo(selectedPerson, selectedStory) : null
  const selectedRelatedStories = selectedPerson ? getRelatedStoriesForPerson(selectedPerson) : []
  const featuredStory = storyRows[0]

  useEffect(() => {
    const controller = new AbortController()
    const people = popularPersonalities.slice(0, 24)

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
  }, [])

  return (
    <div className="archive-shell stories">
      <ArchiveHeader />

      <main>
        <section className="figure-focus hero-figure" id="portrait-index">
          <div className="focus-copy">
            <span>Figure in focus</span>
            <h1>{featuredPersonality.name}</h1>
            <p>{featuredPersonality.todayRelevance}</p>
            <div className="focus-meta">
              <strong>{featuredPersonality.era}</strong>
              <small>{featuredPersonality.role}</small>
              <small>{featuredPersonality.region}</small>
            </div>
            <div className="hero-actions">
              <Link className="button primary" href={featuredPersonality.href}>
                Open featured dossier
              </Link>
              <a className="button secondary" href="#story-feature">
                Watch chapter
              </a>
            </div>
          </div>

          <div className="portrait-wall-panel">
            <div className="portrait-mosaic" aria-label="Personality portrait index">
              {popularPersonalities.slice(0, 24).map((person, index) => (
                <button
                  className={`portrait-tile ${index === 0 ? 'is-featured' : ''} ${
                    portraitImages[person.slug] ? 'has-photo' : ''
                  } portrait-variant-${index % 5}`}
                  data-person-slug={person.slug}
                  key={person.slug}
                  onClick={() => setSelectedPersonSlug(person.slug)}
                  style={
                    {
                      '--portrait-image': portraitImages[person.slug]
                        ? `url("${portraitImages[person.slug]}")`
                        : undefined,
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
              ))}
            </div>
            <p>
              Hover over a portrait for a story preview. Click a portrait to open the video card.
            </p>
          </div>
        </section>

        <section className="story-layout">
          <aside className="story-sidebar">
            <Link className="story-logo" href="/">
              Muslim Impactors
            </Link>
            <nav aria-label="Story archive navigation">
              <a href="#story-feature">Featured story</a>
              <Link href="/stories">Stories</Link>
              <Link href="/personalities">Personalities</Link>
              <a href="#portrait-index">Portrait index</a>
              <Link href="/themes">Themes</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/ask">Help</Link>
            </nav>
          </aside>

          <section className="story-feature" id="story-feature">
            <div className="media-window video-window">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideos[0].embedId}`}
                title={youtubeVideos[0].title}
              />
            </div>
            <div className="story-copy">
              <span>Featured documentary chapter</span>
              <h1>{featuredStory.story}</h1>
              <p>{featuredStory.summary}</p>
              <div className="story-actions">
                <button onClick={() => setSaved((value) => !value)} type="button">
                  {saved ? 'Saved to research list' : 'Save to research list'}
                </button>
                <button onClick={() => setTranscriptOpen((value) => !value)} type="button">
                  {transcriptOpen ? 'Hide transcript' : 'Open transcript'}
                </button>
                <Link className="button secondary" href={featuredPersonality.href}>
                  Open dossier
                </Link>
              </div>

              {transcriptOpen ? (
                <div className="transcript-panel">
                  <strong>Transcript preview</strong>
                  <p>{featuredStory.body}</p>
                </div>
              ) : null}
            </div>
          </section>

          <aside className="related-rail">
            <span>Related stories</span>
            {storyRows.slice(1).map((row) => (
              <Link href={row.href} key={row.story}>
                <strong>{row.story}</strong>
                <p>{row.name}</p>
                <small>{row.length}</small>
              </Link>
            ))}
          </aside>
        </section>

        <section className="curated-strips">
          <div className="panel-heading">
            <span>Editor&apos;s pick</span>
            <h2>Profiles selected for first review</h2>
          </div>
          <div className="compact-person-grid">
            {editorsPicks.map((person) => (
              <Link href={person.href} key={person.slug}>
                <span>{person.category}</span>
                <h3>{person.name}</h3>
                <p>{person.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="curated-strips popular-strip">
          <div className="panel-heading">
            <span>Most popular stories</span>
            <h2>Frequently opened story chapters</h2>
          </div>
          <div className="ranked-list">
            {storyRows.map((story, index) => (
              <Link href={story.href} key={story.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{story.story}</strong>
                <small>
                  {story.name} - {story.length}
                </small>
              </Link>
            ))}
          </div>
        </section>

        <section className="curated-strips popular-strip">
          <div className="panel-heading">
            <span>Most popular personalities</span>
            <h2>High-interest entry points for public readers</h2>
          </div>
          <div className="ranked-list">
            {popularPersonalities.slice(0, 10).map((person, index) => (
              <Link href={person.href} key={person.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{person.name}</strong>
                <small>{person.category}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="video-shelf">
          <div className="panel-heading">
            <span>Video references</span>
            <h2>Embedded documentary references</h2>
          </div>
          <div className="video-grid">
            {youtubeVideos.map((video) => (
              <article key={video.embedId}>
                <div className="video-frame">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    src={`https://www.youtube-nocookie.com/embed/${video.embedId}`}
                    title={video.title}
                  />
                </div>
                <span>{video.topic}</span>
                <h3>{video.title}</h3>
                <p>{video.source}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="storyteller-index" id="storytellers">
          <div className="panel-heading">
            <span>Story archive</span>
            <h2>Personalities with chaptered narrative pages</h2>
          </div>
          <div className="story-card-grid">
            {storyRows.map((row) => (
              <Link href={row.href} key={row.slug}>
                <span>{row.length}</span>
                <h3>{row.name}</h3>
                <p>{row.role}</p>
                <strong>{row.story}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="theme-browser" id="themes">
          <div className="panel-heading">
            <span>Theme browser</span>
            <h2>Research paths across the archive</h2>
          </div>
          <div className="theme-list">
            {themes.map((theme) => (
              <Link href="/themes" key={theme}>
                {theme}
              </Link>
            ))}
          </div>
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
