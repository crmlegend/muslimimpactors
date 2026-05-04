import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: () => true,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['name', 'tagType'],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'tagType',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Era', value: 'era' },
        { label: 'Theme', value: 'theme' },
        { label: 'Technical', value: 'technical' },
        { label: 'Editorial', value: 'editorial' },
        { label: 'Rights', value: 'rights' },
        { label: 'AI', value: 'ai' },
      ],
      required: true,
    },
  ],
}
