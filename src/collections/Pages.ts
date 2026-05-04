import type { CollectionConfig } from 'payload'

import { pageBlocks } from '@/blocks/pageBlocks'
import { internalOnly, publicPublishedOrInternal, validatePublishGate } from '@/access/roles'
import {
  approvalFields,
  editorialNotesField,
  previewBySlug,
  seoFields,
  sponsorshipField,
  workflowStatusField,
} from './shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['title', 'pagePurpose', 'workflowStatus'],
    description:
      'Assemble flexible public pages from reusable blocks. Use for special research pages, topic landings, and institute pages.',
    preview: previewBySlug(''),
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'pagePurpose',
      type: 'select',
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'Topic Landing', value: 'topic_landing' },
        { label: 'Collection', value: 'collection' },
        { label: 'Campaign', value: 'campaign' },
        { label: 'About', value: 'about' },
        { label: 'Press', value: 'press' },
        { label: 'Custom', value: 'custom' },
      ],
      required: true,
    },
    {
      name: 'layoutBlocks',
      type: 'blocks',
      blocks: pageBlocks,
      required: true,
    },
    sponsorshipField,
    ...approvalFields({ rights: true }),
    seoFields,
    workflowStatusField,
    editorialNotesField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        validatePublishGate({ data, originalDoc, req, requireRightsClearance: true })
        return data
      },
    ],
  },
}
