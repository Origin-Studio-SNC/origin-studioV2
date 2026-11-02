import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

import { TECH_LOGOS } from './techLogos'

export function AboutTechSection() {
  return (
    <section className="relative z-10 mb-24 lg:mb-40">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Les outils que nous utilisons</h2>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Un aperçu, pas une liste fermée. Django, Vue ou un autre CMS : nous nous adaptons à votre
          existant.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          {TECH_LOGOS.map((tech) => (
            <li key={tech.name} className="flex items-center gap-2.5 text-sm text-foreground/80">
              <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 fill-current text-muted-foreground">
                <path d={tech.path} />
              </svg>
              {tech.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
