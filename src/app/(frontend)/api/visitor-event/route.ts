import config from '@payload-config'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'

const eventTypes = [
  'page_view',
  'search',
  'sponsor_click',
  'profile_open',
  'video_open',
  'signup_start',
  'donate_click',
  'other_task',
] as const

type VisitorEventType = (typeof eventTypes)[number]

const isVisitorEventType = (value: string): value is VisitorEventType =>
  (eventTypes as readonly string[]).includes(value)

const readText = (body: Record<string, unknown>, field: string, maxLength = 400) => {
  const value = body[field]

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

export const POST = async (request: NextRequest) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const eventType = readText(body, 'eventType', 60)
  const path = readText(body, 'path', 500) || '/'

  if (!isVisitorEventType(eventType)) {
    return Response.json({ message: 'Unsupported visitor event type.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'visitor-events',
      data: {
        eventType,
        ipAddress:
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          request.headers.get('x-real-ip') ||
          '',
        metadata: readText(body, 'metadata', 1600),
        occurredAt: new Date().toISOString(),
        path,
        referrer: request.headers.get('referer') || '',
        targetSlug: readText(body, 'targetSlug', 160),
        targetType: readText(body, 'targetType', 80),
        userAgent: request.headers.get('user-agent') || '',
        visitorId: readText(body, 'visitorId', 120),
      },
      overrideAccess: true,
    })
  } catch (error) {
    console.error('Visitor event logging failed', error)

    return Response.json({ logged: false, ok: true }, { status: 202 })
  }

  return Response.json({ ok: true })
}
