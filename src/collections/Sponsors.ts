import type { CollectionConfig } from 'payload'

import { internalOnly, publicPublishedOrInternal, validatePublishGate } from '@/access/roles'
import { approvalFields, editorialNotesField, seoFields, workflowStatusField } from './shared'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['name', 'sponsorType', 'workflowStatus'],
    description:
      'Manage sponsors and connect them to articles, personalities, stories, essays, pages, and public campaigns.',
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'sponsorType',
      type: 'select',
      defaultValue: 'organization',
      options: [
        { label: 'Organization', value: 'organization' },
        { label: 'Foundation', value: 'foundation' },
        { label: 'Individual', value: 'individual' },
        { label: 'Family', value: 'family' },
        { label: 'Institution', value: 'institution' },
        { label: 'Campaign', value: 'campaign' },
      ],
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Public sponsor description shown on sponsor pages and content credits.',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: {
        description: 'Optional public sponsor website.',
      },
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'sponsoredPeople',
      type: 'relationship',
      hasMany: true,
      relationTo: 'people',
      admin: {
        description: 'People or profiles directly sponsored by this sponsor.',
      },
    },
    {
      name: 'sponsoredStories',
      type: 'relationship',
      hasMany: true,
      relationTo: 'stories',
    },
    {
      name: 'sponsoredArticles',
      type: 'relationship',
      hasMany: true,
      relationTo: 'articles',
    },
    {
      name: 'sponsoredEssays',
      type: 'relationship',
      hasMany: true,
      relationTo: 'expert-essays',
    },
    {
      name: 'sponsoredPages',
      type: 'relationship',
      hasMany: true,
      relationTo: 'pages',
    },
    {
      name: 'publicCreditLine',
      type: 'text',
      admin: {
        description:
          'Optional wording shown on public pages, for example “Research supported by ...”.',
      },
    },
    ...approvalFields({ rights: false }),
    seoFields,
    workflowStatusField,
    editorialNotesField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        validatePublishGate({ data, originalDoc, req, requireRightsClearance: false })
        return data
      },
    ],
  },
}
