'use client'

import Link from 'next/link'

import { EMAIL } from '@/lib/contact'

import { useSitePath } from './useSitePath'

/**
 * Pied de page simple des pages hors accueil. Sur l'accueil, c'est la ligne
 * de la section Contact qui en tient lieu.
 */
export function SiteFooter() {
  const pathname = useSitePath()
  if (pathname === '/') return null

  return (
    <footer className="os-footer os-mono">
      <span>© {new Date().getFullYear()} Origin Studio</span>
      <span>Genève, Suisse</span>
      <Link href="/services">Services &amp; tarifs</Link>
      <Link href="/about">À propos</Link>
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <a href="https://www.linkedin.com/company/origin-studio-swiss" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="https://www.instagram.com/origin_studio.ch/" target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <Link href="/mentions-legales">Mentions légales</Link>
      <Link href="/politique-de-confidentialite">Confidentialité</Link>
    </footer>
  )
}
