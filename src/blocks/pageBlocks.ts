import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    { name: 'kicker', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'image', type: 'relationship', relationTo: 'media' },
    { name: 'primaryLinkLabel', type: 'text' },
    { name: 'primaryLinkUrl', type: 'text' },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text',
  },
  fields: [{ name: 'body', type: 'richText', required: true }],
}

export const FeaturedPeopleBlock: Block = {
  slug: 'featuredPeople',
  labels: {
    singular: 'Featured Islamic Personalities',
    plural: 'Featured Islamic Personalities',
  },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'people',
      type: 'relationship',
      hasMany: true,
      label: 'Personalities',
      relationTo: 'people',
    },
  ],
}

export const FeaturedStoriesBlock: Block = {
  slug: 'featuredStories',
  labels: {
    singular: 'Featured Stories',
    plural: 'Featured Stories',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'stories', type: 'relationship', hasMany: true, relationTo: 'stories' },
  ],
}

export const FeaturedArticlesBlock: Block = {
  slug: 'featuredArticles',
  labels: {
    singular: 'Featured Articles',
    plural: 'Featured Articles',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'articles', type: 'relationship', hasMany: true, relationTo: 'articles' },
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline',
    plural: 'Timelines',
  },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'events',
      type: 'array',
      fields: [
        { name: 'dateLabel', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
    { name: 'source', type: 'relationship', relationTo: 'sources' },
  ],
}

export const SourceTableBlock: Block = {
  slug: 'sourceTable',
  labels: {
    singular: 'Source Table',
    plural: 'Source Tables',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'sources', type: 'relationship', hasMany: true, relationTo: 'sources' },
  ],
}

export const MediaGalleryBlock: Block = {
  slug: 'mediaGallery',
  labels: {
    singular: 'Media Gallery',
    plural: 'Media Galleries',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'media', type: 'relationship', hasMany: true, relationTo: 'media' },
  ],
}

export const RelatedContentBlock: Block = {
  slug: 'relatedContent',
  labels: {
    singular: 'Related Content',
    plural: 'Related Content',
  },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'people',
      type: 'relationship',
      hasMany: true,
      label: 'Personalities',
      relationTo: 'people',
    },
    { name: 'stories', type: 'relationship', hasMany: true, relationTo: 'stories' },
    { name: 'articles', type: 'relationship', hasMany: true, relationTo: 'articles' },
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  RichTextBlock,
  FeaturedPeopleBlock,
  FeaturedStoriesBlock,
  FeaturedArticlesBlock,
  TimelineBlock,
  QuoteBlock,
  SourceTableBlock,
  MediaGalleryBlock,
  RelatedContentBlock,
]
