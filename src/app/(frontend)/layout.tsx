import React from 'react'
import './styles.css'

import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
  description: 'Origin Studio — Agence web créative',
  title: 'Origin Studio - Développement web sur mesure - Genève ch ',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <body
        className={cn(
          'dark h-full scroll-smooth antialiased overflow-x-hidden',
          spaceGrotesk.variable,
          playfairDisplay.variable,
          spaceGrotesk.className,
        )}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex flex-1 flex-col pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
