import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation'
import { escapeHtml } from '@/lib/html-escape'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'
import { sendLeadEmail } from '@/lib/send-lead-email'

const RATE_LIMIT = { windowMs: 60 * 1000, maxRequests: 5 }

export async function POST(req: Request) {
  // Rate limiting
  const ip = getClientIp(req)

  if (isRateLimited('contact', ip, RATE_LIMIT)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
      { status: 429 }
    )
  }

  // Parse JSON
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Validation avec Zod
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Données invalides'
    return NextResponse.json({ error: firstError }, { status: 400 })
  }

  // Honeypot check (bot detection)
  if (result.data.website && result.data.website.length > 0) {
    // Retourne succès silencieux pour tromper les bots
    return NextResponse.json({ ok: true })
  }

  const { name, email, projectType, budget, message } = result.data

  // Échapper toutes les données utilisateur pour prévenir XSS
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeProjectType = escapeHtml(projectType)
  const safeBudget = escapeHtml(budget)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

  try {
    await sendLeadEmail({
      name: safeName,
      email,
      subject: `Nouveau brief — ${safeProjectType}`,
      rows: [
        { label: 'Nom', value: safeName },
        { label: 'Email', value: safeEmail },
        { label: 'Type de projet', value: safeProjectType },
        { label: 'Budget', value: safeBudget },
      ],
      bodyHtml: safeMessage,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }
}
