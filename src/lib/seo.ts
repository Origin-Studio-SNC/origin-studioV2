/**
 * Constantes SEO/partage partagées entre le layout racine (métadonnées par
 * défaut, sitewide) et les pages qui définissent leur propre `generateMetadata`
 * (ex. les articles de blog) — pour que ces dernières retombent sur la même
 * image quand elles n'ont pas leur propre visuel.
 */
export const SITE_URL = 'https://www.origin-studio.ch'

export const DEFAULT_OG_IMAGE_PATH = '/img/og-image-origin-studio.png'

export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: 'Origin Studio — Agence de développement web premium à Genève',
}
