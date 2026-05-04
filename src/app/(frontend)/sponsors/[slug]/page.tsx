import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import ArchiveHeader from '../../ArchiveHeader'
import { personalities, sponsorRows, storyRows } from '../../archiveData'

type SponsorDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return sponsorRows.map((sponsor) => ({ slug: sponsor.slug }))
}

export async function generateMetadata({ params }: SponsorDetailPageProps) {
  const { slug } = await params
  const sponsor = sponsorRows.find((item) => item.slug === slug)

  if (!sponsor) {
    return {}
  }

  return {
    title: `${sponsor.name} | Sponsors`,
    description: sponsor.summary,
  }
}

export default async function SponsorDetailPage({ params }: SponsorDetailPageProps) {
  const { slug } = await params
  const sponsor = sponsorRows.find((item) => item.slug === slug)

  if (!sponsor) {
    notFound()
  }

  const sponsoredPeople = personalities
    .filter((person, index) => (index + sponsor.slug.length) % sponsorRows.length === 0)
    .slice(0, 6)
  const sponsoredStories = storyRows
    .filter((story, index) => (index + sponsor.slug.length) % sponsorRows.length === 0)
    .slice(0, 5)

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="profile-page">
        <section className="profile-hero">
          <div>
            <span>{sponsor.type}</span>
            <h1>{sponsor.name}</h1>
            <p>{sponsor.summary}</p>
          </div>
          <aside>
            <strong>Sponsored focus</strong>
            <p>{sponsor.focus}</p>
          </aside>
        </section>

        <section className="two-column-content">
          <article>
            <h2>Public sponsor page model</h2>
            <div className="detail-section-list">
              <section>
                <h3>Editorial independence</h3>
                <p>
                  Sponsor records show who supported research work, but publication still requires
                  editor approval, rights review where needed, and publisher approval.
                </p>
              </section>
              <section>
                <h3>Admin workflow</h3>
                <p>
                  Admins can open the Sponsors collection, select sponsored people, stories,
                  articles, essays, and pages, then choose whether sponsor credit appears publicly.
                </p>
              </section>
            </div>
          </article>

          <aside className="source-stack">
            <div>
              <small>Audit trail</small>
              <strong>Changes are logged</strong>
              <p>
                Sponsor edits and sponsored-record assignments are captured in Audit Logs with the
                user, time, changed fields, and publish status.
              </p>
            </div>
          </aside>
        </section>

        <section className="curated-strips inline-strip">
          <div className="panel-heading">
            <span>Supported profiles</span>
            <h2>Example records connected to this sponsor</h2>
          </div>
          <div className="compact-person-grid">
            {sponsoredPeople.map((person) => (
              <Link href={person.href} key={person.slug}>
                <span>{person.category}</span>
                <h3>{person.name}</h3>
                <p>{person.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="curated-strips inline-strip">
          <div className="panel-heading">
            <span>Supported stories</span>
            <h2>Example story chapters</h2>
          </div>
          <div className="ranked-list">
            {sponsoredStories.map((story, index) => (
              <Link href={story.href} key={story.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{story.story}</strong>
                <small>{story.name}</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
