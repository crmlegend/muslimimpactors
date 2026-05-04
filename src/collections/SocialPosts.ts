import type { CollectionConfig } from 'payload'

import { internalOnly, isPublisherRole, isEditorialRole } from '@/access/roles'

export const SocialPosts: CollectionConfig = {
  slug: 'social-posts',
  access: {
    create: ({ req: { user } }) => isEditorialRole(user),
    delete: ({ req: { user } }) => isPublisherRole(user),
    read: internalOnly,
    update: ({ req: { user } }) => isEditorialRole(user) || isPublisherRole(user),
  },
  admin: {
    defaultColumns: ['title', 'approvalStatus', 'scheduledFor'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'sourceContentType',
      type: 'select',
      defaultValue: 'custom',
      options: [
        { label: 'Story', value: 'story' },
        { label: 'Article', value: 'article' },
        { label: 'Personality', value: 'person' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    { name: 'sourceStory', type: 'relationship', relationTo: 'stories' },
    { name: 'sourceArticle', type: 'relationship', relationTo: 'articles' },
    { name: 'sourcePerson', type: 'relationship', relationTo: 'people' },
    {
      name: 'platformVariants',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X', value: 'x' },
          ],
          required: true,
        },
        { name: 'postText', type: 'textarea', required: true },
        { name: 'media', type: 'relationship', hasMany: true, relationTo: 'media' },
        { name: 'link', type: 'text' },
        { name: 'hashtags', type: 'text' },
      ],
    },
    { name: 'targetAccounts', type: 'relationship', hasMany: true, relationTo: 'social-accounts' },
    {
      name: 'approvalStatus',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
        { label: 'Failed', value: 'failed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
    },
    { name: 'scheduledFor', type: 'date' },
    { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date' },
    { name: 'remotePostIds', type: 'json' },
    { name: 'errorLog', type: 'textarea' },
    { name: 'analyticsSnapshot', type: 'json' },
  ],
}
