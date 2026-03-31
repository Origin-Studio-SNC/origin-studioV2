import React, { Suspense } from 'react'
import EngagementsSection from '@/components/home/EngagementsSection'
import HeroSection from '@/components/home/HeroSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ResourcesSection from '@/components/home/ResourcesSection'
import ServicesSection from '@/components/home/ServicesSection'

function SectionFallback({ minHeight }: { minHeight: string }) {
  return (
    <div
      className="bg-muted/10"
      style={{ minHeight }}
      aria-hidden
    />
  )
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Suspense fallback={<SectionFallback minHeight="min(720px, 85vh)" />}>
        <ProjectsSection />
      </Suspense>
      <EngagementsSection />
      <Suspense fallback={<SectionFallback minHeight="420px" />}>
        <ResourcesSection />
      </Suspense>
    </>
  )
}
