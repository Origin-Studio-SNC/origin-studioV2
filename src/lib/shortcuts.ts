import { useSyncExternalStore } from 'react'

/**
 * Préférence « raccourcis clavier A à G » (WCAG 2.1.4 : un raccourci à une seule touche doit
 * pouvoir être désactivé). Activés par défaut ; seule la valeur « off » est stockée.
 * Repli en mémoire si le stockage du navigateur est bloqué. À importer depuis des composants client.
 */

const KEY = 'os-shortcuts'
const EVENT = 'os-shortcuts-change'

let cached: boolean | null = null

function read(): boolean {
  if (cached === null) {
    try {
      cached = window.localStorage.getItem(KEY) !== 'off'
    } catch {
      cached = true
    }
  }
  return cached
}

export function shortcutsEnabled(): boolean {
  return read()
}

export function setShortcutsEnabled(on: boolean) {
  cached = on
  try {
    if (on) window.localStorage.removeItem(KEY)
    else window.localStorage.setItem(KEY, 'off')
  } catch {
    // Stockage indisponible : la préférence vaut pour cette page seulement.
  }
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(onChange: () => void) {
  const onStorage = () => {
    cached = null // un autre onglet a pu changer la valeur
    onChange()
  }
  window.addEventListener(EVENT, onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener('storage', onStorage)
  }
}

/** `true` côté serveur : le premier rendu est identique partout, puis se met à jour. */
export function useShortcutsEnabled() {
  return useSyncExternalStore(subscribe, read, () => true)
}
