'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

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
 * Respecte prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, amount = 0.15 }: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.48, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
