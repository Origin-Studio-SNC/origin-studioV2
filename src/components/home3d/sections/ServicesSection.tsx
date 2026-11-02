import type { Route } from 'next'
import Link from 'next/link'

import { SERVICE_OFFERS } from '@/components/services/serviceOffersData'

import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

/** Offre de /services (clé `contactService`) → ancre de sa section sur cette page. */
type OfferKey = (typeof SERVICE_OFFERS)[number]['contactService']

const offerHref = {
  site: '/services#offre-site',
  ecommerce: '/services#offre-ecommerce',
  app: '/services#offre-app',
  ia: '/services#offre-ia',
} as const satisfies Record<OfferKey, Route>

/** Du haut vers le bas de la tour : `g` est l'étage allumé de la scène (0 = rez). */
const services: readonly {
  g: number
  title: string
  text: string
  offer?: OfferKey
  /** Affiche « dès X CHF » (seulement si l'offre correspond vraiment au service). */
  showPrice?: boolean
}[] = [
  {
    g: 4,
    title: 'Développement web sur mesure',
    text: 'Applications web évolutives : données structurées, droits utilisateurs, intégrations.',
    offer: 'app',
    showPrice: true,
  },
  {
    g: 3,
    title: 'Design et expérience utilisateur',
    text: 'Maquettes et parcours validés avec vous avant d’écrire le code.',
    offer: 'site',
  },
  {
    g: 2,
    title: 'E-commerce',
    text: 'Catalogue, paiements Stripe ou TWINT, commandes et back-office pour vendre en ligne.',
    offer: 'ecommerce',
    showPrice: true,
  },
  {
    g: 1,
    title: 'IA et automatisation',
    text: 'Automatiser les tâches répétitives et brancher l’IA là où le gain est clair.',
    offer: 'ia',
    showPrice: true,
  },
  {
    g: 0,
    title: 'Infrastructure et sécurité',
    text: 'Hébergement suisse, maintenance et protection des données.',
  },
]

function offerOf(offer: OfferKey) {
  return SERVICE_OFFERS.find((o) => o.contactService === offer)
}

/** Délai du premier palier de l'offre (ex. « 6 – 8 sem. »), lu dans les données de /services. */
function leadTime(offer: OfferKey) {
  return offerOf(offer)?.tiers[0]?.specs.find((s) => s.label === 'Délai')?.value
}

export function ServicesSection() {
  return (
    <SceneSection id="services" scene={1}>
      <h2>Ce que nous faisons.</h2>
      <ul className="rows" data-hl="1">
        {services.map((s) => {
          const price = s.showPrice && s.offer ? offerOf(s.offer)?.price : undefined
          const delay = s.showPrice && s.offer ? leadTime(s.offer) : undefined
          return (
            <li key={s.g}>
              <SceneRow scene={1} g={s.g} href={s.offer ? offerHref[s.offer] : '/services'}>
                <strong>{s.title}</strong>
                {delay && <em>Délai {delay}</em>}
                <small>{s.text}</small>
                <span className="price">{price ? `Dès ${price} CHF` : 'Voir les offres'}</span>
              </SceneRow>
            </li>
          )
        })}
      </ul>
      <Link className="btn dark" href="/services" style={{ alignSelf: 'flex-start' }}>
        Voir services &amp; tarifs <span aria-hidden="true">→</span>
      </Link>
    </SceneSection>
  )
}
