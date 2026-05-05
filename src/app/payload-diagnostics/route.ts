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

export async function GET() {
  try {
    const payload = await getPayload({ config })

    return Response.json({
      collections: payload.config.collections.map((collection) => collection.slug),
      env: {
        ...getDatabaseShape(),
        hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET),
        nodeEnv: process.env.NODE_ENV,
        payloadPostgresPush: process.env.PAYLOAD_POSTGRES_PUSH || null,
      },
      ok: true,
    })
  } catch (error) {
    return Response.json(
      {
        env: {
          ...getDatabaseShape(),
          hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET),
          nodeEnv: process.env.NODE_ENV,
          payloadPostgresPush: process.env.PAYLOAD_POSTGRES_PUSH || null,
        },
        error: getErrorDetails(error),
        ok: false,
      },
      { status: 500 },
    )
  }
}
