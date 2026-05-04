import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { articleRows } from '../archiveData'

export default function ArticlesPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Articles</span>
          <h1>
            Encyclopedia-style pages for concepts, institutions, works, and historical context.
          </h1>
          <p>
            Articles are designed for source-backed written entries where video is optional and the
            main value is a clear, reviewed public explanation.
          </p>
        </section>

        <section className="directory-grid">
          {articleRows.map((article) => (
            <Link className="directory-card" href={article.href} key={article.slug}>
              <small>{article.kind}</small>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <strong>Includes overview, sections, related personalities, and source notes.</strong>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
