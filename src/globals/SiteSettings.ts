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
    group: 'Site Controls',
    description:
      'Edit homepage featured records, hero rail wording, sponsor placements, and global brand colors.',
  },
  label: 'Homepage & Branding',
  fields: [
    {
      name: 'homepageCopy',
      type: 'group',
      admin: {
        description:
          'Editable public homepage wording for the left history rail and right sponsor rail.',
      },
      fields: [
        {
          name: 'leftRailEyebrow',
          type: 'text',
          defaultValue: 'From The Golden Age',
          label: 'Left rail eyebrow',
          admin: {
            description: 'Small label above the left column heading.',
          },
        },
        {
          name: 'leftRailHeading',
          type: 'text',
          defaultValue: 'Muslims in History',
          label: 'Left rail heading',
          admin: {
            description: 'Main heading for the left column.',
          },
        },
        {
          name: 'leftRailBody',
          type: 'textarea',
          defaultValue:
            'A focused rail for scholars, institution builders, physicians, jurists, scientists, and artists who shaped the intellectual foundations behind the archive.',
          label: 'Left rail body',
        },
        {
          name: 'leftRailButtonLabel',
          type: 'text',
          defaultValue: 'Open Golden Age Index',
          label: 'Left rail button label',
        },
        {
          name: 'rightRailEyebrow',
          type: 'text',
          defaultValue: 'Our Sponsors',
          label: 'Right rail eyebrow',
          admin: {
            description: 'Small label above the sponsor column heading.',
          },
        },
        {
          name: 'rightRailHeading',
          type: 'text',
          defaultValue: 'Project Sponsors',
          label: 'Right rail heading',
        },
      ],
    },
    {
      name: 'homepage',
      type: 'group',
      admin: {
        description:
          'Controls the daily/manual featured personality, editor selections, recommended videos, and sponsor ad ordering.',
      },
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
      admin: {
        description:
          'Reviewer-approved default colors. Super admins/admins can update these values without code changes.',
      },
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
