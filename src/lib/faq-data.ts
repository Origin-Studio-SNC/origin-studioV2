/**
 * FAQ affichée sur /services (`ServicesFaq.tsx`) et injectée dans le system
 * prompt du fallback LLM du chatbot (`chatSystemPrompt.ts`) — source unique
 * pour que l'assistant ne réponde jamais autre chose que ce qui est publié.
 */
export const FAQ = [
  {
    q: 'Quels sont vos délais de réalisation en moyenne ?',
    a: "Selon la complexité : quelques semaines pour un site institutionnel cadré, plusieurs mois pour une plateforme ou un SaaS. Nous fixons un planning réaliste dès l'exploration.",
  },
  {
    q: 'Travaillez-vous avec des technologies open source ?',
    a: 'Oui, massivement : Next.js, PostgreSQL, outils standards de l’écosystème moderne. Pas de cage propriétaire : vous restez libre de faire évoluer votre stack.',
  },
  {
    q: 'Proposez-vous un hébergement managé ?',
    a: 'Nous pouvons prendre en charge le déploiement et l’hébergement (souvent sur infrastructure européenne / suisse selon besoin), ou vous laisser la main sur votre propre cloud.',
  },
  {
    q: 'Pouvez-vous reprendre un projet existant ?',
    a: "Oui : audit technique, dette, refonte progressive ou rescue. Nous commençons par une phase d'exploration pour mesurer l'existant avant d'engager.",
  },
  {
    q: 'Comment se déroule la facturation ?',
    a: 'Généralement acompte au lancement, jalons ou sprint pour le développement, solde à la livraison — adapté au type de mission. Détail dans le devis.',
  },
] as const
