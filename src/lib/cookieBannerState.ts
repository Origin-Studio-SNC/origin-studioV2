/**
 * État de fermeture de `CookieBanner`, persisté dans `localStorage`.
 * Les widgets flottants (ex. `ChatWidget`) n'en dépendent pas : ils se décalent via la
 * variable CSS `--cookie-banner-h` que le bandeau expose tant qu'il est affiché.
 */

const STORAGE_KEY = 'origin-studio-cookie-notice-dismissed'

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
}
