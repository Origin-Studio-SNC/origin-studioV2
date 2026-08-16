'use client'

import { useEffect, useRef } from 'react'
import { LogoMark } from '@/components/LogoMark'

const MAX_OFFSET_PX = 24

/**
 * Watermark du glyphe en fond de hero : couche la plus lointaine, avec deux
 * mouvements indépendants qui composent une impression de profondeur —
 * une respiration ambiante (CSS, `watermark-drift`) et un léger suivi de la
 * souris (JS, appliqué en style direct pour éviter tout re-render React).
 *
 * Dimensionné en `min(vw, dvh, px)` — pas seulement `vw` — pour ne jamais
 * dépasser la hauteur réellement disponible sur les écrans larges et bas.
 */
export function HeroWatermark() {
  const followRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const followEl = followRef.current
    if (!followEl) return

    const canFollow =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canFollow) return

    let rafId = 0
    let targetX = 0
    let targetY = 0

    const apply = () => {
      rafId = 0
      followEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
    }

    const onPointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5 // -0.5 .. 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      targetX = nx * 2 * MAX_OFFSET_PX
      targetY = ny * 2 * MAX_OFFSET_PX
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={followRef}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center transition-transform duration-700 ease-out"
      aria-hidden
    >
      <div className="watermark-drift">
        <LogoMark className="h-[min(70vw,60dvh,820px)] w-[min(70vw,60dvh,820px)] text-primary blur-[1.5px]" />
      </div>
    </div>
  )
}
