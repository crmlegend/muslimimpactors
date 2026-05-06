import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

const redact = (value: unknown) => {
  if (typeof value !== 'string') return value

  return value
    .replace(/(postgres(?:ql)?:\/\/[^:]+:)[^@]+(@)/gi, '$1[redacted]$2')
    .replace(/(DATABASE_URL=)[^\s]+/gi, '$1[redacted]')
    .replace(/(PAYLOAD_SECRET=)[^\s]+/gi, '$1[redacted]')
}

const getErrorDetails = (error: unknown) => {
  if (!(error instanceof Error)) {
    return {
      message: redact(String(error)),
      name: 'UnknownError',
    }
  }

  const cause = error.cause instanceof Error ? error.cause : undefined

  return {
    cause: cause
      ? {
          message: redact(cause.message),
          name: cause.name,
          stack: redact(cause.stack?.split('\n').slice(0, 8).join('\n')),
        }
      : undefined,
    message: redact(error.message),
    name: error.name,
    stack: redact(error.stack?.split('\n').slice(0, 12).join('\n')),
  }
}

const getDatabaseShape = () => {
  const databaseURL = process.env.DATABASE_URL || ''

  try {
    const url = new URL(databaseURL)

    return {
      databaseKind: url.protocol.replace(':', ''),
      databaseHost: url.hostname,
      databasePort: url.port || null,
      hasDatabaseURL: true,
    }
  } catch {
    return {
      databaseKind: databaseURL.startsWith('file:') ? 'file' : 'unknown',
      databaseHost: null,
      databasePort: null,
      hasDatabaseURL: Boolean(databaseURL),
    }
  }
}

const countCollection = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'users' | 'people' | 'stories' | 'articles',
) => {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  return result.totalDocs
}

const checkAdminImports = async () => {
  const [{ importMap }, views, layouts] = await Promise.all([
    import('../(payload)/admin/importMap.js'),
    import('@payloadcms/next/views'),
    import('@payloadcms/next/layouts'),
  ])

  return {
    importMapKeys: Object.keys(importMap || {}),
    hasRootLayout: typeof layouts.RootLayout === 'function',
    hasRootPage: typeof views.RootPage === 'function',
  }
}

export async function GET() {
  const env = {
    ...getDatabaseShape(),
    hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET),
    nextPublicSiteURL: process.env.NEXT_PUBLIC_SITE_URL || null,
    nodeEnv: process.env.NODE_ENV,
    payloadPostgresPush: process.env.PAYLOAD_POSTGRES_PUSH || null,
  }

  try {
    const payload = await getPayload({ config })
    const [adminImports, users, people, stories, articles] = await Promise.all([
      checkAdminImports(),
      countCollection(payload, 'users'),
      countCollection(payload, 'people'),
      countCollection(payload, 'stories'),
      countCollection(payload, 'articles'),
    ])

    return Response.json({
      admin: {
        ...adminImports,
        adminUserCollection: payload.config.admin.user,
        collections: payload.config.collections.map((collection) => collection.slug),
        cors: payload.config.cors,
        csrf: payload.config.csrf,
        serverURL: payload.config.serverURL,
      },
      counts: {
        articles,
        people,
        stories,
        users,
      },
      env,
      ok: true,
    })
  } catch (error) {
    return Response.json(
      {
        env,
        error: getErrorDetails(error),
        ok: false,
      },
      { status: 500 },
    )
  }
}
