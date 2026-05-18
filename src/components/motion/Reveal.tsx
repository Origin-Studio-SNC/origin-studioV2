'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Délai après entrée dans le viewport (s) */
  delay?: number
}

/**
 * Apparition légère au scroll (opacity + léger translateY).
 * Utilise Intersection Observer + CSS pour éviter le bundle Motion.
 * Respecte prefers-reduced-motion via CSS.
 *
 * Important : `threshold` reste à 0 — avec un seuil > 0, un wrapper très haut
 * (ex. corps d’article) peut ne jamais atteindre 15 % visibles sur mobile
 * (ratio max ≈ viewport / hauteur du bloc) et rester invisible.
 */
export function Reveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const markVisible = () => {
      setIsVisible(true)
    }

    // Déjà dans le viewport au montage (pas besoin d’attendre le scroll)
    const rect = element.getBoundingClientRect()
    const vh = window.innerHeight
    const vw = window.innerWidth
    if (rect.height >= 0 && rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0) {
      markVisible()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0,
        /* Marge basse légère → déclenche un peu avant d’être entièrement dans l’écran */
        rootMargin: '0px 0px 12% 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ animationDelay: delay > 0 ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}
