import React from 'react'

export function ContactHero() {
  return (
    <header className="relative z-10 mb-16 md:mb-20 lg:mb-24">
      <span className="section-label mb-6 max-w-none text-violet-100/50 md:mb-8">Contact</span>
      <h1 className="contact-hero-title max-w-4xl text-5xl tracking-tight md:text-6xl lg:text-7xl">
        Un projet{' '}
        <span className="bg-linear-to-r from-primary via-[oklch(0.58_0.2_280)] to-[oklch(0.55_0.18_240)] bg-clip-text font-semibold text-transparent">
          en tête ?
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-8 md:text-lg">
        Nous transformons des visions complexes en expériences numériques radicales. Échangeons sur
        votre prochaine révolution.
      </p>
    </header>
  )
}
