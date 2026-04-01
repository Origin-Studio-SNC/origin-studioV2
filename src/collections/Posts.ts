import { formatSlug } from '@/lib/utils'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
  },

  access: {
    read: () => true,
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: "Titre de l'article",
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: "URL de l'article",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const title = typeof data?.title === 'string' ? data.title : undefined
            if (!value && title) {
              return formatSlug(title)
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 200,
      admin: {
        description: "Résumé de l'article (max 200 caractères)",
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Stratégie digitale', value: 'strategie' },
        { label: 'Technique', value: 'technique' },
        { label: 'Cas clients', value: 'cas-clients' },
        { label: 'Hébergement Suisse', value: 'hebergement' },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: "Image de couverture de l'article",
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date de publication',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: "Contenu de l'article",
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: "Tags pour catégoriser l'article (Next.js, Payload, SEO, etc.)",
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Temps de lecture estimé (en minutes)',
        placeholder: '5',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.content) {
              const wordCount = JSON.stringify(data.content)
                .split(' ').length
              data.readingTime = Math.ceil(wordCount / 200)
            }
            return data
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }: any) => user?.id,
      admin: {
        position: 'sidebar',
        description: "Auteur de l'article",
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      maxLength: 160,
      admin: {
        description: 'Description pour les moteurs de recherche (max 160 caractères)',
      },
    },
    {
      name: 'metaImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image pour le partage social (OpenGraph)',
      },
    },
  ],
}
