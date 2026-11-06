import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesOffers } from '@/components/services/ServicesOffers'
import { buildPageMetadata } from '@/lib/seo'

// Dynamic imports pour les sections below-the-fold
const ServicesProcess = dynamic(
  () => import('@/components/services/ServicesProcess').then((mod) => mod.ServicesProcess),
  { ssr: true }
)
const ServicesFaq = dynamic(
  () => import('@/components/services/ServicesFaq').then((mod) => mod.ServicesFaq),
  { ssr: true }
)

export const metadata: Metadata = buildPageMetadata({
  title: 'Site internet, e-commerce & apps à Genève | Origin Studio',
  description:
    'Création de site internet, boutique e-commerce, applications web et automatisation IA à Genève. Méthode en 4 étapes, devis gratuit sous 24 h.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <div className="services-page relative mx-auto max-w-360 overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <ServicesHero />
      <ServicesOffers />
      <ServicesProcess />
      <ServicesFaq />
    </div>
  )
}
