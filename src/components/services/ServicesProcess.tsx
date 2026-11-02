import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { PROCESS_STEPS } from '@/lib/process-steps'

export function ServicesProcess() {
  return (
    <section className="relative z-10 mb-24 md:mb-32 lg:mb-40">
      <Reveal>
        <h2 className="mb-10 max-w-2xl wrap-break-words text-2xl font-light tracking-tight sm:text-3xl md:mb-14 md:text-4xl">
          Comment un projet se déroule
        </h2>
      </Reveal>
      <ol className="border-t border-foreground">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.title} className="border-b border-border">
            <Reveal delay={i * 0.06}>
              <div className="grid gap-2 py-6 md:grid-cols-[minmax(12rem,1fr)_2fr] md:gap-10 md:py-8">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{step.title}</h3>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
