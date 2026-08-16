import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { escapeHtml } from '@/lib/html-escape'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'
import { sendLeadEmail } from '@/lib/send-lead-email'
import { chatLeadSchema } from '@/lib/validation'

// Budget plus large que /api/contact : le chat peut légitimement générer plus
// de requêtes par visiteur (plusieurs étapes) sur une session de navigation.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, maxRequests: 10 }

export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (isRateLimited('chat-lead', ip, RATE_LIMIT)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = chatLeadSchema.safeParse(body)

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Données invalides'
    return NextResponse.json({ error: firstError }, { status: 400 })
  }

  // Honeypot (voir contactSchema.website) — succès silencieux pour tromper les bots
  if (result.data.website && result.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, projectType, budget, offerTitle, tierName, delay, message } = result.data

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeProjectType = escapeHtml(projectType)
  const safeBudget = escapeHtml(budget)
  const safeOfferTitle = escapeHtml(offerTitle)
  const safeTierName = escapeHtml(tierName)
  const safeDelay = escapeHtml(delay)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

  // Persistance best-effort : un souci Postgres ne doit jamais empêcher la
  // notification email, qui reste le canal principal.
  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'chat-leads',
      overrideAccess: true,
      data: { name, email, projectType, offerTitle, tierName, budget, delay, message },
    })
  } catch (error) {
    console.error('ChatLeads persistence error:', error)
  }

  try {
    await sendLeadEmail({
      name: safeName,
      email,
      subject: `Nouvelle demande chatbot — ${safeOfferTitle}`,
      rows: [
        { label: 'Nom', value: safeName },
        { label: 'Email', value: safeEmail },
        { label: 'Type de projet', value: safeProjectType },
        { label: 'Offre', value: safeOfferTitle },
        { label: 'Palier', value: safeTierName },
        { label: 'Budget', value: safeBudget },
        { label: 'Délai souhaité', value: safeDelay },
      ],
      bodyHtml: safeMessage,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }
}
