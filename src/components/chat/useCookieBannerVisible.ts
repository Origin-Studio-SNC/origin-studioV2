'use client'

import { useEffect, useState } from 'react'

import { isCookieBannerDismissed, onCookieBannerDismissed } from '@/lib/cookieBannerState'

/** Reflète la visibilité de `CookieBanner`, pour que le widget de chat s'y décale. */
export function useCookieBannerVisible(): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!isCookieBannerDismissed())
    return onCookieBannerDismissed(() => setVisible(false))
  }, [])

  return visible
}
