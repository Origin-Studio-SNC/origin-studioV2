import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

import { TECH_LOGOS } from './techLogos'

function TechRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={ariaHidden || undefined}>
      {TECH_LOGOS.map((tech) => (
        <div
          key={tech.name}
          className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border/70 bg-white/2 px-5 py-3 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/6"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-4 w-4 shrink-0 fill-current text-foreground/40 transition-colors duration-300 group-hover:text-primary"
          >
            <path d={tech.path} />
          </svg>
          <span className="font-mono text-xs font-light tracking-wide whitespace-nowrap text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export function AboutTechSection() {
  return (
    <section className="relative z-10 mb-24 lg:mb-40">
      <Reveal>
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <span className="section-label max-w-none text-violet-100/50">Exemples de stack</span>
          <p className="max-w-md text-sm font-light text-muted-foreground md:text-right">
            Un aperçu des outils qu&apos;on manie au quotidien — pas une liste fermée. Django,
            Vue, un autre CMS : on s&apos;adapte à votre existant.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="tech-marquee">
          <div className="tech-marquee-track">
            <TechRow />
            <TechRow ariaHidden />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
