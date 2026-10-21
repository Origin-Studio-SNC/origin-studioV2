import type { ReactNode } from 'react'

type Props = {
  id: string
  /** Index de la structure 3D affichée pendant cette section (0 à 6). */
  scene: number
  children: ReactNode
}

/** Section plein écran de l'accueil : la scène lit `data-scene` pour suivre le scroll. */
export function SceneSection({ id, scene, children }: Props) {
  return (
    <section className="sec" id={id} data-scene={scene}>
      <div className="col">{children}</div>
    </section>
  )
}
