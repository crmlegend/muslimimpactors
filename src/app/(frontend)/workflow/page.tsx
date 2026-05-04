import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { workflowTests } from '../archiveData'
import ContributorSignupForm from './ContributorSignupForm'

export default function WorkflowPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Submission process</span>
          <h1>How a public article, expert essay, or source lead becomes a reviewed archive page.</h1>
          <p>
            Contributors can send material to the editorial team. Internal editors then draft,
            review, clear rights, preview, and publish records with a visible approval trail.
          </p>
          <Link className="button primary" href="#register-interest">
            Register interest
          </Link>
        </section>

        <section className="process-screenshot-grid" aria-label="Process screenshots">
          <article>
            <span>Contributor handoff</span>
            <div className="mock-browser-shot">
              <div>
                <i />
                <i />
                <i />
              </div>
              <strong>Article submission packet</strong>
              <p>Title, author credit, summary, source list, media rights, contact email.</p>
              <small>Editor receives Word/PDF or structured notes.</small>
            </div>
          </article>
          <article>
            <span>Editor workspace</span>
            <div className="mock-browser-shot">
              <div>
                <i />
                <i />
                <i />
              </div>
              <strong>Draft + preview</strong>
              <p>Paste extracted text, add sources, attach media, check Expert Approved.</p>
              <small>Preview button opens the public page shape before publishing.</small>
            </div>
          </article>
          <article>
            <span>Rights and publish</span>
            <div className="mock-browser-shot">
              <div>
                <i />
                <i />
                <i />
              </div>
              <strong>Clearance checklist</strong>
              <p>Source confidence, image license, watermark, AI label, final publisher approval.</p>
              <small>Audit logs record who changed or published the record.</small>
            </div>
          </article>
        </section>

        <section className="workflow-list">
          {workflowTests.map((test, index) => (
            <article key={test}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{test}</p>
            </article>
          ))}
        </section>

        <section className="register-interest" id="register-interest">
          <div>
            <span>Register interest</span>
            <h2>Visitors can create a subscriber account and submit as an author, editor, or reader.</h2>
            <p>
              Author and editor requests are reviewed before staff privileges are granted. Authors
              must provide a biography so approved contributors can later appear on the public
              contributors page with proper credit.
            </p>
          </div>
          <ContributorSignupForm />
        </section>
      </main>
    </div>
  )
}
