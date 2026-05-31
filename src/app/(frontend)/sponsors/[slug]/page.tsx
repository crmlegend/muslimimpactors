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
  const impactHighlights = sponsor.impactHighlights || [
    {
      body: 'Sponsor support helps keep research, public presentation, and community-facing education moving forward.',
      label: 'Archive support',
      value: 'Public good',
    },
    {
      body: 'Approved sponsor claims can be added with source notes so gratitude never turns into unsupported promotion.',
      label: 'Evidence',
      value: 'Verified before publishing',
    },
    {
      body: 'Connections to people, stories, essays, and pages show exactly where support strengthens the archive.',
      label: 'Transparency',
      value: 'Linked records',
    },
  ]
  const recognitionPoints = sponsor.recognitionPoints || [
    'Recognized for helping sustain public archive work.',
    'Sponsor support is connected to visible records where possible.',
    'Editorial review remains separate from sponsor recognition.',
  ]

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="profile-page sponsor-profile-page">
        <section className="profile-hero sponsor-hero">
          <div>
            <span>{sponsor.type}</span>
            <h1>{sponsor.name}</h1>
            <p>{sponsor.summary}</p>
            <p className="sponsor-gratitude">{sponsor.gratitudeStatement}</p>
            {sponsor.websiteUrl ? (
              <a className="button primary sponsor-cta" href={sponsor.websiteUrl}>
                {sponsor.websiteLabel || 'Visit sponsor website'}
              </a>
            ) : null}
          </div>
          <aside>
            <small>With gratitude</small>
            <strong>Support that helps public service stories reach people.</strong>
            <p>{sponsor.focus}</p>
          </aside>
        </section>

        {sponsor.bannerImage ? (
          <section className="sponsor-banner sponsor-showcase-banner">
            <img alt={`${sponsor.name} banner`} src={sponsor.bannerImage} />
          </section>
        ) : null}

        <section className="sponsor-impact-grid">
          {impactHighlights.map((highlight) => (
            <article key={highlight.label}>
              <small>{highlight.label}</small>
              <strong>{highlight.value}</strong>
              <p>{highlight.body}</p>
            </article>
          ))}
        </section>

        <section className="two-column-content sponsor-story-section">
          <article>
            <span className="section-kicker">Sponsor commendation</span>
            <h2>Thank you for helping this archive honor service and contribution.</h2>
            <p className="sponsor-lede">
              This page is designed to recognize sponsor support with dignity: what the sponsor
              helps make possible, which records are connected to that support, and which claims
              still need verified public sources before publication.
            </p>
            <div className="detail-section-list">
              {sponsor.details?.map((detail) => (
                <section key={detail.heading}>
                  <h3>{detail.heading}</h3>
                  <p>{detail.body}</p>
                </section>
              ))}
              <section>
                <h3>Gratitude without compromising trust</h3>
                <p>
                  Sponsor records show who supported the work, while publication still requires
                  editor approval, rights review where needed, and publisher approval. This keeps
                  appreciation visible and the archive credible.
                </p>
              </section>
              <section>
                <h3>Recognition points</h3>
                <ul className="sponsor-recognition-list">
                  {recognitionPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            </div>
          </article>

          <aside className="source-stack sponsor-trust-panel">
            <div>
              <small>Public trust</small>
              <strong>Claims stay source-backed</strong>
              <p>
                Admins can add verified humanitarian work, Muslim community initiatives, reports,
                websites, and source notes. Until then, this page thanks the sponsor without
                inventing unsupported claims.
              </p>
            </div>
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
            <h2>Work this support helps showcase</h2>
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
            <h2>Story paths strengthened by sponsor support</h2>
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
