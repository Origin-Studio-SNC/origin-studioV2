import React from 'react'

export function AboutHeroSection() {
  return (
    <section className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <div className="flex flex-col">
        <span className="section-label mb-6 max-w-none text-violet-100/50 md:mb-8">Notre histoire</span>
        <h1 className="page-hero-title max-w-5xl break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="block">Deux expertises,</span>
          <span className="mt-3 block text-primary sm:mt-4 md:mt-5">une vision commune.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg">
          Ancrés au cœur de la Suisse, nous redéfinissons les standards numériques pour les PME.
          Notre approche refuse le compromis : nous bâtissons des architectures qui durent et qui
          répondent à vos besoins.
        </p>
      </div>
    </section>
  )
}
