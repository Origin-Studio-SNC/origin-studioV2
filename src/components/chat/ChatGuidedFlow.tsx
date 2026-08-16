'use client'

import { ArrowLeft, X } from '@phosphor-icons/react'

import { ChatLeadForm } from '@/components/chat/ChatLeadForm'
import { ChatMessageList } from '@/components/chat/ChatMessageList'
import { ChatStepButtons } from '@/components/chat/ChatStepButtons'
import { DELAY_OPTIONS, SERVICE_OFFERS } from '@/components/chat/chatFlowConfig'
import { useChatController } from '@/components/chat/useChatController'
import { Button } from '@/components/ui/button'

type Props = {
  onClose: () => void
}

const backButtonClass =
  'w-fit gap-1.5 px-0 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground'

export function ChatGuidedFlow({ onClose }: Props) {
  const chat = useChatController()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Origin Studio</p>
          <p className="text-xs text-muted-foreground">Répond en général en quelques minutes</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le chat"
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" weight="bold" aria-hidden />
        </button>
      </div>

      <ChatMessageList messages={chat.transcript} isTyping={chat.isTyping} />

      {chat.step === 'project-type' && !chat.isTyping ? (
        <div className="border-t border-border px-4 py-4">
          <ChatStepButtons
            options={SERVICE_OFFERS.map((offer) => ({ id: offer.title, label: offer.title }))}
            onSelect={(id) => {
              const offer = SERVICE_OFFERS.find((o) => o.title === id)
              if (offer) chat.selectOffer(offer)
            }}
          />
        </div>
      ) : null}

      {chat.step === 'tier' && chat.offer && !chat.isTyping ? (
        <div className="flex flex-col gap-2 border-t border-border px-4 py-4">
          <ChatStepButtons
            options={chat.offer.tiers.map((tier) => ({ id: tier.name, label: tier.name, sublabel: tier.price }))}
            onSelect={(id) => {
              const tier = chat.offer?.tiers.find((t) => t.name === id)
              if (tier) chat.selectTier(tier)
            }}
          />
          <Button variant="ghost" size="sm" onClick={chat.goBack} className={backButtonClass}>
            <ArrowLeft className="size-3.5" weight="bold" aria-hidden /> Retour
          </Button>
        </div>
      ) : null}

      {chat.step === 'delay' && !chat.isTyping ? (
        <div className="flex flex-col gap-2 border-t border-border px-4 py-4">
          <ChatStepButtons
            options={DELAY_OPTIONS.map((option) => ({ id: option.id, label: option.label }))}
            onSelect={(id) => chat.selectDelay(id)}
          />
          <Button variant="ghost" size="sm" onClick={chat.goBack} className={backButtonClass}>
            <ArrowLeft className="size-3.5" weight="bold" aria-hidden /> Retour
          </Button>
        </div>
      ) : null}

      {chat.step === 'contact' && chat.offer && chat.tier && chat.delayLabel ? (
        <ChatLeadForm
          offerTitle={chat.offer.title}
          tierName={chat.tier.name}
          delayLabel={chat.delayLabel}
          status={chat.submitStatus}
          errorMessage={chat.errorMessage}
          onSubmit={chat.submitContact}
          onBack={chat.goBack}
        />
      ) : null}

      {chat.step === 'success' ? (
        <div className="border-t border-border px-4 py-4">
          <Button variant="outline" size="sm" onClick={chat.restart} className="w-full rounded-full text-xs">
            Nouvelle demande
          </Button>
        </div>
      ) : null}
    </div>
  )
}
