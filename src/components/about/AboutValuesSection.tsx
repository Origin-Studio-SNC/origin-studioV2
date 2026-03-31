import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

const VALUES = [
  {
    n: '01',
    title: 'Souveraineté',
    body: "Nous garantissons l'indépendance technologique totale de nos clients. Votre code vous appartient.",
  },
  {
    n: '02',
    title: 'Performance',
    body: 'Chaque milliseconde compte. Nous optimisons chaque interaction pour une fluidité sans concession.',
  },
  {
    n: '03',
    title: 'Transparence',
    body: 'Pas de jargon, pas de frais cachés. Une communication honnête et directe à chaque étape.',
  },
] as const

export function AboutValuesSection() {
  return (
    <section className="relative z-10 mb-24 lg:mb-40">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <span className="section-label mb-4 max-w-none text-violet-100/50"> Nos valeurs </span>
        </div>
      </Reveal>
      <div className="flex flex-col">
        {VALUES.map((row, i) => (
          <Reveal key={row.n} delay={i * 0.06}>
          <div
            className={`group flex min-w-0 flex-col items-start justify-between gap-4 border-t border-border px-2 py-10 transition-all duration-300 hover:bg-muted/20 md:flex-row md:items-center md:gap-8 md:px-4 md:py-12 ${i === VALUES.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex min-w-0 items-center gap-4 sm:gap-6 md:gap-8">
              <span className="shrink-0 font-mono text-xs text-primary">/{row.n}</span>
              <h3 className="wrap-break-words text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{row.title}</h3>
            </div>
            <p className="w-full max-w-none text-sm font-light text-muted-foreground md:max-w-md md:shrink-0">
              {row.body}
            </p>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
