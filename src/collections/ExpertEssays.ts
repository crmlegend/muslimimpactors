import type { CollectionConfig } from 'payload'

import { internalOnly, publicPublishedOrInternal, validatePublishGate } from '@/access/roles'
import {
  approvalFields,
  citationRelationshipField,
  editorialNotesField,
  previewBySlug,
  rightsStatusField,
  seoFields,
  sponsorshipField,
  workflowStatusField,
} from './shared'

export const ExpertEssays: CollectionConfig = {
  slug: 'expert-essays',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['title', 'expert', 'expertApproved', 'workflowStatus'],
    description:
      'Upload expert-submitted Word/PDF material, edit it internally, and track expert approval before publication.',
    preview: previewBySlug('/essays'),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Public essay title.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier for the essay.' },
    },
    {
      name: 'expert',
      type: 'relationship',
      relationTo: 'people',
      required: true,
      admin: { description: 'Expert contributor credited as the essay author.' },
    },
    {
      name: 'expertTitle',
      type: 'text',
      admin: { description: 'Optional public credential line for the expert.' },
    },
    {
      name: 'requiredCreditLine',
      type: 'text',
      required: true,
      admin: { description: 'Exact credit line that must appear on the public essay.' },
    },
    {
      name: 'authorDashboard',
      type: 'group',
      label: 'Editor Upload & Drafting',
      fields: [
        {
          name: 'sourceDocument',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description:
              'Upload the expert-submitted Word document or PDF here. The editor can then paste or extract text into the editable draft fields below.',
          },
        },
        {
          name: 'submissionSource',
          type: 'select',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Word Document', value: 'word_document' },
            { label: 'PDF', value: 'pdf' },
            { label: 'Direct Entry', value: 'direct_entry' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'submissionReceivedAt', type: 'date' },
        {
          name: 'extractedText',
          type: 'textarea',
          admin: {
            description:
              'Paste extracted text here before editing. Automated extraction can be added later.',
          },
        },
        {
          name: 'editableDraft',
          type: 'richText',
          admin: {
            description: 'Editor-cleaned draft before moving to the public essay body.',
          },
        },
        {
          name: 'submissionStatus',
          type: 'select',
          defaultValue: 'uploaded',
          admin: {
            description:
              'Track whether the submission is uploaded, extracted, being edited, submitted for review, approved, or rejected.',
          },
          options: [
            { label: 'Uploaded', value: 'uploaded' },
            { label: 'Extracted', value: 'extracted' },
            { label: 'Editing', value: 'editing' },
            { label: 'Submitted for Review', value: 'submitted_for_review' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ],
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      admin: { description: 'Final public essay body after internal editing and approval.' },
    },
    {
      name: 'pullQuotes',
      type: 'array',
      fields: [{ name: 'quote', type: 'textarea', required: true }],
    },
    citationRelationshipField,
    { name: 'relatedPeople', type: 'relationship', hasMany: true, relationTo: 'people' },
    { name: 'relatedStories', type: 'relationship', hasMany: true, relationTo: 'stories' },
    { name: 'relatedArticles', type: 'relationship', hasMany: true, relationTo: 'articles' },
    { name: 'relatedTopics', type: 'relationship', hasMany: true, relationTo: 'topics' },
    sponsorshipField,
    rightsStatusField,
    ...approvalFields({ expert: true, rights: true }),
    seoFields,
    workflowStatusField,
    editorialNotesField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        validatePublishGate({
          data,
          originalDoc,
          req,
          requireExpertApproval: true,
          requireRightsClearance: true,
        })
        return data
      },
    ],
  },
}
