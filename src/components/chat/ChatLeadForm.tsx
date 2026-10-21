'use client'

import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import type { ChatSubmitStatus } from '@/components/chat/chatTypes'

type Props = {
  offerTitle: string
  tierName: string
  delayLabel: string
  status: ChatSubmitStatus
  errorMessage: string | null
  onSubmit: (data: { name: string; email: string }) => void
  onBack: () => void
}

const fieldClass =
  'w-full rounded-lg border border-border bg-card/80 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40'

export function ChatLeadForm({ offerTitle, tierName, delayLabel, status, errorMessage, onSubmit, onBack }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ name, email })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t border-border px-4 py-4">
      <dl className="flex flex-col gap-1 rounded-lg border border-border/70 bg-muted/20 px-3 py-2.5 text-xs">
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">Offre</dt>
          <dd className="text-right text-foreground/90">{offerTitle}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">Palier</dt>
          <dd className="text-right text-foreground/90">{tierName}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">Délai</dt>
          <dd className="text-right text-foreground/90">{delayLabel}</dd>
        </div>
      </dl>

      <input
        type="text"
        required
        placeholder="Nom complet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        className={fieldClass}
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        className={fieldClass}
      />

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onBack}
          disabled={status === 'loading'}
          aria-label="Retour"
        >
          <ArrowLeft className="size-3.5" weight="bold" aria-hidden />
        </Button>
        <Button
          type="submit"
          variant="gradient"
          size="sm"
          disabled={status === 'loading'}
          className="flex-1 text-xs font-semibold tracking-wide uppercase"
        >
          {status === 'loading' ? 'Envoi…' : 'Envoyer'}
          <PaperPlaneTilt className="size-3.5" weight="bold" aria-hidden />
        </Button>
      </div>

      {status === 'error' ? (
        <p className="text-center text-xs text-destructive" role="alert">
          {errorMessage ?? 'Envoi impossible pour le moment.'}
        </p>
      ) : null}
    </form>
  )
}
