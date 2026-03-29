import { cn } from '@/lib/utils'

type Variant = 'streaks' | 'geo' | 'code'

export function ServiceVisual({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-4/3 w-full overflow-hidden rounded-sm border border-border bg-card md:min-h-[280px] md:aspect-auto',
        className,
      )}
      aria-hidden
    >
      {variant === 'streaks' && (
        <div
          className="absolute inset-0 bg-neutral-950"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 70% 40%, oklch(0.56 0.23 272 / 0.25) 0%, transparent 55%),
              radial-gradient(ellipse 60% 80% at 20% 60%, oklch(0.45 0.15 280 / 0.2) 0%, transparent 50%),
              linear-gradient(125deg, oklch(0.12 0.02 270) 0%, oklch(0.06 0.02 270) 100%)
            `,
          }}
        />
      )}
      {variant === 'geo' && (
        <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-neutral-950">
          <div className="absolute bottom-[18%] left-[12%] h-[35%] w-[45%] rounded-lg border border-foreground/10 bg-linear-to-t from-foreground/5 to-transparent" />
          <div className="absolute top-[22%] right-[15%] h-[28%] w-[38%] rounded-full border border-primary/20 bg-primary/5" />
          <div className="absolute top-[40%] left-[40%] h-[20%] w-[25%] rotate-12 rounded-sm border border-foreground/15 bg-foreground/0.03" />
        </div>
      )}
      {variant === 'code' && (
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,oklch(0_0_0/0.4)_50%)] bg-size-[100%_4px] opacity-30" />
          <pre className="absolute inset-4 overflow-hidden p-3 font-mono text-[10px] leading-relaxed text-primary/40 sm:text-[11px]">
            {`const stack = {\n  runtime: 'edge',\n  db: 'postgres',\n  // zero-downtime\n}`}
          </pre>
        </div>
      )}
    </div>
  )
}
