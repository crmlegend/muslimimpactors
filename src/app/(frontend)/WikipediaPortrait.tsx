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
  const [image, setImage] = useState<{ source: string; title: string } | null>(null)
  const canFetchImage = canFetchWikipediaSummary(wikipediaTitle)
  const imageSource = canFetchImage && image?.title === wikipediaTitle ? image.source : null

  useEffect(() => {
    if (!canFetchImage) {
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
          setImage({ source: data.thumbnail.source, title: wikipediaTitle })
        }
      } catch {
        if (!controller.signal.aborted) {
          setImage((currentImage) =>
            currentImage?.title === wikipediaTitle ? null : currentImage,
          )
        }
      }
    }

    void loadImage()

    return () => controller.abort()
  }, [canFetchImage, wikipediaTitle])

  return (
    <div
      aria-label={`${name} portrait`}
      className={`${className} ${imageSource ? 'has-photo' : ''}`.trim()}
      role="img"
      style={
        {
          '--portrait-image': imageSource ? `url("${imageSource}")` : undefined,
          '--portrait-tone': tone,
        } as React.CSSProperties
      }
    >
      {imageSource ? null : initials}
    </div>
  )
}
