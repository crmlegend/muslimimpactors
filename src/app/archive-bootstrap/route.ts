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

const publishableCollections = [
  {
    collection: 'topics',
    data: (_now: string) => ({
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'sources',
    data: (_now: string) => ({
      rightsStatus: 'permission_granted',
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'people',
    data: (now: string) => ({
      editorApproved: true,
      editorApprovedAt: now,
      rightsCleared: true,
      rightsClearedAt: now,
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'stories',
    data: (now: string) => ({
      editorApproved: true,
      editorApprovedAt: now,
      rightsCleared: true,
      rightsClearedAt: now,
      rightsStatus: 'permission_granted',
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'articles',
    data: (now: string) => ({
      editorApproved: true,
      editorApprovedAt: now,
      lastReviewedAt: now,
      rightsCleared: true,
      rightsClearedAt: now,
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'expert-essays',
    data: (now: string) => ({
      editorApproved: true,
      editorApprovedAt: now,
      expertApproved: true,
      expertApprovedAt: now,
      rightsCleared: true,
      rightsClearedAt: now,
      rightsStatus: 'permission_granted',
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'pages',
    data: (now: string) => ({
      editorApproved: true,
      editorApprovedAt: now,
      rightsCleared: true,
      rightsClearedAt: now,
      workflowStatus: 'published',
    }),
  },
  {
    collection: 'sponsors',
    data: (now: string) => ({
      editorApproved: true,
      editorApprovedAt: now,
      workflowStatus: 'published',
    }),
  },
] as const

type BootstrapPayload = Awaited<ReturnType<typeof getPayload>>
type PublishableCollection = (typeof publishableCollections)[number]['collection']

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

const getCounts = async (payload?: BootstrapPayload) => {
  const instance = payload ?? (await getPayloadInstance())
  const [users, people, stories, articles] = await Promise.all([
    countCollection(instance, 'users'),
    countCollection(instance, 'people'),
    countCollection(instance, 'stories'),
    countCollection(instance, 'articles'),
  ])

  return {
    articles,
    people,
    stories,
    users,
  }
}

const getPayloadInstance = async () => {
  const { default: config } = await import('@payload-config')
  return getPayload({ config })
}

const findPublisherUser = async (payload: BootstrapPayload) => {
  const publisherResult = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { role: { equals: 'publisher_admin' } },
  })

  if (publisherResult.docs[0]) {
    return publisherResult.docs[0]
  }

  const superAdminResult = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { role: { equals: 'super_admin' } },
  })

  if (superAdminResult.docs[0]) {
    return superAdminResult.docs[0]
  }

  throw new Error('Cannot publish seed content because no publisher_admin or super_admin user exists.')
}

const getCollectionIds = async (payload: BootstrapPayload, collection: PublishableCollection) => {
  const ids: Array<number | string> = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection,
      depth: 0,
      limit: 200,
      overrideAccess: true,
      page,
      pagination: true,
    })

    ids.push(...result.docs.map((doc) => doc.id))

    if (!result.hasNextPage) {
      break
    }

    page += 1
  }

  return ids
}

const publishSeedContent = async (payload: BootstrapPayload) => {
  const publisherUser = await findPublisherUser(payload)
  const now = new Date().toISOString()
  const result: Partial<Record<PublishableCollection, number>> = {}
  const bootstrapUpdater = payload as BootstrapPayload & {
    update: (args: Record<string, unknown>) => Promise<unknown>
  }

  for (const item of publishableCollections) {
    const ids = await getCollectionIds(payload, item.collection)
    result[item.collection] = ids.length

    for (const id of ids) {
      // This endpoint publishes several collection types in one guarded pass.
      await bootstrapUpdater.update({
        collection: item.collection,
        data: item.data(now),
        depth: 0,
        id,
        overrideAccess: true,
        user: publisherUser,
      })
    }
  }

  return result
}

const runBootstrap = async (request: Request) => {
  try {
    const url = new URL(request.url)
    const shouldPublish = url.searchParams.get('publish') !== 'false'

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

    const payload = await getPayloadInstance()
    const before = await getCounts(payload)

    if (before.people > 0 || before.stories > 0 || before.articles > 0) {
      const shouldRefreshSeed = url.searchParams.get('refresh') !== 'false'

      if (shouldRefreshSeed) {
        const { seedArchive } = await import('../../scripts/seedArchive')
        await seedArchive({ includeMedia: false })
      }

      const published = shouldPublish ? await publishSeedContent(payload) : undefined

      return Response.json({
        after: await getCounts(payload),
        before,
        message: shouldRefreshSeed
          ? 'Archive content already existed; seed data was refreshed and published.'
          : 'Seed skipped because archive content already exists.',
        ok: true,
        published,
        refreshed: shouldRefreshSeed,
        skipped: true,
      })
    }

    const { seedArchive } = await import('../../scripts/seedArchive')

    await seedArchive({ includeMedia: false })
    const published = shouldPublish ? await publishSeedContent(payload) : undefined

    return Response.json({
      after: await getCounts(payload),
      before,
      mediaMode: 'skipped',
      message: 'Archive seed complete.',
      ok: true,
      published,
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
