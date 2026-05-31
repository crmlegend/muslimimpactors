import React from 'react'

import { isSuperAdminRole } from '@/access/roles'

type AdminAIAdminLinkProps = {
  user?: unknown
}

export function AdminAIAdminLink({ user }: AdminAIAdminLinkProps) {
  if (!isSuperAdminRole(user)) {
    return null
  }

  return (
    <a className="nav__link" href="/admin-ai" id="nav-admin-ai">
      <span className="nav__link-label">Admin AI Command Center</span>
    </a>
  )
}
