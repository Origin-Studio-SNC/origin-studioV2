import React from 'react'
import './styles.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { CookieBanner } from '@/components/CookieBanner'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-sans',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-serif',
})

export const metadata = {
  description: 'Agence web premium à Genève. Développement sur mesure, design minimaliste, infrastructure sécurisée',
  title: 'Origin Studio - Agence Web Genève, Développement Premium',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Origin Studio',
  url: 'https://www.origin-studio.ch/',
  image: 'https://www.origin-studio.ch/img/logo_origin_full.svg',
  email: 'info@origin-studio.ch',
  telephone: '+41791763992',
  areaServed: [
    'Genève',
    'Meyrin',
    'Vernier',
    'Lancy',
    'Onex',
    'Carouge',
    'Thônex',
    'Chêne-Bougeries',
    'Plan-les-Ouates',
    'Versoix',
    'Bernex',
    'Nyon',
    'Lausanne',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Genève',
    addressRegion: 'GE',
    addressCountry: 'CH',
  },
  sameAs: [
    'https://www.linkedin.com/company/origin-studio-swiss',
    'https://www.instagram.com/origin_studio.ch/',
  ],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          'dark h-full scroll-smooth antialiased overflow-x-hidden',
          spaceGrotesk.variable,
          playfairDisplay.variable,
          spaceGrotesk.className,
        )}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex flex-1 flex-col pt-16 md:pt-20">{children}</main>
        <Footer />
        <CookieBanner />
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
