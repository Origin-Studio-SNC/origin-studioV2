'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { dismissCookieBanner, isCookieBannerDismissed } from '@/lib/cookieBannerState'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isCookieBannerDismissed()) setVisible(true)
  }, [])

  function dismiss() {
    dismissCookieBanner()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Information sur les cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-5 py-4 backdrop-blur-sm sm:px-6 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-foreground/70 sm:text-left">
          🍪 Ce site n&apos;utilise pas de cookies de suivi.{' '}
          <Link
            href="/politique-de-confidentialite"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            En savoir plus
          </Link>
        </p>
        <Button onClick={dismiss} size="sm" className="shrink-0 rounded-full px-6">
          J&apos;ai compris
        </Button>
      </div>
    </div>
  )
}
