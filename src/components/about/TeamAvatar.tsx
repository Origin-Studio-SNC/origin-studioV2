import { LogoMark } from '@/components/LogoMark'

type Props = {
  initials: string
  className?: string
}

/**
 * Repli "sur marque" en l'absence de vraie photo d'équipe : un monogramme
 * plutôt qu'un placeholder générique. Fond uni et glyphe de la marque.
 */
export function TeamAvatar({ initials, className }: Props) {
  return (
    <div className={`relative flex size-full items-center justify-center overflow-hidden bg-muted ${className ?? ''}`}>
      <LogoMark className="absolute top-10 right-10 h-20 w-20 text-primary/10" />
      <span className="relative font-serif text-4xl text-primary/85">{initials}</span>
    </div>
  )
}
