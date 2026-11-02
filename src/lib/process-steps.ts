/**
 * Les quatre étapes d'un projet. Source unique pour la section « Méthode » de l'accueil
 * et la section de /services : mêmes noms, mêmes textes, pour ne jamais se contredire.
 * « Exploration » reprend le mot de la FAQ (`faq-data.ts`).
 */
export const PROCESS_STEPS = [
  {
    title: 'Exploration',
    text: 'Un échange pour comprendre vos objectifs, vos contraintes et votre budget, puis un cadrage du périmètre avant de chiffrer.',
  },
  {
    title: 'Conception',
    text: 'Architecture technique, parcours et maquettes, validés avec vous avant d’écrire le code.',
  },
  {
    title: 'Développement',
    text: 'Le projet avance par jalons, avec des points réguliers pour ajuster et des revues de code.',
  },
  {
    title: 'Mise en ligne',
    text: 'Lancement, puis de 1 à 6 mois de support inclus selon l’offre. Nous restons là après le jour J.',
  },
] as const
