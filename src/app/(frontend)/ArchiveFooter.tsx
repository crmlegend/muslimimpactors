import Link from 'next/link'
import React from 'react'

export default function ArchiveFooter() {
  return (
    <footer className="archive-footer">
      <div>
        <Link className="footer-wordmark" href="/">
          Muslim Impactors
        </Link>
        <p>
          Public research archive for Muslim public service, humanitarian contribution, civic life,
          scholarship, culture, and historical intellectual context.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/stories">Stories</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/workflow">Submission process</Link>
        <Link href="/contributors">Contributors</Link>
        <Link href="/sponsors">Sponsors</Link>
        <Link href="/sources">Sources</Link>
        <Link href="/muslims-in-history">Muslims in History</Link>
        <Link href="/ask">Help and AI Ask</Link>
        <Link href="/admin">Staff sign in</Link>
        <Link href="/donate">Donate</Link>
      </nav>
      <small>
        Sample MVP data uses source links for review and placeholder YouTube embeds. Replace with
        approved/licensed media before launch.
      </small>
    </footer>
  )
}
