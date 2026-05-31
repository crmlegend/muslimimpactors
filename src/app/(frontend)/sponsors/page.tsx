import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { getPublicSponsors } from '../content'

export const dynamic = 'force-dynamic'

export default async function SponsorsPage() {
  const sponsors = await getPublicSponsors()

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Sponsors</span>
          <h1>Research support connected clearly to the work it funds.</h1>
          <p>
            Each sponsor can be managed in the admin panel and connected to personalities, stories,
            articles, essays, and pages. Public pages can show sponsor credit without mixing
            sponsorship with editorial approval.
          </p>
        </section>

        <section className="directory-grid">
          {sponsors.map((sponsor) => (
            <Link className="directory-card sponsor-card" href={sponsor.href} key={sponsor.slug}>
              <small>{sponsor.type}</small>
              <h2>{sponsor.name}</h2>
              <p>{sponsor.summary}</p>
              <strong>{sponsor.focus}</strong>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
