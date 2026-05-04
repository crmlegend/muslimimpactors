import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import AskArchiveDemo from './AskArchiveDemo'

export default function AskPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>AI ask</span>
          <h1>Ask questions with answers grounded in the archive dataset.</h1>
          <p>
            The MVP assistant searches the local archive records and returns citations to profiles,
            stories, articles, and source notes. Public visitors are limited to five demo questions
            per browser per day.
          </p>
        </section>

        <AskArchiveDemo />
      </main>
    </div>
  )
}
