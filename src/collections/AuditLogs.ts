import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/access/roles'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: {
    singular: 'Audit Log',
    plural: 'Audit Logs',
  },
  access: {
    create: () => false,
    delete: () => false,
    read: isSuperAdmin,
    update: () => false,
  },
  admin: {
    defaultColumns: ['changedAt', 'action', 'collectionSlug', 'documentTitle', 'changedByEmail'],
    description:
      'System record of content changes, publishing actions, users, timestamps, and field-level summaries.',
    useAsTitle: 'documentTitle',
  },
  fields: [
    {
      name: 'action',
      type: 'select',
      options: [
        { label: 'Create', value: 'create' },
        { label: 'Update', value: 'update' },
        { label: 'Publish', value: 'publish' },
        { label: 'Unpublish', value: 'unpublish' },
        { label: 'Delete', value: 'delete' },
      ],
      required: true,
    },
    { name: 'collectionSlug', type: 'text', required: true },
    { name: 'documentId', type: 'text', required: true },
    { name: 'documentTitle', type: 'text', required: true },
    { name: 'changedBy', type: 'relationship', relationTo: 'users' },
    { name: 'changedByEmail', type: 'text', required: true },
    { name: 'changedAt', type: 'date', required: true },
    { name: 'publishedBy', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description:
          'Short machine-generated summary of the affected fields. Use the field list below for details.',
      },
    },
    {
      name: 'changedFields',
      type: 'array',
      fields: [
        { name: 'field', type: 'text', required: true },
        { name: 'beforeValue', type: 'textarea' },
        { name: 'afterValue', type: 'textarea' },
      ],
    },
    {
      name: 'beforeSnapshot',
      type: 'textarea',
      admin: { description: 'Previous document snapshot, stored as JSON text for review.' },
    },
    {
      name: 'afterSnapshot',
      type: 'textarea',
      admin: { description: 'Current document snapshot, stored as JSON text for review.' },
    },
  ],
}
