import React from 'react'

export function AboutHeroSection() {
  return (
    <section className="relative z-10 mb-24 lg:mb-40">
      <div className="flex flex-col gap-8">
        <span className="section-label mb-2 max-w-none text-violet-100/50">Notre histoire</span>
        <h1 className="about-hero-title max-w-5xl text-6xl leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
          <span className="block font-medium">Deux expertises,</span>
          <span className="mt-4 block text-[1.05em] font-bold italic text-primary sm:mt-5 md:mt-6">
            une vision commune.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-8 md:text-xl">
          Ancrés au cœur de la Suisse, nous redéfinissons les standards numériques pour les PME.
          Notre approche refuse le compromis : nous bâtissons des architectures qui durent et qui
          répondent à vos besoins.
        </p>
      </div>
    </section>
  )
}
