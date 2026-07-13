import type { Access } from 'payload'

export const roleOptions = [
  { label: 'Subscriber', value: 'subscriber' },
  { label: 'Author', value: 'author' },
  { label: 'Writer / Researcher', value: 'writer_researcher' },
  { label: 'Editor', value: 'editor' },
  { label: 'Legal / Rights Reviewer', value: 'legal_rights_reviewer' },
  { label: 'Social Manager', value: 'social_manager' },
  { label: 'Publisher / Admin', value: 'publisher_admin' },
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Read-only Reviewer', value: 'read_only_reviewer' },
] as const

export type UserRole = (typeof roleOptions)[number]['value']

const getRole = (user: unknown): UserRole | undefined => (user as { role?: UserRole } | null)?.role

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isPublisherRole = (user: unknown) => {
  const role = getRole(user)

  return role === 'publisher_admin' || role === 'super_admin'
}

export const isPublisher: Access = ({ req: { user } }) => isPublisherRole(user)

export const isSuperAdminRole = (user: unknown) => getRole(user) === 'super_admin'

export const isSuperAdmin: Access = ({ req: { user } }) => isSuperAdminRole(user)

export const isEditorialRole = (user: unknown) => {
  const role = getRole(user)

  return role === 'editor' || role === 'publisher_admin' || role === 'super_admin'
}

export const isEditorial: Access = ({ req: { user } }) => isEditorialRole(user)

export const isSocialRole = (user: unknown) => {
  const role = getRole(user)

  return role === 'social_manager' || role === 'publisher_admin' || role === 'super_admin'
}

export const isRightsRole = (user: unknown) => {
  const role = getRole(user)

  return role === 'legal_rights_reviewer' || role === 'publisher_admin' || role === 'super_admin'
}

export const isRightsReviewer: Access = ({ req: { user } }) => isRightsRole(user)

export const internalOnly: Access = ({ req: { user } }) =>
  Boolean(user) && getRole(user) !== 'subscriber'
export const internalContributorOnly: Access = ({ req: { user } }) =>
  Boolean(user) && getRole(user) !== 'subscriber'

export const publicPublishedOrInternal: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    workflowStatus: {
      equals: 'published',
    },
  }
}

export const validatePublishGate = ({
  data,
  originalDoc,
  req,
  requireEditorApproval = true,
  requireRightsClearance = false,
  requireExpertApproval = false,
}: {
  data: Record<string, unknown>
  originalDoc?: Record<string, unknown>
  req: { user?: unknown }
  requireEditorApproval?: boolean
  requireExpertApproval?: boolean
  requireRightsClearance?: boolean
}) => {
  const targetStatus = data.workflowStatus ?? originalDoc?.workflowStatus

  if (targetStatus !== 'published') {
    return
  }

  if (!isPublisherRole(req.user)) {
    throw new Error('Only Publisher / Admin users can publish content.')
  }

  const editorApproved = data.editorApproved ?? originalDoc?.editorApproved
  const rightsCleared = data.rightsCleared ?? originalDoc?.rightsCleared
  const expertApproved = data.expertApproved ?? originalDoc?.expertApproved

  if (requireEditorApproval && editorApproved !== true) {
    throw new Error('Editor approval is required before publishing.')
  }

  if (requireRightsClearance && rightsCleared !== true) {
    throw new Error('Legal / rights clearance is required before publishing.')
  }

  if (requireExpertApproval && expertApproved !== true) {
    throw new Error('Expert approval is required before publishing this essay.')
  }
}
