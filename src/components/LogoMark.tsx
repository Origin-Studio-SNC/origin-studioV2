import { cn } from '@/lib/utils'

/*
 * Symbole Origin Studio (docs/refonte-3d/logo, grille 216 × 216) :
 * deux blocs en équerre et un drapeau carré 60 × 60 à croix centrée.
 */
const BLOCKS = 'M0 0H144V60H60V156H0Z M156 72H216V216H60V156H156Z'
const FLAG = 'M156 0H216V60H156Z'
const CROSS = 'M180 10H192V24H206V36H192V50H180V36H166V24H180Z'

type LogoMarkProps = {
  className?: string
}

/**
 * Symbole en une seule couleur (`currentColor`), croix découpée dans le drapeau.
 * Pour un filigrane ou un motif de fond, là où le rouge serait de trop.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 216 216" className={className} aria-hidden focusable="false">
      <path d={BLOCKS} fill="currentColor" />
      <path d={`${FLAG} ${CROSS}`} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

type SignalBurstProps = {
  className?: string
  /** Joue un ping bref (2 impulsions) au montage — pour un état de succès. */
  pulse?: boolean
}

/**
 * Drapeau du symbole (carré rouge, croix blanche), utilisé comme accent de
 * confirmation : c'est la seule touche de rouge de l'état « envoyé ».
 */
export function SignalBurst({ className, pulse = false }: SignalBurstProps) {
  const svg = (
    <svg viewBox="156 0 60 60" className={cn('relative', className)} aria-hidden focusable="false">
      <path d={FLAG} fill="var(--red)" />
      <path d={CROSS} fill="#fff" />
    </svg>
  )

  if (!pulse) return svg

  return (
    <span className={cn('relative inline-flex text-red', className)}>
      <span className="signal-ping-ring" aria-hidden />
      <span className="signal-ping-ring [animation-delay:0.35s]" aria-hidden />
      {svg}
    </span>
  )
}
