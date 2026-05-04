import React from 'react'

import ArchiveHeader from '../ArchiveHeader'

export const metadata = {
  description: 'Support the Muslim Impactors research, digitization, and public education work.',
  title: 'Donate | Muslim Impactors',
}

export default function DonatePage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Support the archive</span>
          <h1>Help fund research, digitization, translation, and public education.</h1>
          <p>
            The donation flow is a placeholder for local testing. In production this page can connect
            to Stripe, donor receipts, recurring gifts, and a public transparency note.
          </p>
        </section>

        <section className="donation-grid">
          {['$25', '$75', '$250', 'Custom'].map((amount) => (
            <article key={amount}>
              <strong>{amount}</strong>
              <p>
                Supports source review, image rights checks, transcript preparation, and public
                learning materials.
              </p>
              <button type="button">Select</button>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
