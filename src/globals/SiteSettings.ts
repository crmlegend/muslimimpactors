import type { GlobalConfig } from 'payload'

import { isPublisher } from '@/access/roles'

const colorField = (name: string, label: string, defaultValue: string) => ({
  name,
  type: 'text' as const,
  defaultValue,
  label,
  admin: {
    description: 'Use a hex color value. Example: #0D76BC.',
  },
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isPublisher,
  },
  admin: {
    description:
      'Controls reviewer-facing homepage selections, sponsor placements, and global brand colors.',
  },
  fields: [
    {
      name: 'homepage',
      type: 'group',
      fields: [
        {
          name: 'dailyFeaturedPersonality',
          type: 'relationship',
          relationTo: 'people',
          admin: {
            description:
              'Default personality shown in the homepage focus area when no scheduled override is active.',
          },
        },
        {
          name: 'manualFeaturedPersonality',
          type: 'relationship',
          relationTo: 'people',
          admin: {
            description:
              'Optional manually scheduled homepage feature. Takes priority while the date window is active.',
          },
        },
        {
          name: 'manualFeaturedStartsAt',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            description: 'Start time for the manual homepage feature.',
          },
        },
        {
          name: 'manualFeaturedEndsAt',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            description: 'End time for the manual homepage feature.',
          },
        },
        {
          name: 'editorsChoice',
          type: 'relationship',
          hasMany: true,
          relationTo: 'people',
          admin: {
            description: 'Profiles displayed in the Editor’s Choice section.',
          },
        },
        {
          name: 'recommendedStories',
          type: 'relationship',
          hasMany: true,
          relationTo: 'stories',
          admin: {
            description: 'Story/video records displayed in the Recommended Videos section.',
          },
        },
        {
          name: 'sponsorAdSlots',
          type: 'array',
          admin: {
            description:
              'Homepage sponsor ad stack. Lower order values appear first. Leave empty to use the seeded default sponsor order.',
          },
          fields: [
            {
              name: 'sponsor',
              type: 'relationship',
              relationTo: 'sponsors',
              required: true,
            },
            {
              name: 'placementLabel',
              type: 'text',
              defaultValue: 'Homepage sponsor',
            },
            {
              name: 'placementOrder',
              type: 'number',
              defaultValue: 10,
            },
            {
              name: 'active',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'branding',
      type: 'group',
      fields: [
        colorField('primaryColor', 'Primary color', '#0D76BC'),
        colorField('secondaryColor', 'Secondary color', '#F2673C'),
        colorField('tertiaryColor', 'Tertiary color', '#DF5A32'),
        colorField('lightAccentColor', 'Light text/background accent', '#E1DFDE'),
        colorField('neutralColor', 'Neutral color', '#FFFFFF'),
      ],
    },
  ],
}
