'use client'

import { useEffect, useRef } from 'react'

/**
 * Repère de défilement de l'accueil : un fil fin et un petit cube rouge qui le descend,
 * comme celui du rail de droite. Décoratif, disparaît dès le premier scroll.
 * Le mouvement est coupé sous `prefers-reduced-motion` (voir home3d.css).
 */
export function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => el.classList.toggle('is-gone', window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div ref={ref} className="cue" aria-hidden="true">
      <i />
    </div>
  )
}
