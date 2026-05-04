import Link from 'next/link'
import React from 'react'

import ArchiveHeader from '../ArchiveHeader'
import { storyRows, youtubeVideos } from '../archiveData'

export default function StoriesPage() {
  return (
    <div className="archive-shell">
      <ArchiveHeader />
      <main className="directory-page">
        <section className="page-hero compact">
          <span>Story archive</span>
          <h1>Chaptered life stories, transcripts, and related sources.</h1>
          <p>
            Explore documentary-style story chapters with video, transcript space, related
            personalities, and source-backed notes.
          </p>
        </section>

        <section className="directory-grid">
          {storyRows.map((row) => (
            <Link className="directory-card" href={row.href} key={row.story}>
              <small>{row.length}</small>
              <h2>{row.story}</h2>
              <p>{row.name}</p>
              <strong>{row.role}</strong>
            </Link>
          ))}
        </section>

        <section className="video-shelf inline">
          <div className="panel-heading">
            <span>Embedded references</span>
            <h2>Documentary video rail</h2>
          </div>
          <div className="video-grid">
            {youtubeVideos.map((video) => (
              <article key={video.embedId}>
                <div className="video-frame">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    src={`https://www.youtube-nocookie.com/embed/${video.embedId}`}
                    title={video.title}
                  />
                </div>
                <span>{video.topic}</span>
                <h3>{video.title}</h3>
                <p>{video.source}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
