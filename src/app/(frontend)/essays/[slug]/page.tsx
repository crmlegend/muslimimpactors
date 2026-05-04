import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../../ArchiveHeader'
import { contributors, sourceRows } from '../../archiveData'

type EssayPreviewPageProps = {
  params: Promise<{
    slug: string
  }>
}

const titleFromSlug = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')

export async function generateMetadata({ params }: EssayPreviewPageProps) {
  const { slug } = await params

  return {
    title: `${titleFromSlug(slug)} | Muslim Impactors`,
  }
}

export default async function EssayPreviewPage({ params }: EssayPreviewPageProps) {
  const { slug } = await params
  const title = titleFromSlug(slug)

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="profile-page">
        <section className="profile-hero">
          <div>
            <span>Expert essay</span>
            <h1>{title}</h1>
            <p>
              Expert essays are long-form interpretive pieces with named authors, approved credit
              lines, source notes, and editorial review status.
            </p>
          </div>
          <aside>
            <strong>Submission route</strong>
            <p>
              Editors can attach the submitted Word or PDF file, paste extracted text, revise the
              draft, and mark Expert Approved before publication.
            </p>
          </aside>
        </section>

        <section className="two-column-content">
          <article>
            <h2>Essay body</h2>
            <p>
              This public essay shape supports a historian-approved article, pull quotes, related
              personality dossiers, source citations, and clear author credit.
            </p>
            <p>
              The final published version can show the approved essay text, source list, related
              records, and contributor credit in a clean encyclopedia-style layout.
            </p>
          </article>

          <aside className="source-stack">
            <div>
              <small>Contributor examples</small>
              <strong>{contributors[0].name}</strong>
              <p>{contributors[0].focus}</p>
              <Link href="/contributors">Open contributors</Link>
            </div>
            {sourceRows.slice(1, 3).map((source) => (
              <div key={source.title}>
                <small>{source.type}</small>
                <strong>{source.title}</strong>
                <p>{source.note}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </div>
  )
}
