import type { CollectionConfig } from 'payload'

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

export const People: CollectionConfig = {
  slug: 'people',
  labels: {
    singular: 'Public Personality',
    plural: 'Public Personalities',
  },
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: publicPublishedOrInternal,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['name', 'personType', 'workflowStatus'],
    description:
      'Create public personality dossiers for American Muslims, historical Muslim figures, contributors, and reviewers. Use the Preview button before publishing.',
    preview: previewBySlug('/personalities'),
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Primary public name shown in headings, cards, search, and lists.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier, for example ibn-khaldun.' },
    },
    {
      name: 'displayTitle',
      type: 'text',
      admin: {
        description: 'Optional longer display title or honorific line for the public page.',
      },
    },
    {
      name: 'personType',
      type: 'select',
      defaultValue: 'scholar',
      options: [
        { label: 'Scholar', value: 'scholar' },
        { label: 'Jurist', value: 'jurist' },
        { label: 'Hadith Scholar', value: 'hadith_scholar' },
        { label: 'Historian', value: 'historian' },
        { label: 'Scientist or Physician', value: 'scientist_physician' },
        { label: 'Poet or Litterateur', value: 'poet_litterateur' },
        { label: 'Ruler or Statesperson', value: 'ruler_statesperson' },
        { label: 'Institution Builder', value: 'institution_builder' },
        { label: 'Companion or Early Community Figure', value: 'early_community_figure' },
        { label: 'Expert Contributor', value: 'expert_contributor' },
        { label: 'Interviewer', value: 'interviewer' },
        { label: 'Narrator', value: 'narrator' },
        { label: 'Author', value: 'author' },
        { label: 'Institutional Contact', value: 'institutional_contact' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: { description: 'Choose the main role used for filtering and editorial routing.' },
    },
    {
      name: 'aliases',
      type: 'array',
      fields: [{ name: 'alias', type: 'text', required: true }],
    },
    {
      name: 'honorificName',
      type: 'text',
      admin: { description: 'Optional honorific or traditional name form, if appropriate.' },
    },
    {
      name: 'eraLabel',
      type: 'text',
      admin: { description: 'Human-readable era, such as 732-808 AH / 1332-1406 CE.' },
    },
    {
      name: 'scholarlyTradition',
      type: 'text',
      admin: { description: 'School, discipline, intellectual tradition, or movement.' },
    },
    {
      name: 'primaryWorks',
      type: 'textarea',
      admin: {
        description: 'Major works, institutions, inventions, poems, books, or legacy items.',
      },
    },
    {
      name: 'birthDateText',
      type: 'text',
      admin: { description: 'Display date when exact birth date is uncertain.' },
    },
    { name: 'birthDate', type: 'date', admin: { description: 'Exact date if known.' } },
    {
      name: 'deathDateText',
      type: 'text',
      admin: { description: 'Display date when exact death date is uncertain.' },
    },
    { name: 'deathDate', type: 'date', admin: { description: 'Exact date if known.' } },
    { name: 'birthPlace', type: 'text', admin: { description: 'Birthplace as public text.' } },
    {
      name: 'nationality',
      type: 'text',
      admin: {
        description: 'Region, polity, or identity label. Use carefully for pre-modern figures.',
      },
    },
    { name: 'occupations', type: 'relationship', hasMany: true, relationTo: 'occupations' },
    {
      name: 'shortBio',
      type: 'textarea',
      required: true,
      admin: {
        description: 'One-paragraph public summary used in cards, search, and page intros.',
      },
    },
    {
      name: 'fullBio',
      type: 'richText',
      admin: { description: 'Long-form biography for the public dossier.' },
    },
    {
      name: 'portrait',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Approved portrait, manuscript image, artwork, or neutral visual slot.',
      },
    },
    {
      name: 'portraitCreditOverride',
      type: 'text',
      admin: { description: 'Optional public credit line if different from the media record.' },
    },
    {
      name: 'youtubeEmbedId',
      type: 'text',
      admin: {
        description:
          'Optional YouTube embed ID for the featured public video. Example: E-RLbRbRjS8.',
      },
    },
    {
      name: 'externalVideoUrl',
      type: 'text',
      admin: {
        description:
          'Optional approved external video URL shown on the public personality page preview.',
      },
    },
    {
      name: 'externalVideoSource',
      type: 'text',
      admin: { description: 'Credit/source name for the external video, such as a museum channel.' },
    },
    {
      name: 'externalVideoNote',
      type: 'textarea',
      admin: {
        description:
          'Editorial note explaining why this video is used, rights status, or replacement guidance.',
      },
    },
    { name: 'relatedTopics', type: 'relationship', hasMany: true, relationTo: 'topics' },
    {
      name: 'tags',
      type: 'relationship',
      hasMany: true,
      relationTo: 'tags',
      admin: {
        description:
          'Indexing labels used by editors for discovery, review queues, source confidence, and public grouping.',
      },
    },
    { name: 'relatedPeople', type: 'relationship', hasMany: true, relationTo: 'people' },
    { name: 'relatedPlaces', type: 'relationship', hasMany: true, relationTo: 'places' },
    {
      name: 'timelineEvents',
      type: 'array',
      fields: [
        { name: 'dateLabel', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'sources', type: 'relationship', hasMany: true, relationTo: 'sources' },
      ],
    },
  citationRelationshipField,
  sponsorshipField,
  ...approvalFields({ rights: true }),
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
