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
    defaultColumns: ['name', 'sponsorType', 'homepageAdEnabled', 'adPlacementOrder', 'workflowStatus'],
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
      name: 'gratitudeStatement',
      type: 'textarea',
      admin: {
        description: 'Public gratitude copy shown near the top of the sponsor page.',
      },
    },
    {
      name: 'focus',
      type: 'text',
      admin: {
        description: 'Short public focus line for sponsor cards and the sponsor page aside.',
      },
    },
    {
      name: 'impactHighlights',
      type: 'array',
      admin: {
        description: 'Source-safe public impact cards for the sponsor detail page.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'recognitionPoints',
      type: 'array',
      admin: {
        description: 'Bullet points recognizing sponsor support without unsupported claims.',
      },
      fields: [{ name: 'point', type: 'text', required: true }],
    },
    {
      name: 'detailSections',
      type: 'array',
      admin: {
        description: 'Long-form public sections for sponsor context, references, or program notes.',
      },
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
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
      name: 'homepageAdEnabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this sponsor in the homepage sponsor ad stack when selected by settings.',
      },
    },
    {
      name: 'adPlacementOrder',
      type: 'number',
      defaultValue: 99,
      admin: {
        description: 'Default homepage ad order. Lower numbers appear first.',
      },
    },
    {
      name: 'bannerLabel',
      type: 'text',
      admin: {
        description: 'Short label shown above this sponsor on ad cards.',
      },
    },
    {
      name: 'bannerImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional wide sponsor banner image for public sponsor pages.',
      },
    },
    {
      name: 'sponsorPageDetails',
      type: 'textarea',
      admin: {
        description: 'Public detail paragraph shown on the sponsor page.',
      },
    },
    {
      name: 'primaryCallToActionLabel',
      type: 'text',
    },
    {
      name: 'primaryCallToActionUrl',
      type: 'text',
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
