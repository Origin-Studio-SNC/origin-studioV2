'use client'

import { ChatCircleDots, X } from '@phosphor-icons/react'
import { useState } from 'react'

import { ChatWindow } from '@/components/chat/ChatWindow'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        className={cn(
          'fixed right-5 z-50 flex size-14 items-center justify-center rounded-full border-transparent bg-primary text-primary-foreground transition-all duration-200 hover:bg-red active:translate-y-px md:right-8',
          // --cookie-banner-h est posé par CookieBanner tant qu'il est affiché (0 sinon).
          'bottom-[calc(var(--cookie-banner-h,0px)+1.25rem)] md:bottom-[calc(var(--cookie-banner-h,0px)+2rem)]',
        )}
      >
        {open ? (
          <X className="size-6" weight="bold" aria-hidden />
        ) : (
          <ChatCircleDots className="size-6" weight="fill" aria-hidden />
        )}
      </button>
      <ChatWindow open={open} onClose={() => setOpen(false)} />
    </>
  )
}
