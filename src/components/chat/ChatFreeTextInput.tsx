'use client'

import { PaperPlaneTilt } from '@phosphor-icons/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const MAX_LENGTH = 1000

type Props = {
  onSend: (text: string) => void
  disabled?: boolean
}

/** Champ libre toujours disponible, quel que soit l'état du parcours guidé. */
export function ChatFreeTextInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={MAX_LENGTH}
        placeholder="Posez une question…"
        disabled={disabled}
        aria-label="Votre question"
        className="w-full rounded-lg border border-border bg-card/80 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 disabled:opacity-50"
      />
      <Button
        type="submit"
        variant="outline"
        size="icon-sm"
        disabled={disabled || !value.trim()}
        aria-label="Envoyer"
      >
        <PaperPlaneTilt className="size-3.5" weight="bold" aria-hidden />
      </Button>
    </form>
  )
}
