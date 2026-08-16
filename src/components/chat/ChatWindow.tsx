'use client'

import { ChatGuidedFlow } from '@/components/chat/ChatGuidedFlow'
import { useCookieBannerVisible } from '@/components/chat/useCookieBannerVisible'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  onClose: () => void
}

/**
 * Panneau non-modal (pas de `Radix Dialog`, intrinsèquement modal/bloquant —
 * inadapté ici : l'utilisateur doit pouvoir continuer à naviguer le site
 * pendant que le chat reste ouvert).
 */
export function ChatWindow({ open, onClose }: Props) {
  const cookieBannerVisible = useCookieBannerVisible()

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Discuter avec Origin Studio"
      className={cn(
        'fixed right-5 z-50 flex h-[min(600px,70vh)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl md:right-8',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        cookieBannerVisible ? 'bottom-[10.5rem] md:bottom-[11.5rem]' : 'bottom-[5.75rem] md:bottom-[6.75rem]',
      )}
    >
      <ChatGuidedFlow onClose={onClose} />
    </div>
  )
}
