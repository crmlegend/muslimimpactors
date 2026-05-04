import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'
import { aiDisclosureField, rightsStatusField, workflowStatusField } from './shared'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: internalOnly,
    delete: internalOnly,
    read: ({ req: { user } }) => {
      if (user) return true

      return {
        publicDeliveryAllowed: {
          equals: true,
        },
        workflowStatus: {
          equals: 'published',
        },
      }
    },
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['title', 'mediaKind', 'rightsStatus', 'publicDeliveryAllowed'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'mediaKind',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Document', value: 'document' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Word Document', value: 'word_document' },
        { label: 'Generated Derivative', value: 'generated_derivative' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'altText',
      type: 'text',
      admin: {
        description: 'Required for public images before publish.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'creditLine',
      type: 'text',
    },
    rightsStatusField,
    {
      name: 'licenseName',
      type: 'text',
    },
    {
      name: 'licenseUrl',
      type: 'text',
    },
    {
      name: 'sourceUrl',
      type: 'text',
    },
    {
      name: 'expiryDate',
      type: 'date',
    },
    {
      name: 'usageRestrictions',
      type: 'textarea',
    },
    {
      name: 'publicDeliveryAllowed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'requiresWatermark',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Set automatically later for public images wider than 800px.',
      },
    },
    {
      name: 'watermarkApplied',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'watermarkedFileNote',
      type: 'text',
      admin: {
        description: 'Placeholder for generated derivative key/path until storage is connected.',
      },
    },
    aiDisclosureField,
    workflowStatusField,
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'public',
        width: 1600,
        withoutEnlargement: true,
      },
    ],
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'audio/mpeg',
      'audio/mp4',
      'video/mp4',
      'video/quicktime',
    ],
  },
}
