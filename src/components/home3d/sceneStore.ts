import { useSyncExternalStore } from 'react'

/**
 * Petit store partagé entre la scène 3D et le texte de la page d'accueil.
 * - survol : les lignes `data-hl` / `data-g` allument leur partie du bâtiment,
 *   la boucle de rendu lit la valeur à chaque frame (pas de re-render React) ;
 * - envoi : remplace l'évènement `os-sent` de la maquette (portail du plan G en rouge) ;
 * - plan actif : lu par la navigation (lettres A à G) et le plan affiché à droite.
 *
 * Sans dépendance à three : importable par la navbar et les sections.
 */

/** Noms des plans, dans l'ordre des sections `data-scene` 0 à 6. */
export const PLAN_NAMES = [
  'Plan A · Le palais',
  'Plan B · La tour',
  'Plan C · Les trois piliers',
  'Plan D · Trois pièces',
  "Plan E · L'escalier",
  'Plan F · La bibliothèque',
  'Plan G · Le seuil',
] as const

export type Highlight = { scene: number; g: number }

const NONE: Highlight = { scene: -1, g: -1 }

let highlight: Highlight = NONE
let sent = false
let active = 0
const activeListeners = new Set<() => void>()

export const sceneStore = {
  getHighlight: () => highlight,
  setHighlight(scene: number, g: number) {
    highlight = { scene, g }
  },
  clearHighlight() {
    highlight = NONE
  },

  isSent: () => sent,
  markSent() {
    sent = true
  },

  getActive: () => active,
  setActive(index: number) {
    if (index === active) return
    active = index
    activeListeners.forEach((listener) => listener())
  },
  subscribeActive(listener: () => void) {
    activeListeners.add(listener)
    return () => {
      activeListeners.delete(listener)
    }
  },

  /** Remet l'état à zéro quand la scène est démontée (navigation vers une autre page). */
  reset() {
    highlight = NONE
    sent = false
    sceneStore.setActive(0)
  },
}

/** Index du plan affiché (0 à 6), pour la navigation. Client uniquement. */
export function useActivePlan() {
  return useSyncExternalStore(sceneStore.subscribeActive, sceneStore.getActive, () => 0)
}

/** Gestionnaires à poser sur une ligne de texte liée à la partie `g` du plan `scene`. */
export function highlightHandlers(scene: number, g: number) {
  const on = () => sceneStore.setHighlight(scene, g)
  const off = () => sceneStore.clearHighlight()
  return { onPointerEnter: on, onFocus: on, onPointerLeave: off, onBlur: off }
}
