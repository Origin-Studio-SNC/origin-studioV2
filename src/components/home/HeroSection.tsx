'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { Button } from '../ui/button'

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  const reduced = useReducedMotion()

  const itemHidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
  const itemShow = reduced
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : { opacity: 1, y: 0, transition: { duration: 0.52, ease } }

  const stagger = reduced ? 0 : 0.09
  const delayChildren = reduced ? 0 : 0.1

  return (
    <section className="hero-glow relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 pb-24 text-center sm:px-6 md:min-h-[calc(100dvh-5rem)] md:pb-28">
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: stagger, delayChildren },
          },
        }}
      >
        <motion.span
          className="section-label mb-6 max-w-xs justify-center text-violet-100/50 md:mb-8"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          Studio digital premium
        </motion.span>

        <motion.h1
          className="page-hero-title mx-auto max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          Des expériences digitales
          <br />
          sur <span className="text-primary">mesure.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-lg text-base font-light leading-relaxed text-violet-200 md:mt-10 md:max-w-2xl md:text-lg"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          Agence web premium à Genève dédiée à la performance technique et au design minimaliste
          assumé. Nous transformons vos ambitions en expériences, en tout type d&apos;excellence.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col items-stretch gap-2 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5"
          variants={{ hidden: itemHidden, show: itemShow }}
        >
          <Button
            asChild
            size="xl"
            className="h-10 w-full gap-2 rounded-full px-5 text-sm sm:h-12 sm:w-auto sm:gap-2.5 sm:px-8 sm:text-base"
          >
            <Link href="/realisations">Voir nos réalisations</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="h-10 w-full gap-2 rounded-full px-5 text-sm sm:h-12 sm:w-auto sm:gap-2.5 sm:px-8 sm:text-base"
          >
            <Link href="/services">Nos services</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 w-full px-4 sm:bottom-12 sm:px-6 lg:px-40"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.55, delay: reduced ? 0 : 0.55, ease }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em] text-foreground/30">
          <span>Genève, Suisse</span>
          <span className="size-1 rounded-full bg-foreground/30" />
          <span>Web &amp; Mobile</span>
          <span className="size-1 rounded-full bg-foreground/30" />
          <span>Automatisation</span>
          <span className="size-1 rounded-full bg-foreground/30" />
          <span>Performance First</span>
        </div>
      </motion.div>
    </section>
  )
}
