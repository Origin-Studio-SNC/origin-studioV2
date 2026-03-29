import React from 'react'
import EngagementsSection from '@/components/home/EngagementsSection'
import HeroSection from '@/components/home/HeroSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ResourcesSection from '@/components/home/ResourcesSection'
import ServicesSection from '@/components/home/ServicesSection'

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
