import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Exploration',
    body: 'Audit des besoins, cadrage technique et définition du périmètre pour poser des bases solides.',
  },
  {
    n: '02',
    title: 'Conception',
    body: 'Design interactif, architecture informationnelle et choix techniques orientés performance.',
  },
  {
    n: '03',
    title: 'Forge',
    body: 'Développement agile, revues de code et intégrations — un code maintenable, livré par itérations.',
  },
  {
    n: '04',
    title: 'Orbite',
    body: 'Mise en ligne, optimisation 360° et accompagnement continu : votre produit reste sous contrôle.',
  },
] as const

export function ServicesProcess() {
  return (
    <section className="relative z-10 mb-24 md:mb-32 lg:mb-40">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <span className="section-label mb-4 max-w-none text-violet-100/50">Notre méthode</span>
          <h2 className="max-w-2xl wrap-break-words text-2xl font-light tracking-tight sm:text-3xl md:text-4xl">
            4 étapes, <span className="text-primary">zéro surprise.</span>
          </h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.07}>
          <div
            className="h-full border border-border bg-card/40 p-6 transition-colors hover:border-primary/20 hover:bg-card/60 md:p-8"
          >
            <span className="font-mono text-xs text-primary">/{step.n}</span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight uppercase">{step.title}</h3>
            <div className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
              {step.body}
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
