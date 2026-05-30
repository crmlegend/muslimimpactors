import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import WikipediaPortrait from '../WikipediaPortrait'
import { getPersonalityCategoryURL, getPublicPersonalities } from '../content'

export const dynamic = 'force-dynamic'

export default async function PersonalitiesPage() {
  const personalities = await getPublicPersonalities()
  const publicPersonalities = personalities.filter(
    (person) => person.archiveTrack !== 'golden_age_history' && person.archiveTrack !== 'contributor',
  )
  const categories = Array.from(new Set(publicPersonalities.map((person) => person.category))).sort()

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>American Muslim personalities</span>
          <h1>A-Z dossiers for Muslims in the United States aiding humanity.</h1>
          <p>
            Browse the United States-facing index of civic leaders, service members, artists,
            writers, scholars, athletes, entrepreneurs, and public figures. Historical Muslim
            intellectual profiles now live in the Muslims in History section.
          </p>
          <Link className="button secondary" href="/muslims-in-history">
            Open Muslims in History
          </Link>
        </section>

        <section className="theme-list large" aria-label="Personality categories">
          {categories.map((category) => (
            <Link href={getPersonalityCategoryURL(category)} key={category}>
              {category}
            </Link>
          ))}
        </section>

        <section className="directory-grid personality-directory">
          {publicPersonalities.map((person) => (
            <Link
              className="directory-card portrait-directory-card"
              href={person.href}
              key={person.slug}
            >
              <WikipediaPortrait
                className="mini-portrait"
                initials={person.initials}
                name={person.name}
                tone={person.tone}
                wikipediaTitle={person.wikipediaTitle}
              />
              <small>{person.era}</small>
              <h2>{person.name}</h2>
              <p>{person.role}</p>
              <strong>{person.summary}</strong>
              <em>{person.category}</em>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
