import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import ArchiveHeader from '../../ArchiveHeader'
import PersonalityMediaWorkspace from '../../PersonalityMediaWorkspace'
import { getPublicPersonalities, getPublicPersonalityBySlug } from '../../content'
import {
  getApprovedPersonalityVideo,
  getPersonalityDetailSections,
  getPersonalityReferences,
  getPersonalityStory,
  getRelatedStoriesForPerson,
  getSponsorForRecord,
  getStoryChapters,
} from '../../archiveData'

type PersonalityDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PersonalityDetailPageProps) {
  const { slug } = await params
  const person = await getPublicPersonalityBySlug(slug)

  if (!person) {
    return {}
  }

  return {
    title: `${person.name} | Muslim Impactors`,
    description: person.summary,
  }
}

export default async function PersonalityDetailPage({ params }: PersonalityDetailPageProps) {
  const { slug } = await params
  const person = await getPublicPersonalityBySlug(slug)

  if (!person) {
    notFound()
  }

  const personalities = await getPublicPersonalities()
  const relatedPeople = personalities
    .filter((item) => item.category === person.category && item.slug !== person.slug)
    .slice(0, 6)
  const detailSections = getPersonalityDetailSections(person)
  const fullBioParagraphs = person.fullBio
    ?.split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const references = getPersonalityReferences(person)
  const story = getPersonalityStory(person)
  const video = getApprovedPersonalityVideo(person, story)
  const sponsor = getSponsorForRecord(person.slug)
  const chapters = getStoryChapters(person)
  const relatedStories = getRelatedStoriesForPerson(person)
  const relatedStoryPeople = relatedStories
    .map((storyRow) => personalities.find((item) => item.name === storyRow.name))
    .filter((item): item is (typeof personalities)[number] => Boolean(item))

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="profile-page">
        <section className="profile-hero speaker-profile-hero">
          <div>
            <span>{person.category}</span>
            <h1>{person.name}</h1>
            <p>{person.summary}</p>
            <div className="profile-chips">
              <strong>{person.era}</strong>
              <strong>{person.region}</strong>
              <strong>{person.role}</strong>
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
            {fullBioParagraphs?.length ? (
              <section className="profile-full-bio">
                <h2>Full Bio</h2>
                {fullBioParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ) : null}

            <h2>Overview</h2>
            <div className="detail-section-list">
              {detailSections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>

            <div className="timeline-list compact-list">
              <article>
                <time>Era</time>
                <h2>{person.era}</h2>
                <p>
                  Timeline modules can be attached to this personality and reused across themes.
                </p>
              </article>
              <article>
                <time>Theme</time>
                <h2>{person.category}</h2>
                <p>Theme pages gather people, stories, places, essays, and source records.</p>
              </article>
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
              <small>Reference starting points</small>
              <strong>Wiki-backed source links</strong>
              <p>
                This page uses original editorial text with wiki references for verification and
                expansion. Imported open-licensed text must preserve attribution, license, and
                access date.
              </p>
            </div>
            {references.map((reference) => (
              <div key={reference.label}>
                <small>{reference.label}</small>
                <strong>
                  <a href={reference.url} rel="noreferrer" target="_blank">
                    Open reference
                  </a>
                </strong>
                <p>{reference.note}</p>
              </div>
            ))}
            <div>
              <small>Media model</small>
              <strong>Portraits and documentary clips</strong>
              <p>
                Portrait images can be owned, licensed, public domain, or withheld until rights are
                verified. Synthetic media should be visibly labeled.
              </p>
            </div>
          </aside>
        </section>

        {relatedStories.length > 0 ? (
          <section className="curated-strips inline-strip">
            <div className="panel-heading">
              <span>Related stories</span>
              <h2>Chaptered material connected to {person.name}</h2>
            </div>
            <div className="compact-person-grid">
              {relatedStories.map((story) => (
                <Link href={story.href} key={story.slug}>
                  <span>{story.length}</span>
                  <h3>{story.story}</h3>
                  <p>{story.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="curated-strips inline-strip">
          <div className="panel-heading">
            <span>Related personalities</span>
            <h2>More from {person.category}</h2>
          </div>
          <div className="compact-person-grid">
            {relatedPeople.map((related) => (
              <Link href={related.href} key={related.slug}>
                <span>{related.era}</span>
                <h3>{related.name}</h3>
                <p>{related.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
