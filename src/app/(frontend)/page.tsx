import React from 'react'

import '@/components/home3d/home3d.css'
import { HomeScene } from '@/components/home3d/HomeScene'
import { AccueilSection } from '@/components/home3d/sections/AccueilSection'
import { ContactSection } from '@/components/home3d/sections/ContactSection'
import { EngagementsSection } from '@/components/home3d/sections/EngagementsSection'
import { JournalSection } from '@/components/home3d/sections/JournalSection'
import { MethodeSection } from '@/components/home3d/sections/MethodeSection'
import { RealisationsSection } from '@/components/home3d/sections/RealisationsSection'
import { ServicesSection } from '@/components/home3d/sections/ServicesSection'

/** Payload sur la home : sans ça, Next peut servir la page figée au dernier build statique. */
export const revalidate = 60

// Refonte 3D (docs/refonte-3d/BRIEF.md).
// Pas de Suspense ici : la scène a besoin des 7 sections `data-scene` dans le DOM
// dès son montage pour calculer la progression du scroll.
export default async function HomePage() {
  return (
    <div className="home3d">
      <HomeScene />
      <div className="h3-main">
        <AccueilSection />
        <ServicesSection />
        <EngagementsSection />
        <RealisationsSection />
        <MethodeSection />
        <JournalSection />
        <ContactSection />
      </div>
    </div>
  )
}
