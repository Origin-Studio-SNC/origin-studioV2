'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Délai après entrée dans le viewport (s) */
  delay?: number
  /** Partie du bloc visible pour déclencher (0–1) */
  amount?: 'some' | number
}

/**
 * Apparition légère au scroll (opacity + léger translateY).
 * Utilise Intersection Observer + CSS pour éviter le bundle Motion.
 * Respecte prefers-reduced-motion via CSS.
 */
export function Reveal({ children, className = '', delay = 0, amount = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const threshold = amount === 'some' ? 0.1 : amount

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [amount])

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
