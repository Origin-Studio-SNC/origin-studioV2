'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

/** Mêmes sections et mêmes lettres que la navigation de l'accueil (SiteHeader). */
const MARKS = [
  ['accueil', 'A'],
  ['services', 'B'],
  ['engagements', 'C'],
  ['travaux', 'D'],
  ['methode', 'E'],
  ['journal', 'F'],
  ['contact', 'G'],
] as const

type Mark = { id: string; letter: string; p: number; top: number }

const clamp = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Barre de défilement du site : un rail fin à droite, un cube rouge qui descend (et tourne)
 * avec le scroll, et sur l'accueil un repère par section. Le scroll reste natif sur `window` :
 * le rail ne fait que l'afficher et le piloter (clic, glisser).
 */
export function ScrollRail() {
  const pathname = usePathname()
  const railRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const marksRef = useRef<Mark[]>([])
  const draggingRef = useRef(false)
  const [marks, setMarks] = useState<Mark[]>([])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const root = document.documentElement
    root.classList.add('has-scroll-rail')

    let raf = 0
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    let lastActive = ''

    const maxScroll = () => Math.max(0, root.scrollHeight - window.innerHeight)

    const update = () => {
      raf = 0
      const max = maxScroll()
      const p = max > 0 ? clamp(window.scrollY / max) : 0
      rail.style.setProperty('--rail-p', String(p))
      rail.dataset.empty = max > 0 ? 'false' : 'true'

      const probe = window.scrollY + window.innerHeight * 0.5
      const active = [...marksRef.current].reverse().find((m) => m.top <= probe)
      const activeId = active?.id ?? ''

      if (labelRef.current) {
        labelRef.current.textContent = `${active?.letter ?? ''} ${Math.round(p * 100)}`.trim()
      }
      if (activeId !== lastActive) {
        lastActive = activeId
        rail.querySelectorAll<HTMLElement>('[data-mark]').forEach((el) => {
          el.classList.toggle('is-active', el.dataset.mark === activeId)
        })
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onScroll = () => {
      rail.classList.add('is-scrolling')
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => rail.classList.remove('is-scrolling'), 1100)
      schedule()
    }

    const buildMarks = () => {
      const max = maxScroll()
      const next: Mark[] =
        max > 0
          ? MARKS.flatMap(([id, letter]) => {
              const el = document.getElementById(id)
              if (!el) return []
              const top = el.getBoundingClientRect().top + window.scrollY
              return [{ id, letter, top, p: clamp(top / max) }]
            })
          : []
      marksRef.current = next
      lastActive = ''
      setMarks((prev) =>
        prev.length === next.length && prev.every((m, i) => m.id === next[i].id && m.p === next[i].p)
          ? prev
          : next,
      )
      schedule()
    }

    buildMarks()
    // Le contenu serveur de l'accueil peut finir de se mettre en page juste après le montage.
    const settle = setTimeout(buildMarks, 400)

    const resizeObserver = new ResizeObserver(buildMarks)
    // `body` a une hauteur fixe (100 %) : c'est `main` qui suit la hauteur réelle du contenu.
    resizeObserver.observe(document.body)
    const main = document.querySelector('main')
    if (main) resizeObserver.observe(main)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', buildMarks)

    return () => {
      root.classList.remove('has-scroll-rail')
      cancelAnimationFrame(raf)
      clearTimeout(hideTimer)
      clearTimeout(settle)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', buildMarks)
    }
  }, [pathname])

  const scrollToPointer = (clientY: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const p = clamp((clientY - rect.top) / rect.height)
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo({ top: p * max, behavior: 'instant' })
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    railRef.current?.classList.add('is-dragging')
    scrollToPointer(e.clientY)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) scrollToPointer(e.clientY)
  }

  const endDrag = () => {
    draggingRef.current = false
    railRef.current?.classList.remove('is-dragging')
  }

  return (
    <div className="os-rail" ref={railRef} aria-hidden="true" data-empty="true">
      <div
        className="os-rail-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="os-rail-fill" />
        {marks.map((m) => (
          <button
            key={m.id}
            type="button"
            tabIndex={-1}
            className="os-rail-tick"
            data-mark={m.id}
            style={{ top: `${m.p * 100}%` }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() =>
              // `auto` laisse le CSS décider (`motion-safe:scroll-smooth` sur <html>)
              document.getElementById(m.id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
            }
          />
        ))}
        <span className="os-rail-thumb">
          <span className="os-cube">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </span>
        <span className="os-rail-label" ref={labelRef} />
      </div>
    </div>
  )
}
