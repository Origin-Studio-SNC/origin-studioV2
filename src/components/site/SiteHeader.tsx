'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PLAN_NAMES, useActivePlan } from '@/components/home3d/sceneStore'
import { cn } from '@/lib/utils'

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

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const plan = useActivePlan()
  const active = isHome ? plan : sectionForPath(pathname)

  return (
    <>
      <header className="os-header">
        <div className="os-hbar">
          {isHome ? (
            <a className="os-brand" href="#accueil" aria-label="Origin Studio, accueil">
              <i aria-hidden="true"></i>Origin Studio
            </a>
          ) : (
            <Link className="os-brand" href="/" aria-label="Origin Studio, accueil">
              <i aria-hidden="true"></i>Origin Studio
            </Link>
          )}
          <nav className="os-nav" aria-label={isHome ? 'Sections' : 'Principale'}>
            {SECTIONS.map((s, i) => {
              const className = cn(i === active && 'on')
              const current = i === active ? ('location' as const) : undefined
              const content = (
                <>
                  <span>{s.letter}</span>
                  {s.label}
                </>
              )
              return isHome ? (
                <a key={s.letter} href={s.anchor} className={className} aria-current={current}>
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
          <span className="os-mono os-readout" aria-live="off">
            {active >= 0 ? PLAN_NAMES[active] : ''}
          </span>
        </div>
      </header>
      {!isHome && <div className="os-header-spacer" aria-hidden="true" />}
    </>
  )
}
