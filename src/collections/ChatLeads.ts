import type { CollectionConfig } from 'payload'

/**
 * Trace des leads capturés via le parcours guidé du chatbot (`/api/chat/lead`).
 * Écriture réservée à cette route (voir `overrideAccess: true` côté route handler) —
 * pas de création publique via REST/GraphQL. Complément de l'email, jamais son remplaçant.
 */
export const ChatLeads: CollectionConfig = {
  slug: 'chat-leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'offerTitle', 'tierName', 'delay', 'createdAt'],
    description:
      "Leads capturés via le chatbot du site (parcours guidé). Écriture réservée à l'API interne — ne pas créer d'entrée manuellement ici.",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'projectType',
      type: 'text',
      required: true,
      admin: { description: 'Aligné sur contactSchema.projectType' },
    },
    {
      name: 'offerTitle',
      type: 'text',
      required: true,
      admin: { description: 'Offre choisie (SERVICE_OFFERS)' },
    },
    {
      name: 'tierName',
      type: 'text',
      required: true,
      admin: { description: 'Palier choisi au sein de l’offre' },
    },
    {
      name: 'budget',
      type: 'text',
      required: true,
      admin: { description: 'Bande budgétaire dérivée du palier, alignée sur contactSchema.budget' },
    },
    {
      name: 'delay',
      type: 'text',
      required: true,
      admin: { description: 'Délai souhaité, exprimé par le visiteur' },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: { description: 'Résumé de la demande, généré à partir du parcours' },
    },
  ],
}
