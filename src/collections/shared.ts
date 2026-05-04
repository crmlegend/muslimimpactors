import type { Field, GeneratePreviewURL } from 'payload'

const getPublicSiteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export const previewBySlug =
  (basePath: string): GeneratePreviewURL =>
  (doc) => {
    const slug = typeof doc.slug === 'string' ? doc.slug : ''

    if (!slug) {
      return null
    }

    return `${getPublicSiteUrl()}${basePath}/${slug}`
  }

export const workflowStatusField: Field = {
  name: 'workflowStatus',
  type: 'select',
  admin: {
    description:
      'Choose where this record sits in the editorial process. Only records that are ready and approved should be published.',
  },
  defaultValue: 'draft',
  index: true,
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'In Editorial Review', value: 'in_editorial_review' },
    { label: 'Editor Approved', value: 'editor_approved' },
    { label: 'Rights Review Required', value: 'rights_review_required' },
    { label: 'Rights Cleared', value: 'rights_cleared' },
    { label: 'Ready To Publish', value: 'ready_to_publish' },
    { label: 'Published', value: 'published' },
    { label: 'Unpublished', value: 'unpublished' },
    { label: 'Archived', value: 'archived' },
  ],
  required: true,
}

export const rightsStatusField: Field = {
  name: 'rightsStatus',
  type: 'select',
  admin: {
    description:
      'Track whether the source or media rights are owned, licensed, public domain, restricted, pending, or unknown.',
  },
  defaultValue: 'unknown',
  options: [
    { label: 'Owned', value: 'owned' },
    { label: 'Licensed', value: 'licensed' },
    { label: 'Public Domain', value: 'public_domain' },
    { label: 'Permission Granted', value: 'permission_granted' },
    { label: 'Permission Pending', value: 'permission_pending' },
    { label: 'Restricted', value: 'restricted' },
    { label: 'Unknown', value: 'unknown' },
  ],
  required: true,
}

export const aiDisclosureField: Field = {
  name: 'aiDisclosure',
  type: 'select',
  admin: {
    description:
      'Use this when text, audio, video, voice, or likeness has been assisted by AI or generated synthetically.',
  },
  defaultValue: 'none',
  options: [
    { label: 'None', value: 'none' },
    { label: 'AI Assisted Internal', value: 'ai_assisted_internal' },
    { label: 'AI Generated Text', value: 'ai_generated_text' },
    { label: 'AI Generated Audio', value: 'ai_generated_audio' },
    { label: 'AI Generated Video', value: 'ai_generated_video' },
    { label: 'Synthetic Voice', value: 'synthetic_voice' },
    { label: 'Synthetic Likeness', value: 'synthetic_likeness' },
  ],
}

export const approvalFields = ({
  expert = false,
  rights = true,
}: {
  expert?: boolean
  rights?: boolean
} = {}): Field[] => [
  {
    name: 'editorApproved',
    type: 'checkbox',
    admin: {
      description:
        'Editor confirms the record is fact-checked, readable, and ready for final review.',
    },
    defaultValue: false,
  },
  {
    name: 'editorApprovedBy',
    type: 'relationship',
    relationTo: 'users',
  },
  {
    name: 'editorApprovedAt',
    type: 'date',
  },
  ...(rights
    ? [
        {
          name: 'rightsCleared',
          type: 'checkbox',
          admin: {
            description:
              'Rights reviewer confirms media, quotations, and source usage are legally cleared for publication.',
          },
          defaultValue: false,
        } satisfies Field,
        {
          name: 'rightsClearedBy',
          type: 'relationship',
          relationTo: 'users',
        } satisfies Field,
        {
          name: 'rightsClearedAt',
          type: 'date',
        } satisfies Field,
        {
          name: 'rightsNotes',
          type: 'textarea',
          admin: {
            description:
              'Summarize license terms, permission details, attribution requirements, or restrictions.',
          },
        } satisfies Field,
      ]
    : []),
  ...(expert
    ? [
        {
          name: 'expertApproved',
          type: 'checkbox',
          admin: {
            description:
              'Editor confirms the public essay matches the expert-approved submission or revision.',
          },
          defaultValue: false,
        } satisfies Field,
        {
          name: 'expertApprovedAt',
          type: 'date',
        } satisfies Field,
        {
          name: 'expertApprovedByEditor',
          type: 'relationship',
          relationTo: 'users',
        } satisfies Field,
      ]
    : []),
]

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  admin: {
    description:
      'Optional public metadata for search engines and social previews. Leave blank when unsure.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
    },
  ],
}

export const citationRelationshipField: Field = {
  name: 'sources',
  type: 'relationship',
  admin: {
    description:
      'Attach the source records that support this page. Public pages can show these below the article.',
  },
  hasMany: true,
  relationTo: 'sources',
}

export const sponsorshipField: Field = {
  name: 'sponsorship',
  type: 'group',
  admin: {
    description:
      'Connect this public record to sponsor support. Public pages can show a credit line when approved.',
  },
  fields: [
    {
      name: 'primarySponsor',
      type: 'relationship',
      relationTo: 'sponsors',
    },
    {
      name: 'additionalSponsors',
      type: 'relationship',
      hasMany: true,
      relationTo: 'sponsors',
    },
    {
      name: 'publicCreditLine',
      type: 'text',
      admin: {
        description:
          'Optional page-specific sponsor wording. Leave blank to use the sponsor default.',
      },
    },
    {
      name: 'showSponsorCredit',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export const editorialNotesField: Field = {
  name: 'editorialNotes',
  type: 'richText',
  admin: {
    description:
      'Internal notes for researchers, editors, reviewers, and publishers. These do not appear publicly.',
  },
}
