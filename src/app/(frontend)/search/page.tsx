import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { searchItems } from '../archiveData'

export default function SearchPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Search</span>
          <h1>Search across personalities, stories, themes, sources, and contributors.</h1>
          <p>
            Use this broader results surface for discovery across the public archive. Each result
            keeps a clear record type, context line, and path into the collection.
          </p>
        </section>

        <section className="search-results-page">
          {searchItems.map((item) => (
            <Link href={item.href} key={`${item.type}-${item.title}`}>
              <small>{item.type}</small>
              <h2>{item.title}</h2>
              <strong>{item.meta}</strong>
              <p>{item.summary}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
