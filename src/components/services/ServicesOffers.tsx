import React from 'react'

import { ServiceOfferActions } from '@/components/services/ServiceOfferActions'
import { SERVICE_OFFERS } from '@/components/services/serviceOffersData'
import { ServiceVisual } from '@/components/services/ServiceVisual'
import { cn } from '@/lib/utils'

export function ServicesOffers() {
  return (
    <section className="relative z-10 mb-24 md:mb-32 lg:mb-40">
      <div className="flex flex-col gap-20 md:gap-28 lg:gap-36">
        {SERVICE_OFFERS.map((offer) => (
          <article
            key={offer.title}
            className="grid grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16"
          >
            <div className={cn('min-w-0', offer.reverse && 'lg:order-2')}>
              <ServiceVisual variant={offer.visual} />
            </div>
            <div className={cn('flex min-w-0 flex-col gap-6', offer.reverse && 'lg:order-1')}>
              <h2 className="wrap-break-words text-2xl font-light tracking-tight text-foreground sm:text-3xl md:text-4xl">
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
              <ServiceOfferActions offer={offer} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
