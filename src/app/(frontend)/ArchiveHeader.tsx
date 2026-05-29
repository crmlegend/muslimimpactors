'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import AskArchiveDemo from './ask/AskArchiveDemo'
import { searchGroups, searchItems } from './archiveData'

export default function ArchiveHeader() {
  const [helpOpen, setHelpOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return searchItems.slice(0, 6)
    }

    return searchItems.filter((item) => {
      const haystack = `${item.title} ${item.type} ${item.meta} ${item.summary}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [query])

  return (
    <header className={`archive-header ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-top-row">
        <div className="brand-stack">
          <Link className="wordmark" href="/">
            Muslim Impactors
          </Link>
          <span>Public Service Archive and Civic Impact Network</span>
        </div>
        <button
          aria-controls="archive-primary-nav"
          aria-expanded={mobileMenuOpen}
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((value) => !value)}
          type="button"
        >
          Menu
        </button>
      </div>

      <nav className="utility-nav" aria-label="Primary navigation" id="archive-primary-nav">
        <Link href="/personalities">Personalities</Link>
        <Link href="/muslims-in-history">Muslims in History</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/ask">AI Ask</Link>
        <button
          aria-expanded={helpOpen}
          className="help-trigger"
          onClick={() => setHelpOpen((value) => !value)}
          type="button"
        >
          Help
        </button>
      </nav>

      <div className="header-actions" aria-label="Account and support links">
        <Link href="/workflow#register-interest">Register</Link>
        <Link href="/admin">Sign in</Link>
        <Link className="donate-link" href="/donate">
          Donate
        </Link>
      </div>

      <div className="search-area">
        <label className="search-box" htmlFor="archive-search">
          <span>Search</span>
          <input
            id="archive-search"
            onBlur={() => window.setTimeout(() => setSearchFocused(false), 140)}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search personalities, eras, works, places..."
            type="search"
            value={query}
          />
        </label>

        {searchFocused ? (
          <div className="mega-search" role="region" aria-label="Search results preview">
            <div className="mega-search-header">
              <strong>{query ? `Results for "${query}"` : 'Explore the archive'}</strong>
              <span>{filteredResults.length} preview results</span>
            </div>
            <div className="mega-search-grid">
              {searchGroups.map((group) => {
                const groupResults = filteredResults.filter((item) => item.type === group)

                return (
                  <section key={group}>
                    <h2>{group}</h2>
                    {groupResults.length > 0 ? (
                      groupResults.map((item) => (
                        <Link className="result-row" href={item.href} key={item.title}>
                          <span>{item.title}</span>
                          <small>{item.meta}</small>
                        </Link>
                      ))
                    ) : (
                      <p>No matching records yet.</p>
                    )}
                  </section>
                )
              })}
            </div>
            <div className="mega-search-footer">
              <span>
                Results include personalities, civic work, historical context, sources, and
                contributors.
              </span>
              <Link href="/search">Open full search</Link>
            </div>
          </div>
        ) : null}
      </div>

      {helpOpen ? (
        <section className="help-popover" aria-label="Visitor help and contact">
          <strong>How can we help?</strong>
          <p>
            Ask the archive assistant first. If the question needs a human follow-up, it can be
            queued for the editorial team.
          </p>
          <AskArchiveDemo compact helpMode />
          <div>
            <Link href="/ask">Ask the archive AI</Link>
            <a href="mailto:help@muslimimpactors.com">Contact editors</a>
          </div>
        </section>
      ) : null}
    </header>
  )
}
