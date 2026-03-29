import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import React from 'react'

import { ServiceVisual } from '@/components/services/ServiceVisual'
import { cn } from '@/lib/utils'

const OFFERS = [
  {
    title: 'Sites web sur mesure',
    description:
      'Votre identité numérique développée selon vos besoins spécifiques.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Payload CMS'],
    price: "3'500",
    visual: 'streaks' as const,
    reverse: false, 
  },
  {
    title: 'SaaS & plateformes',
    description:
      'Applications métier sur mesure, logique métier robuste et données structurées. De la conception à la mise en production cloud, nous livrons des plateformes prêtes à scaler.',
    tags: ['TypeScript', 'PostgreSQL', 'AWS'],
    price: "12'000",
    visual: 'code' as const,
    reverse: false,
  },
] as const

export function ServicesOffers() {
  return (
    <section className="relative z-10 mb-24 md:mb-32 lg:mb-40">
      <div className="flex flex-col gap-20 md:gap-28 lg:gap-36">
        {OFFERS.map((offer) => (
          <article
            key={offer.title}
            className="grid grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16"
          >
            <div className={cn(offer.reverse && 'lg:order-2')}>
              <ServiceVisual variant={offer.visual} />
            </div>
            <div className={cn('flex flex-col gap-6', offer.reverse && 'lg:order-1')}>
              <h2 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
                {offer.title}
              </h2>
              <div className="max-w-xl text-base font-light leading-relaxed text-muted-foreground">
                {offer.description}
              </div>
              <div className="flex flex-wrap gap-2">
                {offer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-foreground/80">
                À partir de{' '}
                <span className="text-lg font-semibold tabular-nums text-foreground">
                  {offer.price} CHF
                </span>
              </p>
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                En savoir plus
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  weight="bold"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
