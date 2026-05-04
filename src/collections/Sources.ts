import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'
import { rightsStatusField, workflowStatusField } from './shared'

export const Sources: CollectionConfig = {
  slug: 'sources',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: () => true,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['shortCitation', 'sourceType', 'rightsStatus'],
    useAsTitle: 'shortCitation',
  },
  fields: [
    {
      name: 'sourceType',
      type: 'select',
      options: [
        { label: 'Book', value: 'book' },
        { label: 'Journal Article', value: 'journal_article' },
        { label: 'News Article', value: 'news_article' },
        { label: 'Web Article', value: 'web_article' },
        { label: 'Private Interview', value: 'private_interview' },
        { label: 'Archival Document', value: 'archival_document' },
        { label: 'Online Video', value: 'online_video' },
        { label: 'Government Record', value: 'government_record' },
        { label: 'Letter', value: 'letter' },
        { label: 'Document Scan', value: 'document_scan' },
        { label: 'Dataset', value: 'dataset' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    { name: 'title', type: 'text' },
    { name: 'shortCitation', type: 'text', required: true },
    { name: 'fullCitation', type: 'textarea', required: true },
    {
      name: 'authors',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'publication', type: 'text' },
    { name: 'publisher', type: 'text' },
    { name: 'publicationDateText', type: 'text' },
    { name: 'publicationDate', type: 'date' },
    { name: 'pages', type: 'text' },
    { name: 'url', type: 'text' },
    { name: 'archiveUrl', type: 'text' },
    { name: 'accessedDate', type: 'date' },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
        { label: 'PDF', value: 'pdf' },
        { label: 'Mixed', value: 'mixed' },
      ],
    },
    {
      name: 'interviewDetails',
      type: 'group',
      fields: [
        { name: 'interviewee', type: 'text' },
        { name: 'interviewer', type: 'text' },
        { name: 'location', type: 'text' },
        { name: 'mediaType', type: 'text' },
      ],
    },
    {
      name: 'archivalDetails',
      type: 'group',
      fields: [
        { name: 'institution', type: 'text' },
        { name: 'collectionName', type: 'text' },
        { name: 'boxOrFolder', type: 'text' },
      ],
    },
    rightsStatusField,
    { name: 'rightsNotes', type: 'textarea' },
    { name: 'reliabilityNotes', type: 'textarea' },
    { name: 'attachedFile', type: 'relationship', relationTo: 'media' },
    { name: 'relatedPeople', type: 'relationship', hasMany: true, relationTo: 'people' },
    { name: 'relatedTopics', type: 'relationship', hasMany: true, relationTo: 'topics' },
    workflowStatusField,
  ],
}
