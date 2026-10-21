'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/**
 * Point d'entrée de la scène 3D pour la page d'accueil : three n'est chargé
 * que côté client, après l'hydratation, et ne pèse pas sur le rendu serveur.
 */
const AssemblyScene = dynamic(() => import('./AssemblyScene').then((m) => m.AssemblyScene), {
  ssr: false,
})

/**
 * La scène ne démarre qu'une fois la page chargée et le navigateur au repos :
 * le texte (élément LCP) s'affiche sans attendre three ni la construction des
 * structures. Le fond papier est identique avant et après, donc rien ne saute.
 */
export function HomeScene() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idle = 0
    let timer = 0
    const start = () => {
      // Safari n'a pas requestIdleCallback : court délai à la place.
      if (typeof window.requestIdleCallback === 'function')
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      else timer = window.setTimeout(() => setReady(true), 200)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (idle) window.cancelIdleCallback(idle)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  return ready ? <AssemblyScene /> : null
}
