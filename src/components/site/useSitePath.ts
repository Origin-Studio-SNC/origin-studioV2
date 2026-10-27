import { usePathname } from 'next/navigation'

/**
 * `usePathname()` normalisé pour l'en-tête et le pied de page.
 *
 * Sur Vercel, quand l'accueil est régénéré côté serveur (ISR, `revalidate = 60`),
 * `usePathname()` renvoie `/index` au lieu de `/`. Le HTML serveur prenait alors
 * l'accueil pour une autre page (menu, espaceur, footer), puis le navigateur
 * corrigeait à l'hydratation : erreur React #418 et décalage de mise en page.
 */
export function useSitePath() {
  const pathname = usePathname()
  return pathname === '/index' ? '/' : pathname
}
