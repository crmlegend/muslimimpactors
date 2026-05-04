import React from 'react'
import Link from 'next/link'

import ArchiveHeader from '../ArchiveHeader'
import { timelineEvents } from '../archiveData'

export default function TimelinesPage() {
  const today = new Date()
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeZone: 'America/New_York',
  }).format(today)
  const orderedEvents = [...timelineEvents].sort((a, b) => b.year - a.year)
  const typeCounts = orderedEvents.reduce<Record<string, number>>((counts, event) => {
    counts[event.type] = (counts[event.type] || 0) + 1
    return counts
  }, {})

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="timeline-hero">
          <div>
            <span>Timelines</span>
            <h1>Start from today, then move through people, events, works, and stories.</h1>
          </div>
          <p>
            Each visit opens with today&apos;s date and a scrollable historical index. Every record
            can link to a personality, story, article, theme, source, or future media chapter.
          </p>
        </section>

        <section className="timeline-dashboard" aria-label="Timeline index controls">
          <article className="today-card">
            <span>Today in the archive</span>
            <strong>{todayLabel}</strong>
            <p>
              Editors can later add exact anniversary matching. For MVP review, this page shows the
              current-date entry point plus a linked historical index.
            </p>
          </article>
          <div className="timeline-index-cards">
            {Object.entries(typeCounts).map(([type, count]) => (
              <a href={`#${type.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={type}>
                <strong>{count}</strong>
                <span>{type}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="timeline-scroll" aria-label="Detailed historical timeline">
          <article className="timeline-current-marker">
            <time>{todayLabel}</time>
            <h2>Current date marker</h2>
            <p>
              Visitors begin here. As the dataset grows, this marker can automatically surface
              events, births, deaths, works, and publication anniversaries connected to today.
            </p>
          </article>

          {orderedEvents.map((event) => (
            <article id={event.type.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={event.title}>
              <time>{event.date}</time>
              <div>
                <span>{event.type}</span>
                <h2>{event.title}</h2>
                <p>{event.body}</p>
                <div className="timeline-people">
                  {event.people.map((person) => (
                    <small key={person}>{person}</small>
                  ))}
                </div>
                <Link href={event.href}>Open linked record</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
