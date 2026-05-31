import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import { isSuperAdminRole } from '@/access/roles'
import AdminAICommandCenter from './AdminAICommandCenter'

export const dynamic = 'force-dynamic'

export default async function AdminAIPage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!isSuperAdminRole(user)) {
    redirect('/admin/login?redirect=/admin-ai')
  }

  const userLabel =
    typeof user?.email === 'string' ? user.email : typeof user?.id === 'number' ? `User #${user.id}` : 'Super admin'

  return (
    <div className="archive-shell">
      <AdminAICommandCenter userLabel={userLabel} />
    </div>
  )
}
