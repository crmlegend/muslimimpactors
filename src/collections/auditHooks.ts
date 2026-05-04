import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload'

type AuditAction = 'create' | 'delete' | 'publish' | 'unpublish' | 'update'

const ignoredFields = new Set(['createdAt', 'updatedAt', 'sizes'])

const stringifyValue = (value: unknown) => {
  if (value === undefined) {
    return ''
  }

  try {
    const rendered = typeof value === 'string' ? value : JSON.stringify(value)

    return rendered.length > 2500 ? `${rendered.slice(0, 2500)}...` : rendered
  } catch {
    return String(value)
  }
}

const getTitle = (doc: Record<string, unknown>, titleField?: string) => {
  const title =
    (titleField && doc[titleField]) || doc.title || doc.name || doc.shortCitation || doc.email || doc.slug

  return stringifyValue(title || doc.id || 'Untitled record')
}

const getUserId = (user: unknown) => {
  const id = (user as { id?: number | string } | undefined)?.id

  if (typeof id === 'number') {
    return id
  }

  if (typeof id === 'string') {
    const parsed = Number(id)

    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

const getUserEmail = (user: unknown) =>
  (user as { email?: string } | undefined)?.email || 'system-seed-or-local-api'

const getChangedFields = (
  previousDoc: Record<string, unknown> | undefined,
  doc: Record<string, unknown>,
) => {
  if (!previousDoc) {
    return Object.keys(doc)
      .filter((field) => !ignoredFields.has(field))
      .slice(0, 30)
      .map((field) => ({
        afterValue: stringifyValue(doc[field]),
        beforeValue: '',
        field,
      }))
  }

  return Array.from(new Set([...Object.keys(previousDoc), ...Object.keys(doc)]))
    .filter((field) => !ignoredFields.has(field))
    .filter((field) => stringifyValue(previousDoc[field]) !== stringifyValue(doc[field]))
    .slice(0, 30)
    .map((field) => ({
      afterValue: stringifyValue(doc[field]),
      beforeValue: stringifyValue(previousDoc[field]),
      field,
    }))
}

const resolveAction = (
  operation: 'create' | 'update',
  previousDoc: Record<string, unknown> | undefined,
  doc: Record<string, unknown>,
): AuditAction => {
  if (operation === 'create') {
    return 'create'
  }

  if (previousDoc?.workflowStatus !== 'published' && doc.workflowStatus === 'published') {
    return 'publish'
  }

  if (previousDoc?.workflowStatus === 'published' && doc.workflowStatus !== 'published') {
    return 'unpublish'
  }

  return 'update'
}

const writeAuditLog = async ({
  action,
  collectionSlug,
  doc,
  previousDoc,
  req,
  titleField,
}: {
  action: AuditAction
  collectionSlug: string
  doc: Record<string, unknown>
  previousDoc?: Record<string, unknown>
  req: Parameters<CollectionAfterChangeHook>[0]['req']
  titleField?: string
}) => {
  const changedFields =
    action === 'delete'
      ? [
          {
            afterValue: '',
            beforeValue: getTitle(doc, titleField),
            field: 'record',
          },
        ]
      : getChangedFields(previousDoc, doc)

  if (action === 'update' && changedFields.length === 0) {
    return
  }

  const changedBy = getUserId(req.user)
  const changedAt = new Date().toISOString()
  const publishedAt = action === 'publish' ? changedAt : undefined

  await req.payload.create({
    collection: 'audit-logs',
    data: {
      action,
      afterSnapshot: action === 'delete' ? '' : stringifyValue(doc),
      beforeSnapshot: previousDoc ? stringifyValue(previousDoc) : '',
      changedAt,
      changedBy,
      changedByEmail: getUserEmail(req.user),
      changedFields,
      collectionSlug,
      documentId: stringifyValue(doc.id),
      documentTitle: getTitle(doc, titleField),
      publishedAt,
      publishedBy: action === 'publish' ? changedBy : undefined,
      summary:
        changedFields.length > 0
          ? `${changedFields.map((field) => field.field).join(', ')} changed.`
          : `${action} action recorded.`,
    },
    overrideAccess: true,
  })
}

export const withAudit = (collection: CollectionConfig, titleField?: string): CollectionConfig => {
  const afterChange: CollectionAfterChangeHook = async ({ doc, operation, previousDoc, req }) => {
    await writeAuditLog({
      action: resolveAction(operation, previousDoc, doc),
      collectionSlug: collection.slug,
      doc,
      previousDoc,
      req,
      titleField,
    })

    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
    await writeAuditLog({
      action: 'delete',
      collectionSlug: collection.slug,
      doc,
      req,
      titleField,
    })

    return doc
  }

  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange || []), afterChange],
      afterDelete: [...(collection.hooks?.afterDelete || []), afterDelete],
    },
  }
}
