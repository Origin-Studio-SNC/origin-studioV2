import { cn } from '@/lib/utils'

export type ServiceVisualVariant = 'wireframe' | 'workflow' | 'devices' | 'commerce'

type Props = { variant: ServiceVisualVariant; className?: string }

export function ServiceVisual({ variant, className }: Props) {
  return (
    <div
      className={cn(
        'relative aspect-4/3 w-full overflow-hidden rounded-sm border border-border bg-card md:min-h-70 md:aspect-auto',
        className,
      )}
      aria-hidden
    >
      {variant === 'wireframe' && (
        <div className="absolute inset-0 bg-card">
          {/* Fenêtre navigateur + wireframe page */}
          <div className="absolute inset-[10%] flex flex-col rounded-md border border-foreground/15 bg-card/80">
            <div className="flex items-center gap-2 border-b border-foreground/10 px-3 py-2.5">
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-foreground/15" />
                <span className="size-2 rounded-full bg-foreground/15" />
                <span className="size-2 rounded-full bg-foreground/15" />
              </div>
              <div
                className="edit-breathe ml-2 h-2 max-w-[55%] flex-1 rounded-sm border border-dashed border-primary/30 bg-primary/5"
                style={{ animationDelay: '1.6s' }}
              />
            </div>
            <div className="grid flex-1 grid-cols-12 gap-2 p-3">
              <div className="col-span-4 flex flex-col gap-2 border-r border-dashed border-foreground/10 pr-2">
                <div className="h-2 w-3/4 rounded-sm border border-foreground/12" />
                <div className="h-2 w-full rounded-sm border border-foreground/8" />
                <div className="h-2 w-5/6 rounded-sm border border-foreground/8" />
                <div className="edit-breathe mt-auto h-16 rounded-sm border border-dashed border-primary/20 bg-primary/5" />
              </div>
              <div className="col-span-8 flex flex-col gap-2">
                <div className="h-3 w-2/5 rounded-sm border border-foreground/15" />
                <div className="h-2 w-full rounded-sm border border-dashed border-foreground/10" />
                <div className="grid flex-1 grid-cols-2 gap-2 min-h-18">
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
        <div className="absolute inset-0 bg-card">
          <svg
            className="absolute inset-[8%] h-[84%] w-[84%] text-primary/35"
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="flow-path text-primary"
              d="M40 100 H88 M132 100 H178 M222 100 H280 M160 100 V138 M160 158 V172 M96 172 H224"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M88 100 L108 72 L132 72" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <path d="M178 100 L198 72 L222 72" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          </svg>
          {/* Nœuds */}
          <div className="absolute left-[14%] top-1/2 size-11 -translate-y-1/2 rounded-lg border border-primary/45 bg-primary/10" />
          <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-primary/50 bg-primary/15" />
          <div className="absolute right-[14%] top-[18%] size-9 rounded-md border border-foreground/20 bg-foreground/5" />
          <div className="absolute right-[14%] top-[62%] size-9 rounded-md border border-foreground/20 bg-foreground/5" />
          <div className="absolute bottom-[10%] left-1/2 h-8 w-24 -translate-x-1/2 rounded-md border border-primary/35 bg-primary/10" />
          <div className="flow-label-trigger pointer-events-none absolute left-[20%] top-[32%] text-[9px] font-mono uppercase tracking-wider text-primary">
            trigger
          </div>
          <div className="flow-label-run pointer-events-none absolute left-[42%] top-[40%] text-[9px] font-mono uppercase tracking-wider text-primary">
            run
          </div>
        </div>
      )}

      {variant === 'devices' && (
        <div className="absolute inset-0 bg-card">
          {/* Tablette / second écran (arrière-plan) */}
          <div
            className="float-tablet absolute left-[8%] top-[22%] z-0 w-[48%] rounded-lg border border-foreground/12 bg-muted/60 p-2 shadow-lg"
            style={{ aspectRatio: '4/3', transform: 'rotate(-8deg)' }}
          >
            <div className="flex h-full flex-col gap-2 rounded-md border border-foreground/8 bg-card/90 p-2">
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
            className="float-phone absolute right-[10%] bottom-[8%] z-10 w-[30%] max-w-35 rounded-[1.65rem] border-2 border-foreground/20 bg-muted p-1.5"
            style={{ aspectRatio: '9/19', transform: 'rotate(6deg)' }}
          >
            <div className="flex h-full flex-col gap-2 overflow-hidden rounded-[1.15rem] bg-card px-2.5 pb-3 pt-6">
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
          className="absolute inset-0 bg-card"

        >
          <div className="absolute inset-[12%] grid grid-cols-3 gap-[6%]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="commerce-card rounded-sm border border-primary/15 bg-foreground/5"
                style={{ aspectRatio: '3/4', animationDelay: `${i * 0.5}s` }}
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
