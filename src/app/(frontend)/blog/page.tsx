import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { blogPosts } from '../archiveData'

export default function BlogPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Blog</span>
          <h1>Research notes, editorial updates, and institute announcements.</h1>
          <p>
            Blog posts are the lighter-weight publishing surface for updates that should not become
            encyclopedia articles.
          </p>
        </section>

        <section className="directory-grid">
          {blogPosts.map((post) => (
            <Link className="directory-card" href={post.href} key={post.title}>
              <small>{post.date}</small>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
