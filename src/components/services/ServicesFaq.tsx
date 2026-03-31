import { Plus } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const FAQ = [
  {
    q: 'Quels sont vos délais de réalisation en moyenne ?',
    a: "Selon la complexité : quelques semaines pour un site institutionnel cadré, plusieurs mois pour une plateforme ou un SaaS. Nous fixons un planning réaliste dès l'exploration.",
  },
  {
    q: 'Travaillez-vous avec des technologies open source ?',
    a: 'Oui, massivement : Next.js, PostgreSQL, outils standards de l’écosystème moderne. Pas de cage propriétaire : vous restez libre de faire évoluer votre stack.',
  },
  {
    q: 'Proposez-vous un hébergement managé ?',
    a: 'Nous pouvons prendre en charge le déploiement et l’hébergement (souvent sur infrastructure européenne / suisse selon besoin), ou vous laisser la main sur votre propre cloud.',
  },
  {
    q: 'Pouvez-vous reprendre un projet existant ?',
    a: "Oui : audit technique, dette, refonte progressive ou rescue. Nous commençons par une phase d'exploration pour mesurer l'existant avant d'engager.",
  },
  {
    q: 'Comment se déroule la facturation ?',
    a: 'Généralement acompte au lancement, jalons ou sprint pour le développement, solde à la livraison — adapté au type de mission. Détail dans le devis.',
  },
] as const

export function ServicesFaq() {
  return (
    <section className="relative z-10 mb-16 md:mb-24">
      <div className="mb-10 md:mb-12">
        <span className="section-label mb-4 max-w-none text-violet-100/50">FAQ</span>
        <h2 className="break-words text-2xl font-light tracking-tight sm:text-3xl md:text-4xl">
          Questions fréquentes
        </h2>
      </div>
      <div className="mx-auto max-w-3xl border-t border-border">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group border-b border-border [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary sm:items-center sm:gap-4 md:py-6">
              <span className="min-w-0 flex-1 pr-2">{item.q}</span>
              <Plus
                className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                weight="bold"
                aria-hidden
              />
            </summary>
            <div className="pb-5 text-sm font-light leading-relaxed text-muted-foreground md:pb-6">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
