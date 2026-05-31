export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({
    commit: process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7),
    ok: true,
    service: 'muslim-impactors',
  })
}
