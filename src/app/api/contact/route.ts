import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validation'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting en mémoire
const rateLimitMap = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5

  const requests = rateLimitMap.get(ip) || []
  const recentRequests = requests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) return true

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return false
}

/**
 * Échappe les caractères HTML pour prévenir les injections XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char])
}

export async function POST(req: Request) {
  // Rate limiting
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

  if (isRateLimited(ip)) {
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
      await resend.emails.send({
        from: 'Origin Studio <no-reply@origin-studio.ch>',
        to: ['info@origin-studio.ch'],
        replyTo: email,
        subject: `Nouveau brief — ${safeProjectType}`,
        html: `
        <h2>Nouveau brief reçu</h2>
        <table>
          <tr><td><strong>Nom</strong></td><td>${safeName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${safeEmail}</td></tr>
          <tr><td><strong>Type de projet</strong></td><td>${safeProjectType}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${safeBudget}</td></tr>
        </table>
        <h3>Message</h3>
        <p>${safeMessage}</p>
      `,
      })

      // Confirmation email to the client
      await resend.emails.send({
        from: 'Origin Studio <no-reply@origin-studio.ch>',
        to: [email],
        subject: 'Votre brief a bien été reçu — Origin Studio',
        html: `
        <h2>Merci ${safeName},</h2>
        <p>Nous avons bien reçu votre brief et reviendrons vers vous sous 24h.</p>
        <p>— Elio & Chadi, Origin Studio</p>
      `,
      })

      return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }
}