import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import WikipediaPortrait from '../WikipediaPortrait'
import { historicalPersonalities, historicalPersonalityCategories } from '../archiveData'

export default function MuslimsInHistoryPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Muslims in history</span>
          <h1>Historical Muslim contributions to the modern intellectual world.</h1>
          <p>
            The original archive dataset now lives here as a separate research path for scholars,
            scientists, jurists, artists, institution builders, travelers, and public figures whose
            work shaped later learning.
          </p>
        </section>

        <section className="theme-list large" aria-label="Historical Muslim categories">
          {historicalPersonalityCategories.map((category) => (
            <Link href={`/search?category=${encodeURIComponent(category)}`} key={category}>
              {category}
            </Link>
          ))}
        </section>

        <section className="directory-grid personality-directory">
          {historicalPersonalities.map((person) => (
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
