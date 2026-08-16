import { Reveal } from '@/components/motion/Reveal'
import { LogoMark } from '@/components/LogoMark'

/**
 * Séparateur entre sections de la home : un trait qui se "dessine" au scroll
 * (réutilise la variante `line` de Reveal) plutôt qu'un simple changement de
 * `bg-muted`. Le glyphe centré évite d'inventer un nouveau vocabulaire visuel.
 */
export function SectionDivider() {
  return (
    <div
      className="relative mx-auto flex max-w-7xl items-center justify-center px-5 sm:px-6 lg:px-40"
      aria-hidden
    >
      <Reveal variant="line" className="h-px w-full bg-border">
        {null}
      </Reveal>
      <div className="absolute flex size-9 items-center justify-center rounded-full border border-border bg-background">
        <LogoMark className="h-3.5 w-3.5 text-primary/60" />
      </div>
    </div>
  )
}
