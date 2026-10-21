'use client'

import dynamic from 'next/dynamic'

/**
 * Point d'entrée de la scène 3D pour la page d'accueil : three n'est chargé
 * que côté client, après l'hydratation, et ne pèse pas sur le rendu serveur.
 */
export const HomeScene = dynamic(() => import('./AssemblyScene').then((m) => m.AssemblyScene), {
  ssr: false,
})
