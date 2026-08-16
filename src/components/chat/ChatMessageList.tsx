'use client'

import { useEffect, useRef } from 'react'

import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatTypingIndicator } from '@/components/chat/ChatTypingIndicator'

import type { ChatMessage as ChatMessageT } from '@/components/chat/chatTypes'

type Props = {
  messages: ChatMessageT[]
  isTyping: boolean
}

export function ChatMessageList({ messages, isTyping }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, isTyping])

  return (
    <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4">
      {messages.map((message, i) => (
        <ChatMessage key={`${message.role}-${i}`} role={message.role} content={message.content} />
      ))}
      {isTyping ? <ChatTypingIndicator /> : null}
      <div ref={bottomRef} />
    </div>
  )
}
