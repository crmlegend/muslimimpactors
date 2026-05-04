import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'

export const Occupations: CollectionConfig = {
  slug: 'occupations',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: () => true,
    update: internalOnly,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
  ],
}
