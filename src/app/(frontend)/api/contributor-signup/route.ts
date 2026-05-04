import config from '@payload-config'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'

type RequestedRole = 'author' | 'editor' | 'subscriber'
type SourceOwnership =
  | 'licensed'
  | 'needs_review'
  | 'original'
  | 'permission_granted'
  | 'public_domain'

const allowedRequestedRoles = new Set<RequestedRole>(['author', 'editor', 'subscriber'])
const allowedSourceOwnership = new Set<SourceOwnership>([
  'licensed',
  'needs_review',
  'original',
  'permission_granted',
  'public_domain',
])

const readText = (body: Record<string, unknown>, field: string) =>
  typeof body[field] === 'string' ? body[field].trim() : ''

export const POST = async (request: NextRequest) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const name = readText(body, 'name')
  const email = readText(body, 'email').toLowerCase()
  const password = readText(body, 'password')
  const requestedRoleText = readText(body, 'requestedRole') as RequestedRole
  const requestedRole: RequestedRole = allowedRequestedRoles.has(requestedRoleText)
    ? requestedRoleText
    : 'author'
  const sourceOwnershipText = readText(body, 'sourceOwnership') as SourceOwnership
  const sourceOwnership: SourceOwnership = allowedSourceOwnership.has(sourceOwnershipText)
    ? sourceOwnershipText
    : 'original'
  const biography = readText(body, 'biography')

  if (!name || !email || !password) {
    return Response.json({ message: 'Name, email, and password are required.' }, { status: 400 })
  }

  if (requestedRole === 'author' && biography.length < 30) {
    return Response.json(
      { message: 'Authors must provide a biography of at least 30 characters.' },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: email } },
  })
  const existingUser = existingUsers.docs[0]
  const accountRole: 'author' | 'subscriber' = requestedRole === 'author' ? 'author' : 'subscriber'
  const user =
    existingUser ||
    (await payload.create({
      collection: 'users',
      data: {
        active: true,
        email,
        name,
        password,
        publicContributorProfile: {
          affiliation: readText(body, 'affiliation'),
          approvedContributor: false,
          biography,
          expertise: readText(body, 'expertise'),
          publicProfileEnabled: false,
          websiteOrSocial: readText(body, 'websiteOrSocial'),
        },
        requestedPublicRole: requestedRole,
        role: accountRole,
      },
      overrideAccess: true,
    }))

  await payload.create({
    collection: 'contributor-applications',
    data: {
      affiliation: readText(body, 'affiliation'),
      articleSummary: readText(body, 'articleSummary'),
      biography,
      createdUser: user.id,
      email,
      expertise: readText(body, 'expertise'),
      name,
      proposedTopic: readText(body, 'proposedTopic'),
      requestedRole,
      sourceOwnership,
      status: 'new',
      websiteOrSocial: readText(body, 'websiteOrSocial'),
    },
    overrideAccess: true,
  })

  return Response.json({
    message:
      'Signup received. Your account was created or linked, and your contributor application is queued for editorial review.',
  })
}
