'use client'

import { ArrowRight, CaretDown } from '@phosphor-icons/react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PROJECT_TYPES = [
  'Site web sur mesure',
  'E-commerce / boutique en ligne',
  'Application web/SaaS ou outil métier',
  'IA & automatisation',
  "Refonte ou évolution d'un existant",
  'Autre',
] as const

const BUDGETS = [
  'Moins de 5k CHF',
  '5k – 10k CHF',
  '10k – 25k CHF',
  '25k – 50k CHF',
  '50k CHF et +',
  'À définir',
] as const

const fieldClass =
  'w-full rounded-lg border border-border bg-card/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40'

const labelClass = 'mb-2 block text-[10px] font-semibold tracking-[0.2em] text-primary uppercase'

const selectTriggerClass = cn(fieldClass, 'cursor-pointer appearance-none pr-10')

function NativeSelect({
  id,
  name,
  required,
  defaultValue,
  children,
}: {
  id: string
  name: string
  required?: boolean
  defaultValue: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={selectTriggerClass}
      >
        {children}
      </select>
      <CaretDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        weight="bold"
        aria-hidden
      />
    </div>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      projectType: (form.elements.namedItem('projectType') as HTMLSelectElement).value,
      budget: (form.elements.namedItem('budget') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('fail')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative z-10 overflow-hidden rounded-xl border border-border bg-card/40 p-6 shadow-[0_0_0_1px_oklch(1_0_0/4%)] backdrop-blur-sm md:p-8 lg:p-10">
      <span
        className="pointer-events-none absolute top-4 right-4 font-mono text-[clamp(4rem,12vw,7rem)] leading-none font-black text-foreground/6 select-none md:top-6 md:right-8"
        aria-hidden
      >
        /01
      </span>

      <form onSubmit={handleSubmit} className="relative space-y-6">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Nom complet
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jean Dupont"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jean@exemple.com"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-type" className={labelClass}>
              Type de projet
            </label>
            <NativeSelect id="contact-type" name="projectType" required defaultValue="">
              <option value="" disabled>
                Sélectionner…
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <label htmlFor="contact-budget" className={labelClass}>
              Budget estimé
            </label>
            <NativeSelect id="contact-budget" name="budget" required defaultValue="">
              <option value="" disabled>
                Sélectionner…
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Votre message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Décrivez brièvement vos objectifs…"
            className={cn(fieldClass, 'min-h-[140px] resize-y')}
          />
        </div>

        {/* Hidden input to prevent bots from submitting the form */}
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <Button
          type="submit"
          variant="gradient"
          size="xl"
          disabled={status === 'loading'}
          className="w-full rounded-full text-sm font-semibold tracking-wide uppercase"
        >
          {status === 'loading' ? 'Envoi…' : 'Envoyer le brief'}
          <ArrowRight className="size-4" weight="bold" aria-hidden />
        </Button>
        {status === 'success' && (
          <p className="text-center text-sm text-primary" role="status">
            Merci — nous revenons vers vous très vite.
          </p>
        )}
        {status === 'error' && (
          <p className="text-center text-sm text-destructive" role="alert">
            Envoi impossible pour le moment. Écrivez-nous à info@origin-studio.ch
          </p>
        )}
      </form>
    </div>
  )
}
