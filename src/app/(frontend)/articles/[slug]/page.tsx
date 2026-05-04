import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import ArchiveHeader from '../../ArchiveHeader'
import {
  articleRows,
  getArticleDetail,
  getSponsorForRecord,
  personalities,
  sourceRows,
} from '../../archiveData'

type ArticleDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return articleRows.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const { slug } = await params
  const article = articleRows.find((item) => item.slug === slug)

  if (!article) {
    return {}
  }

  return {
    title: `${article.title} | Muslim Impactors`,
    description: article.summary,
  }
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params
  const article = articleRows.find((item) => item.slug === slug)

  if (!article) {
    notFound()
  }

  const relatedPeople = personalities.slice(0, 4)
  const articleDetail = getArticleDetail(article)
  const sponsor = getSponsorForRecord(article.slug)
  const connectedPeople = articleDetail.relatedPeople
    .map((name) => personalities.find((person) => person.name === name))
    .filter((person): person is (typeof personalities)[number] => Boolean(person))
  const relatedPeopleToShow = connectedPeople.length > 0 ? connectedPeople : relatedPeople

  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="profile-page">
        <section className="profile-hero">
          <div>
            <span>{article.kind}</span>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </div>
          <aside>
            <strong>Article contents</strong>
            <div className="article-toc">
              {articleDetail.tableOfContents.map((item) => (
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={item}>
                  {item}
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="article-infobox-row" aria-label="Article infobox">
          {articleDetail.infobox.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>

        <section className="two-column-content">
          <article>
            <div className="detail-section-list">
              {articleDetail.sections.map((section) => (
                <section id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </article>

          <aside className="source-stack">
            <div>
              <small>Research support</small>
              <strong>
                <Link href={sponsor.href}>{sponsor.name}</Link>
              </strong>
              <p>{sponsor.focus}</p>
            </div>
            <div>
              <small>Reference links</small>
              <strong>Wiki-backed starting points</strong>
              <p>
                These are starter references for review. Editors should preserve attribution and add
                stronger primary or specialist sources before final publication.
              </p>
            </div>
            {articleDetail.sourceLinks.map((source) => (
              <div key={source.label}>
                <small>Open reference</small>
                <strong>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                </strong>
              </div>
            ))}
            {sourceRows.map((source) => (
              <div key={source.title}>
                <small>{source.type}</small>
                <strong>{source.title}</strong>
                <p>{source.note}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="curated-strips inline-strip">
          <div className="panel-heading">
            <span>Related personalities</span>
            <h2>People connected to this article shape</h2>
          </div>
          <div className="compact-person-grid">
            {relatedPeopleToShow.map((person) => (
              <Link href={person.href} key={person.slug}>
                <span>{person.category}</span>
                <h3>{person.name}</h3>
                <p>{person.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
