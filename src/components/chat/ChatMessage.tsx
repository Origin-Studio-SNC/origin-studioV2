import { cn } from '@/lib/utils'

type Props = {
  role: 'bot' | 'user'
  content: string
}

export function ChatMessage({ role, content }: Props) {
  const isUser = role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed wrap-break-words',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm border border-border bg-card/80 text-foreground',
        )}
      >
        {content}
      </p>
    </div>
  )
}
