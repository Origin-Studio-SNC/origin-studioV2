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

/** Du haut vers le bas de la tour : `g` est l'étage allumé (0 = rez). */
const services: readonly {
  g: number
  title: string
  floor: string
  text: string
  offer?: OfferKey
  /** Affiche « dès X CHF » (seulement si l'offre correspond vraiment au service). */
  showPrice?: boolean
}[] = [
  {
    g: 4,
    title: 'Développement web sur mesure',
    floor: 'Étage 5',
    text: 'Applications web performantes et évolutives, construites selon vos besoins précis.',
    offer: 'app',
    showPrice: true,
  },
  {
    g: 3,
    title: 'Design et expérience utilisateur',
    floor: 'Étage 4',
    text: 'Des interfaces claires qui guident vos visiteurs sans effort.',
    offer: 'site',
  },
  {
    g: 2,
    title: 'E-commerce',
    floor: 'Étage 3',
    text: 'Catalogue, paiements, commandes et back-office pour vendre en ligne sereinement.',
    offer: 'ecommerce',
    showPrice: true,
  },
  {
    g: 1,
    title: 'IA et automatisation',
    floor: 'Étage 2',
    text: "Automatiser les tâches répétitives et intégrer l'IA là où elle fait gagner du temps.",
    offer: 'ia',
    showPrice: true,
  },
  {
    g: 0,
    title: 'Infrastructure et sécurité',
    floor: 'Étage 1',
    text: 'Hébergement suisse, maintenance et protection des données.',
  },
]

function priceFrom(offer: OfferKey) {
  return SERVICE_OFFERS.find((o) => o.contactService === offer)?.price
}

export function ServicesSection() {
  return (
    <SceneSection id="services" scene={1}>
      <span className="mono lbl">Plan B · La tour</span>
      <h2>Cinq métiers, un seul plan.</h2>
      <ul className="rows" data-hl="1">
        {services.map((s) => {
          const price = s.showPrice && s.offer ? priceFrom(s.offer) : undefined
          return (
            <li key={s.g}>
              <SceneRow scene={1} g={s.g} href={s.offer ? offerHref[s.offer] : '/services'}>
                <strong>{s.title}</strong>
                <em>{price ? `${s.floor} · dès ${price} CHF` : s.floor}</em>
                <small>{s.text}</small>
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
