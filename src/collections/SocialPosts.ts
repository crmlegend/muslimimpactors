import type { CollectionConfig } from 'payload'

import { internalOnly, isPublisherRole, isSocialRole } from '@/access/roles'

export const SocialPosts: CollectionConfig = {
  slug: 'social-posts',
  access: {
    create: ({ req: { user } }) => isSocialRole(user),
    delete: ({ req: { user } }) => isPublisherRole(user),
    read: internalOnly,
    update: ({ req: { user } }) => isSocialRole(user),
  },
  admin: {
    defaultColumns: ['title', 'sourcePerson', 'approvalStatus', 'scheduledFor', 'publishedAt'],
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
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
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
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        const previousStatus = originalDoc?.approvalStatus
        const nextStatus = data.approvalStatus ?? previousStatus
        const requiresPublisherApproval = ['approved', 'scheduled', 'published'].includes(nextStatus)

        if (
          requiresPublisherApproval &&
          nextStatus !== previousStatus &&
          !isPublisherRole(req.user)
        ) {
          throw new Error('Publisher / Admin approval is required to approve or publish social posts.')
        }

        if (nextStatus === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
          return { ...data, publishedAt: new Date().toISOString() }
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (
          doc.approvalStatus !== 'published' ||
          previousDoc?.approvalStatus === 'published' ||
          previousDoc?.publishedAt
        ) {
          return doc
        }

        const sourcePersonId =
          typeof doc.sourcePerson === 'object' ? doc.sourcePerson?.id : doc.sourcePerson

        if (!sourcePersonId) {
          return doc
        }

        try {
          const person = await req.payload.findByID({
            id: sourcePersonId,
            collection: 'people',
            depth: 0,
            overrideAccess: true,
          })

          await req.payload.update({
            id: sourcePersonId,
            collection: 'people',
            data: {
              socialLastPublishedAt: doc.publishedAt,
              socialPublishedCount: Number(person.socialPublishedCount || 0) + 1,
            },
            overrideAccess: true,
          })
        } catch (error) {
          req.payload.logger.error({
            err: error,
            message: `Unable to update social promotion counters for person ${sourcePersonId}`,
          })
        }

        return doc
      },
    ],
  },
}
