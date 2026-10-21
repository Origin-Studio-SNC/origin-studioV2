'use client'

import { ChatCircleDots, X } from '@phosphor-icons/react'
import { useState } from 'react'

import { ChatWindow } from '@/components/chat/ChatWindow'
import { useCookieBannerVisible } from '@/components/chat/useCookieBannerVisible'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const cookieBannerVisible = useCookieBannerVisible()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        className={cn(
          'fixed right-5 z-50 flex size-14 items-center justify-center rounded-full border-transparent bg-primary text-primary-foreground transition-all duration-200 hover:bg-red active:translate-y-px md:right-8',
          cookieBannerVisible ? 'bottom-[6rem] md:bottom-[7rem]' : 'bottom-[1.25rem] md:bottom-[2rem]',
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
