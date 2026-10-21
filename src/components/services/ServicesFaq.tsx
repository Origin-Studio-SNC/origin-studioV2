import { Plus } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { FAQ } from '@/lib/faq-data'

export function ServicesFaq() {
  return (
    <section className="relative z-10 mb-16 md:mb-24">
      <Reveal>
        <div className="mb-10 md:mb-12">
          <span className="section-label mb-4 max-w-none text-mute">FAQ</span>
          <h2 className="wrap-break-words text-2xl font-light tracking-tight sm:text-3xl md:text-4xl">
            Questions fréquentes
          </h2>
        </div>
      </Reveal>
      <div className="mx-auto max-w-3xl border-t border-border">
        {FAQ.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.05}>
          <details
            className="group border-b border-border [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary sm:items-center sm:gap-4 md:py-6">
              <span className="min-w-0 flex-1 pr-2">{item.q}</span>
              <Plus
                className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                weight="bold"
                aria-hidden
              />
            </summary>
            <div className="pb-5 text-sm font-light leading-relaxed text-muted-foreground md:pb-6">
              {item.a}
            </div>
          </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
