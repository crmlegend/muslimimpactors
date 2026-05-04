import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { manuscriptImage, sourceRows } from '../archiveData'

export default function SourcesPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero source-hero">
          <div>
            <span>Sources</span>
            <h1>Every public claim should resolve back to a source record.</h1>
            <p>
              This page models the source library: books, interviews, manuscript scans, archival
              documents, video, and web articles.
            </p>
          </div>
          <div
            aria-label="Public domain Islamic manuscript page"
            className="source-visual"
            role="img"
            style={{ backgroundImage: `url(${manuscriptImage})` }}
          />
        </section>

        <section className="source-table">
          {sourceRows.map((source) => (
            <article key={source.title}>
              <small>{source.type}</small>
              <h2>{source.title}</h2>
              <strong>{source.status}</strong>
              <p>{source.note}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
