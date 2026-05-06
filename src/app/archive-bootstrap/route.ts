import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

const countCollection = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'articles' | 'people' | 'stories' | 'users',
) => {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  return result.totalDocs
}

const isAuthorized = (request: Request) => {
  const expectedBearer = process.env.PAYLOAD_SECRET ? `Bearer ${process.env.PAYLOAD_SECRET}` : null
  const authorization = request.headers.get('authorization')

  return process.env.ALLOW_ARCHIVE_BOOTSTRAP === 'true' || authorization === expectedBearer
}

const getErrorDetails = (error: unknown) => {
  if (!(error instanceof Error)) {
    return {
      message: String(error),
      name: 'UnknownError',
    }
  }

  return {
    message: error.message,
    name: error.name,
    stack: error.stack?.split('\n').slice(0, 8).join('\n'),
  }
}

const getCounts = async () => {
  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })
  const [users, people, stories, articles] = await Promise.all([
    countCollection(payload, 'users'),
    countCollection(payload, 'people'),
    countCollection(payload, 'stories'),
    countCollection(payload, 'articles'),
  ])

  return {
    articles,
    people,
    stories,
    users,
  }
}

const runBootstrap = async (request: Request) => {
  try {
    const url = new URL(request.url)

    if (url.searchParams.get('confirm') !== 'seed') {
      return Response.json(
        {
          message: 'Seed bootstrap requires ?confirm=seed.',
          ok: false,
        },
        { status: 400 },
      )
    }

    if (!isAuthorized(request)) {
      return Response.json(
        {
          message:
            'Bootstrap is disabled. Temporarily set ALLOW_ARCHIVE_BOOTSTRAP=true in Railway, redeploy, seed once, then remove it.',
          ok: false,
        },
        { status: 403 },
      )
    }

    const before = await getCounts()

    if (before.people > 0 || before.stories > 0 || before.articles > 0) {
      return Response.json({
        before,
        message: 'Seed skipped because archive content already exists.',
        ok: true,
        skipped: true,
      })
    }

    const { seedArchive } = await import('../../scripts/seedArchive')

    await seedArchive({ includeMedia: false })

    return Response.json({
      after: await getCounts(),
      before,
      mediaMode: 'skipped',
      message: 'Archive seed complete.',
      ok: true,
      skipped: false,
    })
  } catch (error) {
    return Response.json(
      {
        error: getErrorDetails(error),
        message: 'Archive seed failed before completion.',
        ok: false,
      },
      { status: 500 },
    )
  }
}

export const GET = runBootstrap
export const POST = runBootstrap
