import type { CollectionConfig } from 'payload'

import { pageBlocks } from '@/blocks/pageBlocks'
import { internalOnly, publicPublishedOrInternal, validatePublishGate } from '@/access/roles'
import {
  approvalFields,
  citationRelationshipField,
  editorialNotesField,
  previewBySlug,
  seoFields,
  sponsorshipField,
  workflowStatusField,
} from './shared'

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['title', 'articleType', 'workflowStatus'],
    description:
      'Create encyclopedia-style articles for concepts, events, places, organizations, and context pages.',
    preview: previewBySlug('/articles'),
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'articleType',
      type: 'select',
      options: [
        { label: 'Historical Event', value: 'historical_event' },
        { label: 'Concept', value: 'concept' },
        { label: 'Movement', value: 'movement' },
        { label: 'Timeline', value: 'timeline' },
        { label: 'Personality Context', value: 'person_context' },
        { label: 'Organization', value: 'organization' },
        { label: 'Policy', value: 'policy' },
        { label: 'Place', value: 'place' },
        { label: 'Technical Milestone', value: 'technical_milestone' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    { name: 'leadSummary', type: 'textarea', required: true },
    {
      name: 'infobox',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'tableOfContentsEnabled', type: 'checkbox', defaultValue: true },
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
        { name: 'sectionSources', type: 'relationship', hasMany: true, relationTo: 'sources' },
      ],
    },
    {
      name: 'contentBlocks',
      type: 'blocks',
      blocks: pageBlocks,
    },
    { name: 'relatedPeople', type: 'relationship', hasMany: true, relationTo: 'people' },
    { name: 'relatedStories', type: 'relationship', hasMany: true, relationTo: 'stories' },
    { name: 'relatedTopics', type: 'relationship', hasMany: true, relationTo: 'topics' },
    { name: 'relatedPlaces', type: 'relationship', hasMany: true, relationTo: 'places' },
    citationRelationshipField,
    sponsorshipField,
    { name: 'lastReviewedAt', type: 'date' },
    { name: 'reviewedBy', type: 'relationship', relationTo: 'users' },
    { name: 'expertReviewedBy', type: 'relationship', relationTo: 'people' },
    { name: 'revisionSummary', type: 'text' },
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
