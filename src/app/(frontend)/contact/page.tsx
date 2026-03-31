import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import { ContactForm } from '@/components/contact/ContactForm'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactSidebar } from '@/components/contact/ContactSidebar'

export const metadata: Metadata = {
  title: 'Contact — Origin Studio',
  description:
    'Parlons de votre projet : Genève, développement web sur mesure, design et accompagnement.',
}

export default function ContactPage() {
  return (
    <div className="contact-page relative mx-auto max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(720px,85vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <ContactHero />
      <div className="relative z-10 grid min-w-0 grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20 xl:gap-24">
        <div className="min-w-0">
          <ContactSidebar />
        </div>
        <div className="min-w-0">
          <Suspense fallback={<div className="min-h-[min(520px,70vh)] rounded-xl border border-border bg-card/20" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
