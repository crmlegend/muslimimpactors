import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import WikipediaPortrait from '../WikipediaPortrait'
import { personalities, storyRows, themes } from '../archiveData'

export default function ThemesPage() {
  const themeDirectory = themes.map((theme, index) => {
    const people = personalities.filter((person) => person.category === theme)
    const storyCount = storyRows.filter((story) =>
      people.some((person) => person.name === story.name),
    ).length

    return {
      count: people.length * 7 + storyCount + 18 + index * 3,
      people,
      storyCount,
      theme,
    }
  })
  const mostViewed = storyRows
    .map((story, index) => ({
      ...story,
      views: 980 - index * 74,
    }))
    .sort((a, b) => b.views - a.views)
  const highlightedThemes = themeDirectory.filter((theme) => theme.people.length > 0).slice(0, 6)

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="themes-hero">
          <h1>Themes</h1>
          <p>
            Browse the archive by disciplines, institutions, traditions, and historical questions.
            Each theme connects personalities, stories, timelines, sources, and reviewed essays.
          </p>
        </section>

        <section className="theme-directory-grid" aria-label="Theme directory">
          {themeDirectory.map((theme) => (
            <Link href={`/search?q=${encodeURIComponent(theme.theme)}`} key={theme.theme}>
              <strong>{theme.theme}</strong>
              <span>{theme.count} stories</span>
            </Link>
          ))}
        </section>

        <section className="theme-feature-block">
          <div className="panel-heading">
            <span>Theme highlights</span>
            <h2>Personalities connected to major research paths</h2>
          </div>
          <div className="theme-highlight-grid">
            {highlightedThemes.map((theme) => (
              <article key={theme.theme}>
                <div>
                  <small>{theme.theme}</small>
                  <h3>{theme.people[0]?.name}</h3>
                  <p>{theme.people[0]?.summary}</p>
                </div>
                <div className="theme-portrait-row">
                  {theme.people.slice(0, 4).map((person) => (
                    <Link href={person.href} key={person.slug}>
                      <WikipediaPortrait
                        className="theme-mini-portrait"
                        initials={person.initials}
                        name={person.name}
                        tone={person.tone}
                        wikipediaTitle={person.wikipediaTitle}
                      />
                      <span>{person.name}</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="theme-most-viewed">
          <div className="panel-heading">
            <span>Most viewed</span>
            <h2>Popular story chapters across themes</h2>
          </div>
          <div className="most-viewed-grid">
            {mostViewed.map((story) => {
              const person = personalities.find((item) => item.name === story.name)

              return (
                <Link href={story.href} key={story.slug}>
                  {person ? (
                    <WikipediaPortrait
                      className="most-viewed-thumb"
                      initials={person.initials}
                      name={person.name}
                      tone={person.tone}
                      wikipediaTitle={person.wikipediaTitle}
                    />
                  ) : null}
                  <strong>{story.story}</strong>
                  <span>
                    {story.name} - {story.role}
                  </span>
                  <em>{story.length}</em>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
