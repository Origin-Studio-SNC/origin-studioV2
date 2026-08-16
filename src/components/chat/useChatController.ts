'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  DELAY_OPTIONS,
  PROJECT_TYPE_BY_SERVICE,
  SERVICE_OFFERS,
  mapTierToBudgetBand,
} from '@/components/chat/chatFlowConfig'

import type { ChatMessage, ChatStep, ChatSubmitStatus } from '@/components/chat/chatTypes'
import type { OfferTier, ServiceOfferDefinition } from '@/components/services/serviceOffersData'

const STORAGE_KEY = 'origin-studio-chat-state'
const TYPING_DELAY_MS = 450

type PersistedState = {
  offerTitle: string | null
  tierName: string | null
  delayId: string | null
  submitted: boolean
}

function findOffer(title: string | null | undefined): ServiceOfferDefinition | null {
  if (!title) return null
  return SERVICE_OFFERS.find((offer) => offer.title === title) ?? null
}

function findTier(offer: ServiceOfferDefinition | null, name: string | null | undefined): OfferTier | null {
  if (!offer || !name) return null
  return offer.tiers.find((tier) => tier.name === name) ?? null
}

function readPersisted(): PersistedState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PersistedState) : null
  } catch {
    return null
  }
}

function buildTranscript({
  offer,
  tier,
  delayLabel,
  submitted,
}: {
  offer: ServiceOfferDefinition | null
  tier: OfferTier | null
  delayLabel: string | null
  submitted: boolean
}): ChatMessage[] {
  const messages: ChatMessage[] = [
    {
      role: 'bot',
      content: "Bonjour 👋 Je suis l'assistant d'Origin Studio. Sur quel type de projet travaillez-vous ?",
    },
  ]

  if (!offer) return messages
  messages.push({ role: 'user', content: offer.title })
  messages.push({
    role: 'bot',
    content: `Très bien. Voici les paliers indicatifs pour « ${offer.title} » — lequel se rapproche le plus de votre besoin ?`,
  })

  if (!tier) return messages
  messages.push({ role: 'user', content: `${tier.name} — ${tier.price}` })
  messages.push({ role: 'bot', content: 'Et côté timing, vous visez quoi ?' })

  if (!delayLabel) return messages
  messages.push({ role: 'user', content: delayLabel })
  messages.push({
    role: 'bot',
    content: "Parfait, dernière étape : laissez-moi vos coordonnées et je transmets votre demande à l'équipe.",
  })

  if (!submitted) return messages
  messages.push({
    role: 'bot',
    content:
      'Merci ! Votre demande a bien été transmise — nous revenons vers vous sous 24h. Pour tout détailler davantage, le formulaire de contact reste aussi disponible.',
  })
  return messages
}

export function useChatController() {
  const persisted = readPersisted()
  const initialOffer = findOffer(persisted?.offerTitle)

  const [offer, setOffer] = useState<ServiceOfferDefinition | null>(initialOffer)
  const [tier, setTier] = useState<OfferTier | null>(() => findTier(initialOffer, persisted?.tierName))
  const [delayId, setDelayId] = useState<string | null>(persisted?.delayId ?? null)
  const [submitted, setSubmitted] = useState<boolean>(persisted?.submitted ?? false)

  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [submitStatus, setSubmitStatus] = useState<ChatSubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Persiste l'état du parcours pour survivre à un rafraîchissement de page.
  useEffect(() => {
    const toPersist: PersistedState = {
      offerTitle: offer?.title ?? null,
      tierName: tier?.name ?? null,
      delayId,
      submitted,
    }
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist))
    } catch {
      /* sessionStorage indisponible (mode privé, quota) — pas bloquant */
    }
  }, [offer, tier, delayId, submitted])

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current)
    }
  }, [])

  const commitWithTyping = useCallback((userLabel: string, commit: () => void) => {
    setPendingUserMessage(userLabel)
    setIsTyping(true)
    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      commit()
      setPendingUserMessage(null)
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }, [])

  const selectOffer = useCallback(
    (nextOffer: ServiceOfferDefinition) => {
      commitWithTyping(nextOffer.title, () => setOffer(nextOffer))
    },
    [commitWithTyping],
  )

  const selectTier = useCallback(
    (nextTier: OfferTier) => {
      commitWithTyping(`${nextTier.name} — ${nextTier.price}`, () => setTier(nextTier))
    },
    [commitWithTyping],
  )

  const selectDelay = useCallback(
    (id: string) => {
      const label = DELAY_OPTIONS.find((option) => option.id === id)?.label ?? id
      commitWithTyping(label, () => setDelayId(id))
    },
    [commitWithTyping],
  )

  const goBack = useCallback(() => {
    if (delayId) {
      setDelayId(null)
      return
    }
    if (tier) {
      setTier(null)
      return
    }
    if (offer) {
      setOffer(null)
    }
  }, [offer, tier, delayId])

  const restart = useCallback(() => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* pas bloquant */
    }
    setOffer(null)
    setTier(null)
    setDelayId(null)
    setSubmitted(false)
    setSubmitStatus('idle')
    setErrorMessage(null)
  }, [])

  const submitContact = useCallback(
    async ({ name, email }: { name: string; email: string }) => {
      if (!offer || !tier || !delayId) return
      setSubmitStatus('loading')
      setErrorMessage(null)

      const delayLabelValue = DELAY_OPTIONS.find((option) => option.id === delayId)?.label ?? delayId

      const payload = {
        name,
        email,
        projectType: PROJECT_TYPE_BY_SERVICE[offer.contactService],
        budget: mapTierToBudgetBand(tier),
        offerTitle: offer.title,
        tierName: tier.name,
        delay: delayLabelValue,
        message: `Demande initiée via le chatbot du site — offre « ${offer.title} », palier « ${tier.name} », délai souhaité : ${delayLabelValue}.`,
        website: '', // honeypot, toujours vide côté client
      }

      try {
        const res = await fetch('/api/chat/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null
          throw new Error(data?.error ?? 'Envoi impossible pour le moment.')
        }
        setSubmitStatus('idle')
        setSubmitted(true)
      } catch (err) {
        setSubmitStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Envoi impossible pour le moment.')
      }
    },
    [offer, tier, delayId],
  )

  const step: ChatStep = submitted
    ? 'success'
    : !offer
      ? 'project-type'
      : !tier
        ? 'tier'
        : !delayId
          ? 'delay'
          : 'contact'

  const delayLabel = DELAY_OPTIONS.find((option) => option.id === delayId)?.label ?? null

  const baseTranscript = buildTranscript({ offer, tier, delayLabel, submitted })
  const transcript = pendingUserMessage
    ? [...baseTranscript, { role: 'user' as const, content: pendingUserMessage }]
    : baseTranscript

  return {
    step,
    offer,
    tier,
    delayLabel,
    transcript,
    isTyping,
    submitStatus,
    errorMessage,
    selectOffer,
    selectTier,
    selectDelay,
    goBack,
    restart,
    submitContact,
  }
}
