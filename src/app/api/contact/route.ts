import { NextResponse } from 'next/server'
import { ContactFormData } from '@/lib/types'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  let body: ContactFormData
  try {
    body = (await req.json()) as ContactFormData
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

    // Honeypot: bots often fill all fields, even returning 200 like success
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, projectType, budget, message } = body

  if (
    !name?.trim() ||
    !email?.trim() ||
    !projectType?.trim() ||
    !budget?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

    try {
      await resend.emails.send({
        from: 'Origin Studio <no-reply@origin-studio.ch>',
        to: ['info@origin-studio.ch'],
        replyTo: email,
        subject: `Nouveau brief — ${projectType}`,
        html: `
        <h2>Nouveau brief reçu</h2>
        <table>
          <tr><td><strong>Nom</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Type de projet</strong></td><td>${projectType}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${budget}</td></tr>
        </table>
        <h3>Message</h3>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      })

      // Confirmation email to the client
      await resend.emails.send({
        from: 'Origin Studio <no-reply@origin-studio.ch>',
        to: [email],
        subject: 'Votre brief a bien été reçu — Origin Studio',
        html: `
        <h2>Merci ${name},</h2>
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