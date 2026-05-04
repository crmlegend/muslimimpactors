import type { CollectionConfig } from 'payload'

import { internalOnly } from '@/access/roles'

export const ContributorApplications: CollectionConfig = {
  slug: 'contributor-applications',
  access: {
    create: () => true,
    delete: internalOnly,
    read: internalOnly,
    update: internalOnly,
  },
  admin: {
    defaultColumns: ['name', 'email', 'requestedRole', 'status'],
    description:
      'Public signup and article-interest submissions. Review these before granting contributor permissions.',
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'requestedRole',
      type: 'select',
      defaultValue: 'author',
      options: [
        { label: 'Author', value: 'author' },
        { label: 'Editor', value: 'editor' },
        { label: 'Subscriber', value: 'subscriber' },
      ],
      required: true,
    },
    {
      name: 'biography',
      type: 'textarea',
      admin: {
        description:
          'Required for authors. This can become the public contributor biography after approval.',
      },
    },
    {
      name: 'expertise',
      type: 'textarea',
      admin: {
        description: 'Subject expertise, lived experience, research background, or writing focus.',
      },
    },
    { name: 'affiliation', type: 'text' },
    { name: 'websiteOrSocial', type: 'text' },
    { name: 'proposedTopic', type: 'text' },
    {
      name: 'articleSummary',
      type: 'textarea',
      admin: {
        description:
          'Short summary of the article, personality, story, source lead, or research contribution.',
      },
    },
    {
      name: 'sourceOwnership',
      type: 'select',
      defaultValue: 'original',
      options: [
        { label: 'Original writing', value: 'original' },
        { label: 'Licensed material', value: 'licensed' },
        { label: 'Public domain material', value: 'public_domain' },
        { label: 'Permission granted', value: 'permission_granted' },
        { label: 'Unsure / needs review', value: 'needs_review' },
      ],
    },
    {
      name: 'createdUser',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Subscriber account created or linked by the public signup workflow.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Needs Follow-up', value: 'needs_follow_up' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Converted To Draft', value: 'converted_to_draft' },
      ],
      required: true,
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Internal review notes for editors and admins.',
      },
    },
  ],
}
