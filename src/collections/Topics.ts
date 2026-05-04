import type { CollectionConfig } from 'payload'

import { internalOnly, publicPublishedOrInternal, validatePublishGate } from '@/access/roles'
import { seoFields, workflowStatusField } from './shared'

export const Topics: CollectionConfig = {
  slug: 'topics',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['name', 'parentTopic', 'workflowStatus'],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'parentTopic', type: 'relationship', relationTo: 'topics' },
    { name: 'featuredImage', type: 'relationship', relationTo: 'media' },
    { name: 'relatedTopics', type: 'relationship', hasMany: true, relationTo: 'topics' },
    seoFields,
    workflowStatusField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        validatePublishGate({ data, originalDoc, req, requireEditorApproval: false })
        return data
      },
    ],
  },
}
