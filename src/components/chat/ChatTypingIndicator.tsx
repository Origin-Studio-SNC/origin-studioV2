export function ChatTypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="L'assistant écrit">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-card/80 px-3.5 py-2.5">
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </div>
  )
}
