/** Coordonnées publiques du studio : source unique pour le site, le JSON-LD et WhatsApp. */
export const EMAIL = 'info@origin-studio.ch'

/** Ligne de l'associé, en attendant un numéro pro : à changer ici uniquement. */
export const PHONE_DISPLAY = '+41 79 176 39 92'
export const PHONE_E164 = '+41791763992'

export const PHONE_HREF = `tel:${PHONE_E164}`

/** Lien WhatsApp (wa.me attend le numéro sans « + »), message prérempli optionnel. */
export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${PHONE_E164.replace('+', '')}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
