import { SERVICE_OFFERS } from '@/components/services/serviceOffersData'

import type { OfferTier, ServiceOfferDefinition } from '@/components/services/serviceOffersData'

export { SERVICE_OFFERS }

/**
 * Vocabulaire aligné sur `contactSchema.projectType` (src/lib/validation.ts) —
 * mêmes libellés que `SERVICE_QUERY_MAP` dans `ContactForm.tsx`, dupliqués ici
 * volontairement (comme `PROJECT_TYPES`/`BUDGETS` le sont déjà dans ContactForm)
 * plutôt que de coupler les deux composants.
 */
export const PROJECT_TYPE_BY_SERVICE: Record<ServiceOfferDefinition['contactService'], string> = {
  site: 'Site web sur mesure',
  ecommerce: 'E-commerce / boutique en ligne',
  app: 'Application web/SaaS ou outil métier',
  ia: 'IA & automatisation',
}

export const DELAY_OPTIONS = [
  { id: 'urgent', label: 'Le plus vite possible' },
  { id: '1-3-mois', label: '1 à 3 mois' },
  { id: '3-6-mois', label: '3 à 6 mois' },
  { id: 'pas-defini', label: 'Pas encore défini' },
] as const

/**
 * Fait correspondre le palier choisi à une des bandes de `contactSchema.budget`
 * (le formulaire humain utilise ce même vocabulaire), à partir de la borne basse
 * de `tier.price` (ex. "10'000 – 25'000 CHF" → 10000). "Sur devis" → "À définir".
 */
export function mapTierToBudgetBand(tier: OfferTier): string {
  const match = tier.price.replace(/'/g, '').match(/\d+/)
  const low = match ? Number(match[0]) : null

  if (low === null) return 'À définir'
  if (low < 5000) return 'Moins de 5k CHF'
  if (low < 10000) return '5k – 10k CHF'
  if (low < 25000) return '10k – 25k CHF'
  if (low < 50000) return '25k – 50k CHF'
  return '50k CHF et +'
}
