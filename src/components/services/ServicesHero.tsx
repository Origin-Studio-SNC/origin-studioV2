import React from 'react'

export function ServicesHero() {
  return (
    <header className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <span className="section-label mb-6 max-w-none text-violet-100/50 md:mb-8">Services</span>
      <h1 className="services-hero-title max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="uppercase">On construit </span>
        <span className="services-text-outline uppercase not-italic">des sites qui </span>
        <span className="text-[1.02em] font-bold uppercase not-italic text-primary">
          durent.
        </span>
      </h1>
      <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg">
        Architectures pensées pour durer, performances mesurables et déploiements sans surprise.
        Nous concevons des outils numériques qui portent les standards de demain — aujourd&apos;hui.
      </p>
    </header>
  )
}
