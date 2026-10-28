'use client'

import { ChatCircleDots, Robot, WhatsappLogo, X } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ChatWindow } from '@/components/chat/ChatWindow'
import { whatsappMessageFor, whatsappUrl } from '@/lib/contact'

/**
 * Un seul bouton flottant qui s'ouvre en deux : WhatsApp (humain) ou assistant (chatbot).
 * Le calage bas suit `--cookie-banner-h`, posé par CookieBanner tant qu'il est affiché.
 */
export function ContactLauncher() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const wasChatOpen = useRef(false)
  const pathname = usePathname()

  // À la fermeture du chat, le focus revient sur le bouton du lanceur.
  useEffect(() => {
    if (wasChatOpen.current && !chatOpen) buttonRef.current?.focus()
    wasChatOpen.current = chatOpen
  }, [chatOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const active = menuOpen || chatOpen

  const onToggle = () => {
    if (chatOpen) {
      setChatOpen(false)
      return
    }
    setMenuOpen((v) => !v)
  }

  return (
    <>
      <div className="os-launch" ref={rootRef}>
        {menuOpen && (
          <>
            <a
              className="os-launch-item"
              href={whatsappUrl(whatsappMessageFor(pathname))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <WhatsappLogo className="size-5" weight="fill" aria-hidden />
              <span>
                WhatsApp <small>· on vous rappelle</small>
              </span>
            </a>
            <button
              type="button"
              className="os-launch-item"
              onClick={() => {
                setMenuOpen(false)
                setChatOpen(true)
              }}
            >
              <Robot className="size-5" weight="fill" aria-hidden />
              <span>
                Assistant <small>· 24h/24</small>
              </span>
            </button>
          </>
        )}
        <button
          type="button"
          ref={buttonRef}
          className="os-launch-btn"
          onClick={onToggle}
          aria-label={active ? 'Fermer' : 'Nous contacter'}
          aria-expanded={active}
          aria-haspopup="true"
        >
          {active ? (
            <X className="size-6" weight="bold" aria-hidden />
          ) : (
            <ChatCircleDots className="size-6" weight="fill" aria-hidden />
          )}
        </button>
      </div>
      <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
