import type { CollectionConfig } from 'payload'

import { internalOnly, isPublisher, isPublisherRole } from '@/access/roles'

export const SocialAccounts: CollectionConfig = {
  slug: 'social-accounts',
  access: {
    create: isPublisher,
    delete: isPublisher,
    read: internalOnly,
    update: ({ req: { user } }) => isPublisherRole(user),
  },
  admin: {
    defaultColumns: ['displayName', 'platform', 'active'],
    useAsTitle: 'displayName',
  },
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
    { name: 'displayName', type: 'text', required: true },
    {
      name: 'connectedEntityType',
      type: 'select',
      options: [
        { label: 'Company Page', value: 'company_page' },
        { label: 'Organization', value: 'organization' },
        { label: 'Individual Account', value: 'individual_account' },
      ],
      required: true,
    },
    { name: 'externalAccountId', type: 'text' },
    {
      name: 'tokenReference',
      type: 'text',
      admin: {
        description:
          'Reference name for the encrypted OAuth token or external secret connected to this account.',
      },
    },
    { name: 'tokenExpiresAt', type: 'date' },
    { name: 'connectedBy', type: 'relationship', relationTo: 'users' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'notes', type: 'textarea' },
  ],
}
