import Link from 'next/link'
import { Button } from '../ui/button'

export default function HeroSection() {
  return (
    <section className="hero-glow relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 pb-24 text-center sm:px-6 md:min-h-[calc(100dvh-5rem)] md:pb-28">
      <div className="flex flex-col items-center">
        <span
          className="reveal-on-load section-label mb-6 max-w-xs justify-center text-violet-100/50 md:mb-8"
          style={{ animationDelay: '0.1s' }}
        >
          Studio digital premium
        </span>

        <h1
          className="reveal-on-load page-hero-title mx-auto max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.19s' }}
        >
          Des expériences digitales
          <br />
          sur <span className="text-primary">mesure.</span>
        </h1>

        <p
          className="reveal-on-load mt-8 max-w-lg text-base font-light leading-relaxed text-violet-200 md:mt-10 md:max-w-2xl md:text-lg"
          style={{ animationDelay: '0.28s' }}
        >
          Agence web premium à Genève dédiée à la performance technique et au design minimaliste
          assumé. Nous transformons vos ambitions en expériences, en tout type d&apos;excellence.
        </p>

        <div
          className="reveal-on-load mt-8 flex w-full max-w-md flex-col items-stretch gap-2 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5"
          style={{ animationDelay: '0.37s' }}
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
        </div>
      </div>

      <div
        className="reveal-on-load absolute bottom-8 left-0 w-full px-4 sm:bottom-12 sm:px-6 lg:px-40"
        style={{ animationDelay: '0.55s' }}
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
      </div>
    </section>
  )
}
