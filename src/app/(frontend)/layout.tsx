import React from 'react'
import './styles.css'
import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Archivo, JetBrains_Mono } from 'next/font/google'
import { ContactLauncher } from '@/components/chat/ContactLauncher'
import { CookieBanner } from '@/components/CookieBanner'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { EMAIL, PHONE_E164 } from '@/lib/contact'
import { cn } from '@/lib/utils'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/seo'

// Refonte 3D : Archivo variable (graisse + largeur) et JetBrains Mono, sur tout le site.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-archivo',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-jetbrains-mono',
})

const SITE_TITLE = 'Origin Studio - Agence Web Genève, Développement Premium'
const SITE_DESCRIPTION =
  'Agence web premium à Genève. Développement sur mesure, design minimaliste, infrastructure sécurisée'

// Métadonnées par défaut, héritées par toute page qui ne définit pas les
// siennes (ex. accueil, réalisations). Une page avec son propre `openGraph`
// (ex. un article de blog) remplace cet objet en entier — pas de fusion
// champ par champ — d'où le fallback sur DEFAULT_OG_IMAGE côté blog.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Origin Studio',
    locale: 'fr_CH',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Origin Studio',
  url: 'https://www.origin-studio.ch/',
  image: 'https://www.origin-studio.ch/img/origin-studio-logo.png',
  logo: 'https://www.origin-studio.ch/img/origin-studio-logo.png',
  email: EMAIL,
  telephone: PHONE_E164,
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
    // Variables de police sur <html> : les tokens de :root (--font-sans, --font-serif)
    // peuvent ainsi s'appuyer sur --font-archivo.
    <html lang="fr" className={cn(archivo.variable, jetbrainsMono.variable)} suppressHydrationWarning>
      <body
        className={cn('h-full scroll-smooth antialiased overflow-x-hidden', archivo.className)}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Refonte 3D : les anciens Navbar/Footer sont débranchés, pas supprimés. */}
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
        <CookieBanner />
        <ContactLauncher />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
