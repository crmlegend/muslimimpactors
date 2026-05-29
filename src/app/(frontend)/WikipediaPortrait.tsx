'use client'

import React, { useEffect, useState } from 'react'

import { canFetchWikipediaSummary } from './archiveData'

type WikipediaPortraitProps = {
  className?: string
  initials: string
  name: string
  tone: string
  wikipediaTitle: string
}

export default function WikipediaPortrait({
  className = '',
  initials,
  name,
  tone,
  wikipediaTitle,
}: WikipediaPortraitProps) {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (!canFetchWikipediaSummary(wikipediaTitle)) {
      setImage(null)
      return
    }

    const controller = new AbortController()

    const loadImage = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { thumbnail?: { source?: string } }

        if (!controller.signal.aborted && data.thumbnail?.source) {
          setImage(data.thumbnail.source)
        }
      } catch {
        if (!controller.signal.aborted) {
          setImage(null)
        }
      }
    }

    void loadImage()

    return () => controller.abort()
  }, [wikipediaTitle])

  return (
    <div
      aria-label={`${name} portrait`}
      className={`${className} ${image ? 'has-photo' : ''}`.trim()}
      role="img"
      style={
        {
          '--portrait-image': image ? `url("${image}")` : undefined,
          '--portrait-tone': tone,
        } as React.CSSProperties
      }
    >
      {image ? null : initials}
    </div>
  )
}
