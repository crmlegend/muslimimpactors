import type { CollectionConfig } from 'payload'

import { internalOnly, publicPublishedOrInternal, validatePublishGate } from '@/access/roles'
import {
  aiDisclosureField,
  approvalFields,
  citationRelationshipField,
  editorialNotesField,
  previewBySlug,
  rightsStatusField,
  seoFields,
  sponsorshipField,
  workflowStatusField,
} from './shared'

export const Stories: CollectionConfig = {
  slug: 'stories',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['title', 'format', 'primaryPerson', 'workflowStatus'],
    description:
      'Build video, audio, text, document, or expert-commentary story chapters. Preview the public story page before publishing.',
    preview: previewBySlug('/stories'),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Public story title shown in listings and the story page.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier, for example writing-history-as-a-science.' },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Optional supporting line under the story title.' },
    },
    {
      name: 'format',
      type: 'select',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Audio', value: 'audio' },
        { label: 'Text', value: 'text' },
        { label: 'Image / Document', value: 'image_document' },
        { label: 'Expert Commentary', value: 'expert_commentary' },
        { label: 'AI Generated Video', value: 'ai_generated_video' },
      ],
      required: true,
      admin: { description: 'Choose the main media or editorial format for this story.' },
    },
    {
      name: 'primaryPerson',
      type: 'relationship',
      relationTo: 'people',
      admin: { description: 'Main personality connected to this story chapter.' },
    },
    { name: 'relatedPeople', type: 'relationship', hasMany: true, relationTo: 'people' },
    { name: 'relatedArticles', type: 'relationship', hasMany: true, relationTo: 'articles' },
    { name: 'storyOrder', type: 'number' },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'Short public description for cards, search, and story intros.' },
    },
    { name: 'body', type: 'richText', admin: { description: 'Editorial notes or article text.' } },
    {
      name: 'videoAsset',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Approved video file or external-video media record.' },
    },
    {
      name: 'youtubeEmbedId',
      type: 'text',
      admin: {
        description:
          'Optional YouTube embed ID for local testing or approved external embeds. Example: 9RBo-E09zFw.',
      },
    },
    {
      name: 'externalVideoUrl',
      type: 'text',
      admin: {
        description:
          'Optional approved external video URL for this story chapter when the file is not hosted internally.',
      },
    },
    {
      name: 'externalVideoSource',
      type: 'text',
      admin: { description: 'Credit/source name for the external video.' },
    },
    {
      name: 'externalVideoNote',
      type: 'textarea',
      admin: {
        description:
          'Rights, replacement, or editorial notes for this embedded video. Public pages should show only approved language.',
      },
    },
    {
      name: 'audioAsset',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Approved audio file for an audio-led story.' },
    },
    {
      name: 'documentAssets',
      type: 'relationship',
      hasMany: true,
      relationTo: 'media',
      admin: {
        description: 'Letters, PDFs, scans, or supporting documents shown with this story.',
      },
    },
    {
      name: 'thumbnail',
      type: 'relationship',
      relationTo: 'media',
      admin: { description: 'Public thumbnail image for story cards.' },
    },
    {
      name: 'durationSeconds',
      type: 'number',
      admin: { description: 'Duration in seconds, used to show a readable time label.' },
    },
    {
      name: 'transcript',
      type: 'richText',
      admin: { description: 'Full transcript or edited transcript for the public story page.' },
    },
    {
      name: 'transcriptSegments',
      type: 'array',
      fields: [
        { name: 'startSeconds', type: 'number' },
        { name: 'endSeconds', type: 'number' },
        { name: 'speaker', type: 'text' },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    { name: 'themes', type: 'relationship', hasMany: true, relationTo: 'topics', required: true },
    { name: 'tags', type: 'relationship', hasMany: true, relationTo: 'tags' },
    { name: 'placesMentioned', type: 'relationship', hasMany: true, relationTo: 'places' },
    citationRelationshipField,
    sponsorshipField,
    { name: 'credits', type: 'richText' },
    aiDisclosureField,
    {
      name: 'publicAiLabel',
      type: 'text',
      admin: {
        description: 'Required for synthetic or AI-generated public stories.',
      },
    },
    rightsStatusField,
    ...approvalFields({ rights: true }),
    {
      name: 'metrics',
      type: 'group',
      fields: [
        { name: 'viewCount', type: 'number', defaultValue: 0 },
        { name: 'shareCount', type: 'number', defaultValue: 0 },
      ],
    },
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
