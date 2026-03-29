import { formatSlug } from '@/lib/utils'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'featured', '_status'],
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
        description: 'Nom du projet',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Site vitrine', value: 'vitrine' },
        { label: 'Application', value: 'application' },
        { label: 'Refonte', value: 'refonte' },
        { label: 'E-commerce', value: 'ecommerce' },
      ],
    },
    {
      name: 'confidential',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL du projet',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return formatSlug(data.title)
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
        description: 'Description courte (max 200 caractères)',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Afficher dans le bento grid homepage',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Image principale du projet',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Année de réalisation',
      },
    },
    {
      name: 'client',
      type: 'text',
      localized: true,
      admin: {
        description: 'Nom du client',
      },
    },
    {
      name: 'stack',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'tech',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Technologies utilisées (Next.js, NestJS, etc.)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Contenu détaillé du case study',
      },
    },
    
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Détails',
          fields: [
            {
              name: 'challenge',
              type: 'richText',
              localized: true,
              admin: {
                description: 'Le problème à résoudre',
              },
            },
            {
              name: 'solution',
              type: 'richText',
              localized: true,
              admin: {
                description: 'La solution apportée',
              },
            },
            {
              name: 'results',
              type: 'richText',
              localized: true,
              admin: {
                description: 'Les résultats obtenus',
              },
            },
          ],
        },
        {
          label: 'Galerie',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Liens',
          fields: [
            {
              name: 'liveUrl',
              type: 'text',
              admin: {
                description: 'URL du projet en production',
                placeholder: 'https://...',
              },
            },
            {
              name: 'githubUrl',
              type: 'text',
              admin: {
                description: 'Lien GitHub (si open-source)',
                placeholder: 'https://github.com/...',
              },
            },
          ],
        },
      ],
    },
  ],
}