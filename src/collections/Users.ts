import type { CollectionConfig } from 'payload'

import { isPublisher, isPublisherRole, roleOptions } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: isPublisher,
    delete: isPublisher,
    read: ({ req: { user } }) => {
      if (!user) {
        return false
      }

      if (isPublisherRole(user)) {
        return true
      }

      return {
        id: {
          equals: user.id,
        },
      }
    },
    update: ({ req: { user }, id }) => isPublisherRole(user) || user?.id === id,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'active'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'subscriber',
      options: [...roleOptions],
      required: true,
    },
    {
      name: 'requestedPublicRole',
      type: 'select',
      admin: {
        description:
          'Role requested through public signup. Admins can review this before changing the actual CMS role.',
      },
      options: [
        { label: 'Author', value: 'author' },
        { label: 'Editor', value: 'editor' },
        { label: 'Subscriber', value: 'subscriber' },
      ],
    },
    {
      name: 'publicContributorProfile',
      type: 'group',
      admin: {
        description:
          'Public-facing contributor profile. Show only after editorial approval.',
      },
      fields: [
        {
          name: 'approvedContributor',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'publicProfileEnabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'biography',
          type: 'textarea',
          admin: {
            description:
              'Contributor biography shown publicly after approval. Authors should provide this during signup.',
          },
        },
        {
          name: 'expertise',
          type: 'textarea',
          admin: {
            description: 'Subject expertise, writing focus, or community background.',
          },
        },
        {
          name: 'affiliation',
          type: 'text',
        },
        {
          name: 'websiteOrSocial',
          type: 'text',
        },
      ],
    },
    {
      name: 'assignedTopics',
      type: 'relationship',
      hasMany: true,
      relationTo: 'topics',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description:
          'Internal-only notes about this team member and their editorial responsibilities.',
      },
    },
  ],
}
