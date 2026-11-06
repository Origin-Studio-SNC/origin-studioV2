import React from 'react'

import { AboutHeroSection } from '@/components/about/AboutHeroSection'
import { AboutStorySection } from '@/components/about/AboutStorySection'
import { AboutTeamSection } from '@/components/about/AboutTeamSection'
import { AboutTechSection } from '@/components/about/AboutTechSection'
import { buildPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: "À propos d'Origin Studio, agence web à Genève",
  description:
    "Découvrez l'histoire d'Origin Studio, notre agence de développement web basée à Genève.",
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="about-page relative mx-auto max-w-360 overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <AboutHeroSection />
      <AboutStorySection />
      <AboutTeamSection />
      <AboutTechSection />
    </div>
  )
}
