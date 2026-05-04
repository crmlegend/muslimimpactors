import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'

export const Places: CollectionConfig = {
  slug: 'places',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: () => true,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['name', 'placeType'],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'placeType',
      type: 'select',
      options: [
        { label: 'City', value: 'city' },
        { label: 'Region', value: 'region' },
        { label: 'Country', value: 'country' },
        { label: 'Institution', value: 'institution' },
        { label: 'Landmark', value: 'landmark' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
      ],
    },
    { name: 'description', type: 'textarea' },
    { name: 'relatedSources', type: 'relationship', hasMany: true, relationTo: 'sources' },
  ],
}
