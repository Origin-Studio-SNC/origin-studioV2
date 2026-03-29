import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <section className="hero-glow relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 pb-24 text-center sm:px-6 md:min-h-[calc(100dvh-5rem)] md:pb-28">
      <span className="section-label text-violet-100/50 mb-10 max-w-xs justify-center">
        Studio digital premium
      </span>

      <h1>
        Des expériences
        <br />
        <span className="uppercase">digitales </span>sur
        <br />
        <span className="text-primary">mesure.</span>
      </h1>

      <p className="mt-6 max-w-lg text-sm leading-relaxed text-violet-200">
        Agence web premium à Genève dédiée à la performance technique et au design minimaliste
        assumé. Nous transformons vos ambitions en expériences, en tout type d&apos;excellence.
      </p>

      <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-2 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5">
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
      </div>

      <div className="absolute bottom-8 left-0 w-full px-4 sm:bottom-12 sm:px-6 lg:px-40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em] text-foreground/30">
          <span>Genève, Suisse</span>
          <span className="size-1 rounded-full bg-foreground/30" />
          <span>Web &amp; Mobile</span>
          <span className="size-1 rounded-full bg-foreground/30" />
          <span>Automatisation</span>
          <span className="size-1 rounded-full bg-foreground/30" />
          <span>Performance First</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
