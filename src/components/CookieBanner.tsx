'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { dismissCookieBanner, isCookieBannerDismissed } from '@/lib/cookieBannerState'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCookieBannerDismissed()) setVisible(true)
  }, [])

  // Expose la hauteur réelle du bandeau (--cookie-banner-h) : le chat se place au-dessus,
  // quelle que soit la largeur d'écran et le nombre de lignes du texte.
  useEffect(() => {
    const el = ref.current
    if (!visible || !el) return
    const root = document.documentElement
    const update = () => root.style.setProperty('--cookie-banner-h', `${el.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--cookie-banner-h')
    }
  }, [visible])

  function dismiss() {
    dismissCookieBanner()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div ref={ref} role="region" aria-label="Information sur les cookies" className="os-cookie">
      <p>
        Ce site n&apos;utilise pas de cookies de suivi.{' '}
        <Link href="/politique-de-confidentialite">En savoir plus</Link>
      </p>
      <button type="button" className="os-cookie-btn os-mono" onClick={dismiss}>
        J&apos;ai compris
      </button>
    </div>
  )
}
