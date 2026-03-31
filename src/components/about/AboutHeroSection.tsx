'use client'

import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export function AboutHeroSection() {
  const reduced = useReducedMotion()

  const itemHidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
  const itemShow = reduced
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : { opacity: 1, y: 0, transition: { duration: 0.5, ease } }

  const stagger = reduced ? 0 : 0.1
  const delayChildren = reduced ? 0 : 0.06

  return (
    <motion.section
      className="relative z-10 mb-20 md:mb-28 lg:mb-36"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      <div className="flex flex-col">
        <motion.span
          className="section-label mb-6 block max-w-none text-violet-100/50 md:mb-8"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          Notre histoire
        </motion.span>
        <motion.h1
          className="page-hero-title max-w-5xl wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          <span className="block">Deux expertises,</span>
          <span className="mt-3 block text-primary sm:mt-4 md:mt-5">une vision commune.</span>
        </motion.h1>
        <motion.p
          className="mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          Ancrés au cœur de la Suisse, nous redéfinissons les standards numériques pour les PME.
          Notre approche refuse le compromis : nous bâtissons des architectures qui durent et qui
          répondent à vos besoins.
        </motion.p>
      </div>
    </motion.section>
  )
}
