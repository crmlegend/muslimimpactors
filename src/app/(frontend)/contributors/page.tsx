import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { contributors } from '../archiveData'

export default function ContributorsPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Contributors</span>
          <h1>Researchers, writers, narrators, artists, and reviewers behind the archive.</h1>
          <p>
            Approved authors can appear here after submitting a biography and passing editorial
            review. Visitors can create an account and submit a contributor application from the
            submission process page.
          </p>
          <Link className="button secondary" href="/workflow#register-interest">
            Become a contributor
          </Link>
        </section>

        <section className="directory-grid contributor-grid">
          {contributors.map((contributor) => (
            <article className="directory-card" key={contributor.name}>
              <small>{contributor.role}</small>
              <h2>{contributor.name}</h2>
              <p>{contributor.focus}</p>
              <strong>
                Profile, biography, approved credit line, and related essays can appear here.
              </strong>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
