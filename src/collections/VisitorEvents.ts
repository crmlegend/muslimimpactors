import type { CollectionConfig } from 'payload'

import { isPublisher, isSuperAdmin } from '@/access/roles'

export const VisitorEvents: CollectionConfig = {
  slug: 'visitor-events',
  labels: {
    singular: 'Visitor Event',
    plural: 'Visitor Events',
  },
  access: {
    create: () => false,
    delete: isSuperAdmin,
    read: isPublisher,
    update: () => false,
  },
  admin: {
    defaultColumns: ['occurredAt', 'eventType', 'path', 'targetType', 'targetSlug'],
    description:
      'Public website visit and task events captured for review. Publisher / Admin and Super Admin users can view these records.',
    useAsTitle: 'path',
  },
  fields: [
    {
      name: 'eventType',
      type: 'select',
      defaultValue: 'page_view',
      options: [
        { label: 'Page view', value: 'page_view' },
        { label: 'Search', value: 'search' },
        { label: 'Sponsor click', value: 'sponsor_click' },
        { label: 'Profile open', value: 'profile_open' },
        { label: 'Video open', value: 'video_open' },
        { label: 'Signup start', value: 'signup_start' },
        { label: 'Donate click', value: 'donate_click' },
        { label: 'Other task', value: 'other_task' },
      ],
      required: true,
    },
    { name: 'path', type: 'text', required: true },
    { name: 'targetType', type: 'text' },
    { name: 'targetSlug', type: 'text' },
    { name: 'visitorId', type: 'text' },
    { name: 'ipAddress', type: 'text' },
    { name: 'referrer', type: 'text' },
    { name: 'userAgent', type: 'textarea' },
    { name: 'metadata', type: 'textarea' },
    {
      name: 'occurredAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      required: true,
    },
  ],
}
