'use client'

import { useState, type FormEvent } from 'react'

import { sceneStore } from '../sceneStore'

/**
 * Formulaire de la section Contact, branché sur `POST /api/contact`.
 * Les listes de la maquette sont adaptées à `contactSchema` (src/lib/validation.ts)
 * sans le modifier : libellé affiché → valeur envoyée.
 */
const PROJECT_TYPES = [
  { label: 'Site vitrine', value: 'Site web sur mesure' },
  { label: "Refonte d'un site existant", value: "Refonte ou évolution d'un existant" },
  { label: 'Boutique en ligne', value: 'E-commerce / boutique en ligne' },
  { label: 'Application ou outil interne', value: 'Application web/SaaS ou outil métier' },
  { label: 'Automatisation ou IA', value: 'IA & automatisation' },
  { label: 'Autre', value: 'Autre' },
] as const

// Le schéma n'a pas d'échéance mais exige un budget : la seconde liste devient « Budget ».
const BUDGETS = [
  'À définir',
  'Moins de 5k CHF',
  '5k – 10k CHF',
  '10k – 25k CHF',
  '25k – 50k CHF',
  '50k CHF et +',
] as const

type RequiredField = 'f-nom' | 'f-mail' | 'f-msg'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const FALLBACK_ERROR =
  "L'envoi a échoué. Réessayez dans un instant ou écrivez-nous à info@origin-studio.ch."

type Status = { kind: 'idle' | 'sending' | 'error' | 'ok'; text: string }

export function SceneContactForm() {
  const [errors, setErrors] = useState<Partial<Record<RequiredField, true>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.kind === 'sending') return
    const form = e.currentTarget
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value.trim() ?? ''

    const name = value('name')
    const email = value('email')
    const message = value('message')

    const bad: RequiredField[] = []
    if (!name) bad.push('f-nom')
    if (!email || !EMAIL_RE.test(email)) bad.push('f-mail')
    if (!message) bad.push('f-msg')
    setErrors(Object.fromEntries(bad.map((id) => [id, true])))
    if (bad.length) {
      setStatus({
        kind: 'error',
        text: 'Il manque votre nom, une adresse e-mail valide ou la description du projet.',
      })
      document.getElementById(bad[0])?.focus()
      return
    }

    // L'entreprise n'existe pas dans le schéma : elle part en tête du message.
    const company = value('entreprise')
    const body = {
      name,
      email,
      projectType: value('projectType'),
      budget: value('budget'),
      message: company ? `Entreprise : ${company}\n\n${message}` : message,
      website: value('website'),
    }

    setStatus({ kind: 'sending', text: 'Envoi en cours.' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        // 400 (validation) et 429 renvoient un message en français ; le reste est générique.
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        const text = (res.status === 400 || res.status === 429) && data?.error ? data.error : FALLBACK_ERROR
        setStatus({ kind: 'error', text })
        return
      }
      setStatus({
        kind: 'ok',
        text: `Merci ${name.split(' ')[0]}. Votre demande est envoyée, la porte s'allume.`,
      })
      form.reset()
      sceneStore.markSent()
    } catch {
      setStatus({ kind: 'error', text: FALLBACK_ERROR })
    }
  }

  const err = (id: RequiredField) => (errors[id] ? { 'data-err': '' } : {})

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-busy={status.kind === 'sending'}>
      <div className="f2">
        <label className="fld" htmlFor="f-nom" {...err('f-nom')}>
          <span className="mono">Nom *</span>
          <input
            id="f-nom"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors['f-nom'] ? true : undefined}
          />
        </label>
        <label className="fld" htmlFor="f-ent">
          <span className="mono">Entreprise</span>
          <input id="f-ent" name="entreprise" type="text" autoComplete="organization" />
        </label>
      </div>
      <label className="fld" htmlFor="f-mail" {...err('f-mail')}>
        <span className="mono">E-mail *</span>
        <input
          id="f-mail"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors['f-mail'] ? true : undefined}
        />
      </label>
      <div className="f2">
        <label className="fld" htmlFor="f-type">
          <span className="mono">Type de projet</span>
          <select id="f-type" name="projectType" defaultValue={PROJECT_TYPES[0].value}>
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="fld" htmlFor="f-budget">
          <span className="mono">Budget</span>
          <select id="f-budget" name="budget" defaultValue={BUDGETS[0]}>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="fld" htmlFor="f-msg" {...err('f-msg')}>
        <span className="mono">Votre projet *</span>
        <textarea
          id="f-msg"
          name="message"
          rows={4}
          required
          aria-invalid={errors['f-msg'] ? true : undefined}
        />
      </label>
      {/* Champ piège pour les robots : invisible et hors du parcours clavier. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="f-website">Site web</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="fsend">
        <button className="btn dark" type="submit" disabled={status.kind === 'sending'}>
          Envoyer la demande <span aria-hidden="true">→</span>
        </button>
        <p className={status.kind === 'ok' ? 'mono fstat ok' : 'mono fstat'} role="status" aria-live="polite">
          {status.text}
        </p>
      </div>
    </form>
  )
}
