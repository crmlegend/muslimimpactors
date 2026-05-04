'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import WikipediaPortrait from './WikipediaPortrait'
import type { Personality, StoryChapter, StoryRow, YoutubeVideo } from './archiveData'

type PersonalityMediaWorkspaceProps = {
  chapters: StoryChapter[]
  person: Personality
  relatedPeople: Personality[]
  relatedStoryPeople: Personality[]
  relatedStories: StoryRow[]
  story: StoryRow
  video: YoutubeVideo
}

const tabs = ['Related', 'Transcript', 'Biography', 'Info'] as const

export default function PersonalityMediaWorkspace({
  chapters,
  person,
  relatedPeople,
  relatedStoryPeople,
  relatedStories,
  story,
  video,
}: PersonalityMediaWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Related')
  const [chapterQuery, setChapterQuery] = useState('')
  const [liked, setLiked] = useState(false)
  const [playAll, setPlayAll] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)

  const filteredChapters = useMemo(() => {
    const query = chapterQuery.trim().toLowerCase()

    if (!query) {
      return chapters
    }

    return chapters.filter(
      (chapter) =>
        chapter.title.toLowerCase().includes(query) ||
        chapter.transcript.toLowerCase().includes(query),
    )
  }, [chapters, chapterQuery])

  const filteredChapterIndexes = useMemo(
    () =>
      filteredChapters
        .map((chapter) => chapters.findIndex((item) => item.title === chapter.title))
        .filter((index) => index >= 0),
    [chapters, filteredChapters],
  )
  const activeChapterIndex =
    chapterQuery.trim() && !filteredChapterIndexes.includes(activeChapter)
      ? (filteredChapterIndexes[0] ?? activeChapter)
      : activeChapter
  const activeTranscript =
    chapters[activeChapterIndex]?.transcript || chapters[activeChapter]?.transcript
  const embedId = video.embedId
  const activeStartSeconds = chapters[activeChapterIndex]?.startSeconds ?? 0
  const embedSrc = `https://www.youtube-nocookie.com/embed/${embedId}?start=${activeStartSeconds}&rel=0&modestbranding=1${
    playAll || activeChapterIndex > 0 ? '&autoplay=1' : ''
  }`

  return (
    <section className="speaker-workspace" id="media">
      <div className="speaker-player-column">
        <div className="speaker-video-frame">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            key={`${embedId}-${activeStartSeconds}-${playAll ? 'play' : 'pause'}`}
            src={embedSrc}
            title={video.title}
          />
        </div>

        <div className="speaker-video-meta">
          <div>
            <h2>{story.story}</h2>
            <p>
              {person.name} <span>{person.role}</span>
            </p>
            <div className="speaker-video-source">
              <strong>{video.source}</strong>
              <span>{video.note}</span>
            </div>
          </div>
          <div className="speaker-actions" aria-label="Story actions">
            <button
              aria-pressed={liked}
              className={liked ? 'is-active' : ''}
              onClick={() => setLiked((value) => !value)}
              type="button"
            >
              {liked ? 'Liked' : 'Like'}
            </button>
            <button
              aria-pressed={playAll}
              className="play-all-button"
              onClick={() => {
                setActiveChapter(0)
                setPlayAll((value) => !value)
              }}
              type="button"
            >
              {playAll ? 'Playing all' : 'Play all'}
            </button>
          </div>
        </div>

        <div className="chapter-search">
          <label htmlFor="chapter-search">Search within timestamps</label>
          <div>
            <input
              id="chapter-search"
              onChange={(event) => setChapterQuery(event.target.value)}
              placeholder="Search chapters, transcript, terms..."
              type="search"
              value={chapterQuery}
            />
            <button type="button">Search</button>
          </div>
        </div>

        <div className="chapter-list">
          {filteredChapters.map((chapter) => {
            const originalIndex = chapters.findIndex((item) => item.title === chapter.title)

            return (
              <button
                className={originalIndex === activeChapterIndex ? 'is-active' : ''}
                key={chapter.title}
                onClick={() => setActiveChapter(originalIndex)}
                type="button"
              >
                <span>{String(originalIndex + 1).padStart(2, '0')}.</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.views}</small>
                <em>{chapter.duration}</em>
              </button>
            )
          })}
        </div>
      </div>

      <aside className="speaker-panel">
        <div className="speaker-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Related' ? (
          <div className="speaker-tab-panel related-story-list">
            {relatedStories.map((relatedStory) => {
              const relatedPerson = relatedStoryPeople.find(
                (item) => item.name === relatedStory.name,
              )

              return (
                <Link href={relatedStory.href} key={relatedStory.slug}>
                  {relatedPerson ? (
                    <WikipediaPortrait
                      className="related-story-thumb"
                      initials={relatedPerson.initials}
                      name={relatedPerson.name}
                      tone={relatedPerson.tone}
                      wikipediaTitle={relatedPerson.wikipediaTitle}
                    />
                  ) : (
                    <span className="related-story-thumb">{relatedStory.length}</span>
                  )}
                  <strong>{relatedStory.story}</strong>
                  <small>
                    {relatedStory.name} - {relatedStory.length}
                  </small>
                </Link>
              )
            })}
          </div>
        ) : null}

        {activeTab === 'Transcript' ? (
          <div className="speaker-tab-panel">
            <h3>{chapters[activeChapterIndex]?.title}</h3>
            <p>{activeTranscript}</p>
          </div>
        ) : null}

        {activeTab === 'Biography' ? (
          <div className="speaker-tab-panel">
            <h3>{person.name}</h3>
            <p>
              {person.summary} This biography panel is designed to hold the reviewed life narrative,
              source confidence notes, key works, and editorial updates beside the active story.
            </p>
            <div className="mini-related-people">
              {relatedPeople.slice(0, 4).map((relatedPerson) => (
                <Link href={relatedPerson.href} key={relatedPerson.slug}>
                  {relatedPerson.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === 'Info' ? (
          <div className="speaker-tab-panel">
            <h3>Reader tools</h3>
            <p>
              Timestamp search, transcript navigation, likes, play-all, related stories, and source
              references are part of the public speaker page model.
            </p>
            <div className="comment-gate">
              <strong>Comments</strong>
              <p>Comments are available only after signup and sign-in.</p>
              <button type="button">Sign in to comment</button>
            </div>
          </div>
        ) : null}
      </aside>
    </section>
  )
}
