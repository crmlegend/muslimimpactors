import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import ArchiveHeader from '../../ArchiveHeader'
import PersonalityMediaWorkspace from '../../PersonalityMediaWorkspace'
import {
  getRelatedStoriesForPerson,
  getSponsorForRecord,
  getStoryChapters,
  getStoryDetailSections,
  getPersonalityVideo,
  personalities,
  sourceRows,
  storyRows,
} from '../../archiveData'

type StoryDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return storyRows.map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({ params }: StoryDetailPageProps) {
  const { slug } = await params
  const story = storyRows.find((item) => item.slug === slug)

  if (!story) {
    return {}
  }

  return {
    title: `${story.story} | Muslim Impactors`,
    description: story.summary,
  }
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params
  const story = storyRows.find((item) => item.slug === slug)

  if (!story) {
    notFound()
  }

  const person = personalities.find((item) => item.name === story.name)
  if (!person) {
    notFound()
  }

  const video = getPersonalityVideo(person, story)
  const sponsor = getSponsorForRecord(story.slug)
  const chapters = getStoryChapters(person)
  const storySections = getStoryDetailSections(story, person)
  const relatedStories = getRelatedStoriesForPerson(person)
  const relatedPeople = personalities
    .filter((item) => item.category === person.category && item.slug !== person.slug)
    .slice(0, 6)
  const relatedStoryPeople = relatedStories
    .map((storyRow) => personalities.find((item) => item.name === storyRow.name))
    .filter((item): item is (typeof personalities)[number] => Boolean(item))

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="profile-page">
        <section className="profile-hero speaker-profile-hero">
          <div>
            <span>Story chapter</span>
            <h1>{story.story}</h1>
            <p>{story.summary}</p>
            <div className="profile-chips">
              <strong>{story.length}</strong>
              <strong>{story.name}</strong>
              <strong>{story.role}</strong>
            </div>
          </div>
        </section>

        <PersonalityMediaWorkspace
          chapters={chapters}
          person={person}
          relatedPeople={relatedPeople}
          relatedStoryPeople={relatedStoryPeople}
          relatedStories={relatedStories}
          story={story}
          video={video}
        />

        <section className="two-column-content">
          <article>
            <h2>Story notes</h2>
            <div className="detail-section-list">
              {storySections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </article>

          <aside className="source-stack">
            <div>
              <small>Research support</small>
              <strong>
                <Link href={sponsor.href}>{sponsor.name}</Link>
              </strong>
              <p>{sponsor.focus}</p>
            </div>
            <div>
              <small>Personality dossier</small>
              <strong>{person.name}</strong>
              <p>{person.summary}</p>
              <Link href={person.href}>Open personality page</Link>
            </div>
            {sourceRows.slice(0, 2).map((source) => (
              <div key={source.title}>
                <small>{source.type}</small>
                <strong>{source.title}</strong>
                <p>{source.note}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="curated-strips inline-strip">
          <div className="panel-heading">
            <span>Continue watching</span>
            <h2>Related story chapters</h2>
          </div>
          <div className="compact-person-grid">
            {relatedStories.map((related) => (
              <Link href={related.href} key={related.slug}>
                <span>{related.length}</span>
                <h3>{related.story}</h3>
                <p>{related.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
