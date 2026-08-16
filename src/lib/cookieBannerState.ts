/**
 * État de visibilité de `CookieBanner`, exposé pour que d'autres widgets flottants
 * (ex. `ChatWidget`) puissent se décaler tant que le bandeau est affiché, sans
 * dupliquer la logique `localStorage` ni introduire un contexte React global.
 */

const STORAGE_KEY = 'origin-studio-cookie-notice-dismissed'
const DISMISS_EVENT = 'origin-studio:cookie-banner-dismissed'

export function isCookieBannerDismissed(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return true
  }
}

export function dismissCookieBanner(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* localStorage indisponible (mode privé, quota) — pas bloquant */
  }
  window.dispatchEvent(new Event(DISMISS_EVENT))
}

/** S'abonne à la fermeture du bandeau ; retourne la fonction de désabonnement. */
export function onCookieBannerDismissed(callback: () => void): () => void {
  window.addEventListener(DISMISS_EVENT, callback)
  return () => window.removeEventListener(DISMISS_EVENT, callback)
}
