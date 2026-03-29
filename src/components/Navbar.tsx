'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { List, X } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
] as const

function subscribeHash(fn: () => void) {
  window.addEventListener('hashchange', fn)
  window.addEventListener('popstate', fn)
  return () => {
    window.removeEventListener('hashchange', fn)
    window.removeEventListener('popstate', fn)
  }
}

function getHashSnapshot() {
  return window.location.hash
}

function getServerHashSnapshot() {
  return ''
}

function useHashFragment() {
  return useSyncExternalStore(subscribeHash, getHashSnapshot, getServerHashSnapshot)
}

function navLinkIsActive(href: string, pathname: string, hash: string) {
  if (href.startsWith('#')) {
    if (pathname !== '/') return false
    return hash === href
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

const Navbar = () => {
  const pathname = usePathname()
  const hash = useHashFragment()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b transition-[border-color,background-color] duration-300 md:h-20',
        scrolled || menuOpen
          ? 'border-border bg-background/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
        aria-label="Principale"
      >
        <Link
          href="/"
          className="inline-flex items-center text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/img/logo_origin_full.svg"
            alt="Origin Studio"
            width={120}
            height={120}
            className="h-9 w-auto md:h-12"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={`${href}-${label}`}
              className={cn('link-nav', navLinkIsActive(href, pathname, hash) && 'link-nav-active')}
              href={href}
            >
              <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            asChild
            size="sm"
            className="rounded-full px-3 text-[10px] font-semibold uppercase tracking-widest sm:px-6 sm:text-[11px]"
          >
            <Link href="/contact">
              <span className="sm:hidden">Projet</span>
              <span className="hidden sm:inline">Démarrer un projet</span>
            </Link>
          </Button>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-border bg-background/50 text-foreground transition-colors hover:bg-muted md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="size-6" weight="bold" />
            ) : (
              <List className="size-6" weight="bold" />
            )}
          </button>
        </div>
      </nav>

      {/* Panneau mobile */}
      <div
        id="mobile-nav"
        className={cn(
          'fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background/95 backdrop-blur-xl transition-[opacity,visibility] duration-200 md:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col px-4 py-6 pb-10">
          {navLinks.map(({ href, label }) => (
            <a
              key={`mobile-${href}-${label}`}
              href={href}
              className={cn(
                'border-b border-border py-4 text-sm font-semibold uppercase tracking-widest transition-colors',
                navLinkIsActive(href, pathname, hash)
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground',
              )}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Link href="/contact" className="mt-6 w-full" onClick={() => setMenuOpen(false)}>
            <Button size="lg" className="w-full rounded-full uppercase tracking-widest">
              Démarrer un projet
            </Button>
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-16 z-30 bg-background/40 md:hidden"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  )
}

export default Navbar
