import { CheckCircle } from '@phosphor-icons/react/ssr'
import React from 'react'

const PROPS = [
  {
    title: 'Expertise technique',
    body: 'Développement sur-mesure de haute précision.',
  },
  {
    title: 'Design radical',
    body: 'Esthétique suisse et minimalisme architectural.',
  },
  {
    title: 'Accompagnement',
    body: 'Suivi stratégique de la conception au déploiement.',
  },
] as const

export function ContactSidebar() {
  return (
    <aside className="relative z-10 flex flex-col gap-12 lg:max-w-md lg:pt-2">
      <div>
        <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
          Localisation
        </p>
        <p className="text-lg text-foreground">Genève, Suisse</p>
        <p className="mt-1 text-sm text-muted-foreground">Base d&apos;opérations stratégiques</p>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
          Nous écrire
        </p>
        <a
          href="mailto:info@origin-studio.ch"
          className="text-xl text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          info@origin-studio.ch
        </a>
      </div>

      <div className="h-px w-full bg-border" aria-hidden />

      <ul className="m-0 w-full list-none space-y-8 p-0">
        {PROPS.map((item) => (
          <li key={item.title} className="flex w-full gap-3 text-left">
            <CheckCircle
              className="mt-0.5 size-5 shrink-0 text-primary"
              weight="fill"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-foreground uppercase">
                {item.title}
              </div>
              <div className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                {item.body}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
