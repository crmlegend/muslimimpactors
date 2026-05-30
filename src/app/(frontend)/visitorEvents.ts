'use client'

export type VisitorEventType =
  | 'page_view'
  | 'search'
  | 'sponsor_click'
  | 'profile_open'
  | 'video_open'
  | 'signup_start'
  | 'donate_click'
  | 'other_task'

type VisitorEventInput = {
  eventType: VisitorEventType
  metadata?: Record<string, unknown> | string
  targetSlug?: string
  targetType?: string
}

const getVisitorId = () => {
  const storageKey = 'muslim-impactors-visitor-id'
  const existingId = window.localStorage.getItem(storageKey)

  if (existingId) {
    return existingId
  }

  const visitorId = `mi-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  window.localStorage.setItem(storageKey, visitorId)

  return visitorId
}

const serializeMetadata = (metadata: VisitorEventInput['metadata']) => {
  if (!metadata) {
    return undefined
  }

  return typeof metadata === 'string' ? metadata : JSON.stringify(metadata)
}

export const logVisitorEvent = (event: VisitorEventInput) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    void fetch('/api/visitor-event', {
      body: JSON.stringify({
        ...event,
        metadata: serializeMetadata(event.metadata),
        path: window.location.pathname,
        visitorId: getVisitorId(),
      }),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      method: 'POST',
    }).catch(() => undefined)
  } catch {
    // Visitor logging must never block the public UI.
  }
}
