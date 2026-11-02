'use client'

import { setShortcutsEnabled, useShortcutsEnabled } from '@/lib/shortcuts'

/**
 * Indication et interrupteur des raccourcis clavier A à G, dans les pieds de page.
 * Sert aussi de mécanisme de désactivation exigé par WCAG 2.1.4.
 */
export function ShortcutsToggle() {
  const on = useShortcutsEnabled()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className="os-shortcuts"
      onClick={() => setShortcutsEnabled(!on)}
    >
      Raccourcis clavier A à G : {on ? 'activés' : 'désactivés'}
    </button>
  )
}
