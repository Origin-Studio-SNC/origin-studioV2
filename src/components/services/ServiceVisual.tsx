import { cn } from '@/lib/utils'

export type ServiceVisualVariant = 'wireframe' | 'workflow' | 'devices' | 'commerce'

type Props = { variant: ServiceVisualVariant; className?: string }

export function ServiceVisual({ variant, className }: Props) {
  return (
    <div
      className={cn(
        'relative aspect-4/3 w-full overflow-hidden rounded-sm border border-border bg-card md:min-h-[280px] md:aspect-auto',
        className,
      )}
      aria-hidden
    >
      {variant === 'wireframe' && (
        <div className="absolute inset-0 bg-neutral-950">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 90% 60% at 50% 0%, oklch(0.52 0.18 280 / 0.12) 0%, transparent 55%),
                linear-gradient(165deg, oklch(0.1 0.02 270) 0%, oklch(0.05 0.02 270) 100%)
              `,
            }}
          />
          {/* Fenêtre navigateur + wireframe page */}
          <div className="absolute inset-[10%] flex flex-col rounded-md border border-foreground/15 bg-neutral-950/80">
            <div className="flex items-center gap-2 border-b border-foreground/10 px-3 py-2.5">
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-foreground/15" />
                <span className="size-2 rounded-full bg-foreground/15" />
                <span className="size-2 rounded-full bg-foreground/15" />
              </div>
              <div className="ml-2 h-2 flex-1 max-w-[55%] rounded-sm border border-dashed border-primary/30 bg-primary/5" />
            </div>
            <div className="grid flex-1 grid-cols-12 gap-2 p-3">
              <div className="col-span-4 flex flex-col gap-2 border-r border-dashed border-foreground/10 pr-2">
                <div className="h-2 w-3/4 rounded-sm border border-foreground/12" />
                <div className="h-2 w-full rounded-sm border border-foreground/8" />
                <div className="h-2 w-5/6 rounded-sm border border-foreground/8" />
                <div className="mt-auto h-16 rounded-sm border border-dashed border-primary/20 bg-primary/5" />
              </div>
              <div className="col-span-8 flex flex-col gap-2">
                <div className="h-3 w-2/5 rounded-sm border border-foreground/15" />
                <div className="h-2 w-full rounded-sm border border-dashed border-foreground/10" />
                <div className="grid flex-1 grid-cols-2 gap-2 min-h-[72px]">
                  <div className="rounded-sm border border-dashed border-foreground/10 bg-foreground/3" />
                  <div className="rounded-sm border border-dashed border-foreground/10 bg-foreground/3" />
                </div>
                <div className="h-2 w-full rounded-sm border border-foreground/8" />
              </div>
            </div>
          </div>
        </div>
      )}

      {variant === 'workflow' && (
        <div className="absolute inset-0 bg-neutral-950">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 70% 50% at 30% 70%, oklch(0.5 0.2 280 / 0.15) 0%, transparent 50%),
                linear-gradient(145deg, oklch(0.09 0.02 270) 0%, oklch(0.05 0.02 270) 100%)
              `,
            }}
          />
          <svg
            className="absolute inset-[8%] h-[84%] w-[84%] text-primary/35"
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 100 H88 M132 100 H178 M222 100 H280 M160 100 V138 M160 158 V172 M96 172 H224"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path d="M88 100 L108 72 L132 72" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <path d="M178 100 L198 72 L222 72" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          </svg>
          {/* Nœuds */}
          <div className="absolute left-[14%] top-1/2 size-11 -translate-y-1/2 rounded-lg border border-primary/45 bg-primary/10 shadow-[0_0_20px_-6px_oklch(0.56_0.23_272/0.5)]" />
          <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-primary/50 bg-primary/15" />
          <div className="absolute right-[14%] top-[18%] size-9 rounded-md border border-foreground/20 bg-foreground/5" />
          <div className="absolute right-[14%] top-[62%] size-9 rounded-md border border-foreground/20 bg-foreground/5" />
          <div className="absolute bottom-[10%] left-1/2 h-8 w-24 -translate-x-1/2 rounded-md border border-primary/35 bg-primary/10" />
          <div className="pointer-events-none absolute left-[20%] top-[32%] text-[9px] font-mono uppercase tracking-wider text-primary/50">
            trigger
          </div>
          <div className="pointer-events-none absolute left-[42%] top-[40%] text-[9px] font-mono uppercase tracking-wider text-primary/55">
            run
          </div>
        </div>
      )}

      {variant === 'devices' && (
        <div className="absolute inset-0 bg-neutral-950">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 80% 55% at 75% 35%, oklch(0.52 0.2 275 / 0.18) 0%, transparent 55%),
                linear-gradient(155deg, oklch(0.1 0.02 270) 0%, oklch(0.05 0.02 270) 100%)
              `,
            }}
          />
          {/* Tablette / second écran (arrière-plan) */}
          <div
            className="absolute left-[8%] top-[22%] z-0 w-[48%] rounded-lg border border-foreground/12 bg-neutral-900/60 p-2 shadow-lg"
            style={{ aspectRatio: '4/3', transform: 'rotate(-8deg)' }}
          >
            <div className="flex h-full flex-col gap-2 rounded-md border border-foreground/8 bg-neutral-950/90 p-2">
              <div className="h-2 w-1/3 rounded-sm bg-foreground/10" />
              <div className="flex flex-1 gap-2">
                <div className="w-1/3 rounded-sm border border-dashed border-primary/15 bg-primary/5" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="h-2 rounded-sm bg-foreground/8" />
                  <div className="h-2 rounded-sm bg-foreground/6" />
                  <div className="h-2 rounded-sm bg-foreground/6" />
                  <div className="mt-auto h-8 rounded-sm border border-foreground/10" />
                </div>
              </div>
            </div>
          </div>
          {/* Téléphone (premier plan) */}
          <div
            className="absolute right-[10%] bottom-[8%] z-10 w-[30%] max-w-[140px] rounded-[1.65rem] border-2 border-foreground/20 bg-neutral-900 p-1.5 shadow-[0_24px_50px_-12px_oklch(0_0_0/0.65)]"
            style={{ aspectRatio: '9/19', transform: 'rotate(6deg)' }}
          >
            <div className="flex h-full flex-col gap-2 overflow-hidden rounded-[1.15rem] bg-neutral-950 px-2.5 pb-3 pt-6">
              <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-foreground/15" />
              <div className="h-2 w-2/3 rounded-sm bg-foreground/12" />
              <div className="space-y-1.5">
                <div className="h-8 rounded-md border border-foreground/10 bg-foreground/4" />
                <div className="h-8 rounded-md border border-foreground/10 bg-foreground/4" />
                <div className="h-8 rounded-md border border-foreground/10 bg-foreground/4" />
              </div>
              <div className="mt-auto flex justify-end">
                <div className="size-10 rounded-full border border-primary/40 bg-primary/20" />
              </div>
            </div>
          </div>
        </div>
      )}

      {variant === 'commerce' && (
        <div
          className="absolute inset-0 bg-neutral-950"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 45% at 50% 100%, oklch(0.52 0.18 280 / 0.22) 0%, transparent 55%),
              linear-gradient(160deg, oklch(0.1 0.02 270) 0%, oklch(0.06 0.02 270) 100%)
            `,
          }}
        >
          <div className="absolute inset-[12%] grid grid-cols-3 gap-[6%]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-sm border border-primary/15 bg-linear-to-b from-foreground/6 to-transparent"
                style={{ aspectRatio: '3/4' }}
              />
            ))}
          </div>
          <div className="absolute bottom-[14%] left-1/2 flex h-[18%] w-[42%] -translate-x-1/2 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
            <div className="h-[28%] w-[55%] rounded-sm border border-foreground/20 bg-foreground/5" />
          </div>
        </div>
      )}
    </div>
  )
}
