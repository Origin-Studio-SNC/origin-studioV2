'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Délai après entrée dans le viewport (s) */
  delay?: number
  /**
   * `fade` (défaut) : translateY + opacity, pour du contenu linéaire (listes, texte).
   * `scale` : léger scale-in, pour des éléments de grille (cards) — les distingue
   * visuellement d'une liste plutôt que de répéter le même tic partout.
   * `line` : scaleX depuis la gauche, pour un connecteur/trait qui se "dessine".
   */
  variant?: 'fade' | 'scale' | 'line'
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
export function Reveal({ children, className = '', delay = 0, variant = 'fade' }: Props) {
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
        /*
         * Marge basse NÉGATIVE : rétrécit la zone de détection vers le haut du
         * viewport, donc le reveal ne se déclenche qu'une fois l'élément déjà
         * visible à l'écran (pas 12% AVANT, sous le pli — c'était le bug qui
         * rendait les animations invisibles en scroll normal).
         */
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const variantClass = variant === 'fade' ? '' : `reveal-${variant}`

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={
        delay > 0
          ? { animationDelay: `${delay}s`, transitionDelay: `${delay}s` }
          : undefined
      }
    >
      {children}
    </div>
  )
}
