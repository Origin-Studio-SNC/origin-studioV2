import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesOffers } from '@/components/services/ServicesOffers'

// Dynamic imports pour les sections below-the-fold
const ServicesProcess = dynamic(
  () => import('@/components/services/ServicesProcess').then((mod) => mod.ServicesProcess),
  { ssr: true }
)
const ServicesFaq = dynamic(
  () => import('@/components/services/ServicesFaq').then((mod) => mod.ServicesFaq),
  { ssr: true }
)

export const metadata: Metadata = {
  title: 'Services — Origin Studio',
  description:
    'E-commerce headless, identité numérique, SaaS et plateformes sur mesure. Méthode en 4 étapes, Genève.',
}

export default function ServicesPage() {
  return (
    <div className="services-page relative mx-auto max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(720px,85vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <ServicesHero />
      <ServicesOffers />
      <ServicesProcess />
      <ServicesFaq />
    </div>
  )
}
