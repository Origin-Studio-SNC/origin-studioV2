'use client'

import { ArrowRight, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { Dialog } from 'radix-ui'
import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { ServiceOfferDefinition } from '@/components/services/serviceOffersData'

type Props = {
  offer: ServiceOfferDefinition
}

function contactHrefFor(service: ServiceOfferDefinition['contactService']) {
  return {
    pathname: '/contact' as const,
    query: { service },
  }
}

export function ServiceOfferActions({ offer }: Props) {
  const contactHref = contactHrefFor(offer.contactService)

  return (
    <Dialog.Root>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-baseline">
        <p className="text-sm text-foreground/80">
          À partir de{' '}
          <span className="text-lg font-semibold tabular-nums text-foreground">
            {offer.price} CHF
          </span>
          <span className="mt-1 block text-xs font-normal text-muted-foreground">
            Indicatif — le montant final dépend de votre périmètre et de vos exigences.
          </span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Dialog.Trigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="group h-auto w-fit gap-2 px-0 py-1 text-sm font-medium text-primary hover:bg-transparent hover:text-primary/80"
            >
              En savoir plus
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                weight="bold"
                aria-hidden
              />
            </Button>
          </Dialog.Trigger>
          <Link
            href={contactHref}
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Discuter du projet
          </Link>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 flex max-h-[min(90vh,920px)] w-[calc(100vw-1.5rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-xl border border-border bg-card p-5 shadow-2xl md:p-8',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'duration-200',
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="wrap-break-words text-xl font-light tracking-tight text-foreground sm:text-2xl md:text-3xl">
                {offer.title}
              </Dialog.Title>
              <Dialog.Description className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {offer.modalIntro}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="shrink-0 rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="size-5" weight="bold" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-1 gap-4 overflow-visible pt-5 sm:grid-cols-2 md:grid-cols-3 md:items-stretch">
            {offer.tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  'relative flex min-h-0 min-w-0 flex-1 flex-col overflow-visible rounded-lg border bg-card/60 p-5',
                  tier.featured
                    ? 'border-primary shadow-[0_0_0_1px_oklch(0.56_0.23_272/0.35),0_20px_50px_-24px_oklch(0.56_0.23_272/0.45)]'
                    : 'border-border',
                )}
              >
                {tier.featured ? (
                  <span className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-primary/80 bg-primary px-3 py-1 text-[10px] font-bold tracking-wider text-primary-foreground uppercase shadow-md">
                    Meilleure offre
                  </span>
                ) : null}
                <h3 className="mt-1 text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>
                <p className="mt-4 text-xl font-semibold tabular-nums text-foreground md:text-2xl">
                  {tier.price}
                </p>
                <dl className="mt-4 flex flex-col gap-0 border-t border-border/80 pt-4">
                  {tier.specs.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-3 border-b border-border/40 py-2.5 text-xs last:border-b-0 md:text-[13px]"
                    >
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="max-w-[58%] wrap-break-words text-right text-foreground/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto pt-6">
                  <Button
                    variant={tier.featured ? 'gradient' : 'outline'}
                    size="lg"
                    className="w-full rounded-full text-xs font-semibold tracking-wide uppercase"
                    asChild
                  >
                    <Link href={contactHref}>{tier.ctaLabel}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Toute fourchette est donnée à titre indicatif ; un devis formalisé suit l’analyse de vos besoins.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
