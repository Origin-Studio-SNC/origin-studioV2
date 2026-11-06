import type { Metadata } from 'next'

/**
 * Constantes SEO/partage partagées entre le layout racine (métadonnées par
 * défaut, sitewide) et les pages qui définissent leur propre `generateMetadata`
 * (ex. les articles de blog) — pour que ces dernières retombent sur la même
 * image quand elles n'ont pas leur propre visuel.
 */
export const SITE_URL = 'https://www.origin-studio.ch'

export const SITE_TITLE = 'Origin Studio - Agence Web Genève, Développement Premium'
export const SITE_DESCRIPTION =
  'Agence web premium à Genève. Développement sur mesure, design minimaliste, infrastructure sécurisée'

export const DEFAULT_OG_IMAGE_PATH ='/img/og-origin-studio.png'

export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: 'Origin Studio — Agence de développement web premium à Genève',
}

/**
 * URL d'un média Payload utilisable comme image de partage, ou `undefined`
 * pour retomber sur l'image par défaut. Accepte les URLs absolues et les
 * chemins racine (`/api/media/file/...`, servis par le plugin Vercel Blob) —
 * Next les résout contre `metadataBase`. Refuse `//hôte`, ambigu.
 */
export function resolveShareImageUrl(url: unknown): string | undefined {
  if (typeof url !== 'string') return undefined
  if (/^https?:\/\//.test(url)) return url
  if (url.startsWith('/') && !url.startsWith('//')) return url
  return undefined
}

type PageMetadataInput = {
  title: string
  description: string
  /** Chemin de la page, ex. `/services` (`/` pour l'accueil). */
  path: string
  /** URL absolue ou chemin d'une image de partage ; défaut : visuel du site. */
  image?: string
  /** `article` pour un billet de blog, `website` sinon. */
  type?: 'website' | 'article'
}

/**
 * Métadonnées complètes d'une page : title, description, canonical et Open
 * Graph/Twitter propres à l'URL. Le `openGraph` d'une page remplace celui du
 * layout en entier (pas de fusion champ par champ) — d'où le titre, l'URL et
 * l'image répétés ici, sans quoi une page hériterait de l'`og:url` de l'accueil.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: PageMetadataInput): Metadata {
  const ogImage = image ? { url: image } : DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Origin Studio',
      locale: 'fr_CH',
      type,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  }
}
