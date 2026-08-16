import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type LeadEmailInput = {
  /** Déjà échappé HTML — affiché dans l'email de confirmation client. */
  name: string
  /** Adresse brute (non échappée) — utilisée comme `replyTo` / destinataire, pas affichée telle quelle. */
  email: string
  subject: string
  /** Lignes déjà échappées HTML, affichées dans le tableau récap de l'email interne. */
  rows: { label: string; value: string }[]
  /** Contenu déjà échappé HTML (message / transcript). */
  bodyHtml: string
}

/**
 * Envoie les 2 emails du pipeline lead (interne + confirmation client), factorisés
 * depuis `/api/contact` pour être réutilisés par `/api/chat/lead`.
 * Tous les champs texte doivent déjà être échappés par l'appelant (voir `escapeHtml`).
 */
export async function sendLeadEmail({ name, email, subject, rows, bodyHtml }: LeadEmailInput) {
  const rowsHtml = rows
    .map((row) => `<tr><td><strong>${row.label}</strong></td><td>${row.value}</td></tr>`)
    .join('\n')

  await resend.emails.send({
    from: 'Origin Studio <no-reply@origin-studio.ch>',
    to: ['info@origin-studio.ch'],
    replyTo: email,
    subject,
    html: `
      <h2>Nouveau brief reçu</h2>
      <table>
        ${rowsHtml}
      </table>
      <h3>Message</h3>
      <p>${bodyHtml}</p>
    `,
  })

  await resend.emails.send({
    from: 'Origin Studio <no-reply@origin-studio.ch>',
    to: [email],
    subject: 'Votre brief a bien été reçu — Origin Studio',
    html: `
      <h2>Merci ${name},</h2>
      <p>Nous avons bien reçu votre brief et reviendrons vers vous sous 24h.</p>
      <p>— Chadi C. &amp; Eric T., Origin Studio</p>
    `,
  })
}
