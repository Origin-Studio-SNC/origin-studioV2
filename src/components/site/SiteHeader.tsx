'use client'

import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { PLAN_NAMES, useActivePlan } from '@/components/home3d/sceneStore'
import { cn } from '@/lib/utils'

import { useSitePath } from './useSitePath'

import './site-chrome.css'

/**
 * Lettres A à G de la maquette. Sur l'accueil : ancres des sections, lettre et plan
 * actifs suivis par la scène 3D. Ailleurs : page dédiée quand elle existe, sinon
 * l'ancre de l'accueil ; la lettre active vient de la route.
 */
const SECTIONS = [
  { letter: 'A', label: 'Accueil', anchor: '#accueil', page: '/' },
  { letter: 'B', label: 'Services', anchor: '#services', page: '/services' },
  { letter: 'C', label: 'Engagements', anchor: '#engagements', page: '/#engagements' },
  { letter: 'D', label: 'Réalisations', anchor: '#travaux', page: '/realisations' },
  { letter: 'E', label: 'Méthode', anchor: '#methode', page: '/#methode' },
  { letter: 'F', label: 'Journal', anchor: '#journal', page: '/blog' },
  { letter: 'G', label: 'Contact', anchor: '#contact', page: '/contact' },
] as const

/** Index de la section correspondant à une route hors accueil, -1 si aucune. */
function sectionForPath(pathname: string) {
  return SECTIONS.findIndex(
    (s) => s.page !== '/' && !s.page.startsWith('/#') && (pathname === s.page || pathname.startsWith(`${s.page}/`)),
  )
}

/** Logo complet (docs/refonte-3d/logo) ; le nom accessible est porté par le lien. */
function BrandLogo() {
  return (
    <Image
      src="/img/origin-studio-logo.svg"
      alt=""
      width={121}
      height={24}
      priority
      unoptimized
      className="os-brand-logo"
    />
  )
}

export function SiteHeader() {
  const pathname = useSitePath()
  const isHome = pathname === '/'
  const plan = useActivePlan()
  const active = isHome ? plan : sectionForPath(pathname)
  const [menuOpen, setMenuOpen] = useState(false)

  // Menu mobile : fermé à chaque changement de page, Échap pour fermer, page figée dessous.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    // Fenêtre élargie au-delà de 1180 px : la navigation réapparaît, on ferme le menu.
    const wide = window.matchMedia('(min-width: 1181px)')
    const onWide = () => {
      if (wide.matches) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="os-header">
        <div className="os-hbar">
          {isHome ? (
            <a className="os-brand" href="#accueil" aria-label="Origin Studio, accueil">
              <BrandLogo />
            </a>
          ) : (
            <Link className="os-brand" href="/" aria-label="Origin Studio, accueil">
              <BrandLogo />
            </Link>
          )}
          <nav className="os-nav" aria-label={isHome ? 'Sections' : 'Principale'}>
            {SECTIONS.map((s, i) => {
              const className = cn(i === active && 'on')
              const content = (
                <>
                  <span>{s.letter}</span>
                  {s.label}
                </>
              )
              return isHome ? (
                <a
                  key={s.letter}
                  href={s.anchor}
                  className={className}
                  aria-current={i === active ? 'location' : undefined}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={s.letter}
                  href={s.page as Route}
                  className={className}
                  aria-current={i === active ? 'page' : undefined}
                >
                  {content}
                </Link>
              )
            })}
          </nav>
          <div className="os-hend">
            <span className="os-mono os-readout" aria-live="off">
              {active >= 0 ? PLAN_NAMES[active] : ''}
            </span>
            {/* Sous 1180 px, la navigation passe dans ce menu, sur l'accueil comme sur les autres pages. */}
            <button
              type="button"
              className="os-menu-btn os-mono"
              aria-expanded={menuOpen}
              aria-controls="os-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? 'Fermer' : 'Menu'}
            </button>
          </div>
        </div>
      </header>
      {!isHome && <div className="os-header-spacer" aria-hidden="true" />}
      <nav id="os-menu" className="os-menu" aria-label="Menu" hidden={!menuOpen}>
        <ul>
          {SECTIONS.map((s, i) => {
            const className = cn(i === active && 'on')
            const content = (
              <>
                <span>{s.letter}</span>
                {s.label}
              </>
            )
            return (
              <li key={s.letter}>
                {isHome ? (
                  <a
                    href={s.anchor}
                    className={className}
                    aria-current={i === active ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    href={s.page as Route}
                    className={className}
                    aria-current={i === active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                  </Link>
                )}
              </li>
            )
          })}
          <li>
            <Link
              href="/about"
              className={cn(pathname === '/about' && 'on')}
              aria-current={pathname === '/about' ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">·</span>À propos
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
