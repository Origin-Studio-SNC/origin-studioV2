import React from 'react'
import EngagementsSection from '@/components/EngagementsSection'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ResourcesSection from '@/components/ResourcesSection'
import ServicesSection from '@/components/ServicesSection'

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <EngagementsSection />
      <ResourcesSection />
    </>
  )
}
