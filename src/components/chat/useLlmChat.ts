'use client'

import { useCallback, useRef, useState } from 'react'

const MAX_MESSAGE_LENGTH = 1000
const MAX_HISTORY_MESSAGES = 16 // 8 tours user/assistant

export type LlmMessage = {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Thread du champ libre (fallback LLM, `/api/chat`) — indépendant du parcours
 * guidé (`useChatController`), non persisté entre rafraîchissements (simple
 * fil de Q&A, pas un lead à préserver comme le parcours guidé).
 */
export function useLlmChat() {
  const [messages, setMessages] = useState<LlmMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef<LlmMessage[]>([])
  messagesRef.current = messages

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH)
    if (!trimmed) return

    const history = messagesRef.current.slice(-MAX_HISTORY_MESSAGES)
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setIsTyping(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })
      const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null

      if (!res.ok) {
        throw new Error(data?.error ?? 'Envoi impossible pour le moment.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data?.reply ?? '' }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Envoi impossible pour le moment.')
    } finally {
      setIsTyping(false)
    }
  }, [])

  return { messages, isTyping, error, sendMessage }
}
