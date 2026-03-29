import React from 'react'

import { AboutHeroSection } from '@/components/about/AboutHeroSection'
import { AboutStorySection } from '@/components/about/AboutStorySection'
import { AboutTeamSection } from '@/components/about/AboutTeamSection'
import { AboutTechSection } from '@/components/about/AboutTechSection'
import { AboutValuesSection } from '@/components/about/AboutValuesSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — Origin Studio',
  description:
    "Découvrez l'histoire d'Origin Studio, notre agence de développement web basée à Genève.",
}

export default function AboutPage() {
  return (
    <div className="about-page relative mx-auto max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(800px,90vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <AboutHeroSection />
      <AboutStorySection />
      <AboutTeamSection />
      <AboutValuesSection />
      <AboutTechSection />
    </div>
  )
}
