import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'

export const AIJobs: CollectionConfig = {
  slug: 'ai-jobs',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: internalOnly,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['jobType', 'status', 'provider', 'model'],
    useAsTitle: 'jobType',
  },
  fields: [
    {
      name: 'jobType',
      type: 'select',
      options: [
        { label: 'Transcript', value: 'transcript' },
        { label: 'Summary', value: 'summary' },
        { label: 'Tag Suggestion', value: 'tag_suggestion' },
        { label: 'Q&A Index', value: 'qa_index' },
        { label: 'Social Post', value: 'social_post' },
        { label: 'Video Script', value: 'video_script' },
        { label: 'Avatar Video', value: 'avatar_video' },
        { label: 'Citation Check', value: 'citation_check' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    { name: 'inputCollection', type: 'text' },
    { name: 'inputDocumentId', type: 'text' },
    { name: 'promptSummary', type: 'textarea' },
    { name: 'outputDraft', type: 'textarea' },
    { name: 'provider', type: 'text' },
    { name: 'model', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'queued',
      options: [
        { label: 'Queued', value: 'queued' },
        { label: 'Running', value: 'running' },
        { label: 'Needs Review', value: 'needs_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Failed', value: 'failed' },
      ],
      required: true,
    },
    { name: 'reviewedBy', type: 'relationship', relationTo: 'users' },
    { name: 'reviewedAt', type: 'date' },
    { name: 'costEstimate', type: 'number' },
    { name: 'errorLog', type: 'textarea' },
  ],
}
