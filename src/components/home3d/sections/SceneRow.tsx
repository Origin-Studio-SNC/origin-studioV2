'use client'

import type { Route } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { highlightHandlers } from '../sceneStore'

type Props<T extends string> = {
  /** Structure concernée (valeur `data-hl` de la liste). */
  scene: number
  /** Partie de la structure allumée au survol ou au focus. */
  g: number
  /** Lien interne ; sans lien, la ligne est un bouton (survol seul). */
  href?: Route<T>
  children: ReactNode
}

/** Ligne de liste qui allume sa partie du bâtiment au survol et au focus clavier. */
export function SceneRow<T extends string>({ scene, g, href, children }: Props<T>) {
  const handlers = highlightHandlers(scene, g)

  if (href) {
    return (
      <Link className="row" href={href} data-g={g} {...handlers}>
        {children}
      </Link>
    )
  }

  return (
    <button className="row" type="button" data-g={g} {...handlers}>
      {children}
    </button>
  )
}
