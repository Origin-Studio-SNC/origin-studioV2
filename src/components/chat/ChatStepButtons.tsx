type ChatOption = {
  id: string
  label: string
  sublabel?: string
}

type Props = {
  options: ChatOption[]
  onSelect: (id: string) => void
}

export function ChatStepButtons({ options, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option.id)}
          className="group flex flex-col items-start gap-0.5 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5"
        >
          <span className="font-medium">{option.label}</span>
          {option.sublabel ? <span className="text-xs text-muted-foreground">{option.sublabel}</span> : null}
        </button>
      ))}
    </div>
  )
}
