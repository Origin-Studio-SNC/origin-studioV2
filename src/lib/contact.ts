/** Coordonnées publiques du studio : source unique pour le site, le JSON-LD et WhatsApp. */
export const EMAIL = 'info@origin-studio.ch'

/** Ligne de l'associé, en attendant un numéro pro : à changer ici uniquement. */
export const PHONE_DISPLAY = '+41 79 176 39 92'
export const PHONE_E164 = '+41791763992'

export const PHONE_HREF = `tel:${PHONE_E164}`

/** Message d'ouverture WhatsApp, adapté à la page d'où le visiteur écrit. */
export function whatsappMessageFor(pathname?: string) {
  if (pathname?.startsWith('/services')) {
    return "Bonjour Origin Studio, je consulte vos services et tarifs et j'aimerais recevoir un devis. Pouvez-vous me rappeler ?"
  }
  if (pathname?.startsWith('/realisations/')) {
    return "Bonjour Origin Studio, j'ai vu l'une de vos réalisations et j'aimerais un projet similaire. Pouvez-vous me rappeler ?"
  }
  return 'Bonjour Origin Studio, je souhaiterais lancer un projet. Pouvez-vous me rappeler ?'
}

/** Lien WhatsApp (wa.me attend le numéro sans « + »), message prérempli optionnel. */
export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${PHONE_E164.replace('+', '')}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
