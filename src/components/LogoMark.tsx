import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  /**
   * Joue le "signature moment" : le tracé se dessine (stroke) puis se
   * remplit, une seule fois au montage. Réservé au hero de la home —
   * un geste authored, pas un tic répété sur chaque page.
   */
  animateDraw?: boolean
}

/**
 * Glyphe Origin Studio (cercle-dans-carré) en SVG inline, réutilisable
 * comme watermark, motif de fond ou signature animée.
 * Source : public/img/logo_origin.svg (viewBox 0 0 10.08 10.08).
 */
export function LogoMark({ className, animateDraw = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 10.08 10.08"
      className={cn(animateDraw && 'logo-draw', className)}
      aria-hidden
      focusable="false"
    >
      <path
        d="M4.8,0H.46C.2,0,0,.2,0,.46v4.34c0,2.89,2.33,5.38,5.22,5.28,2.64-.09,4.76-2.22,4.85-4.86C10.18,2.33,7.69,0,4.8,0ZM5.04,6.99c-1.08,0-1.95-.87-1.95-1.95s.87-1.95,1.95-1.95,1.95.87,1.95,1.95-.87,1.95-1.95,1.95Z"
        fill="currentColor"
        {...(animateDraw
          ? { stroke: 'currentColor', strokeWidth: 0.16, pathLength: 100 }
          : {})}
      />
    </svg>
  )
}

type SignalBurstProps = {
  className?: string
  /** Joue un ping bref (2 impulsions) au montage — pour un état de succès. */
  pulse?: boolean
}

/**
 * Motif "signal" dérivé des trois pétales radiales du wordmark complet
 * (public/img/logo_origin_full.svg). Utilisé comme accent de confirmation
 * plutôt que caché dans 22px de footer.
 */
export function SignalBurst({ className, pulse = false }: SignalBurstProps) {
  const svg = (
    <svg viewBox="0 0 24 24" className={cn('relative text-primary', className)} aria-hidden focusable="false">
      <circle cx="12" cy="12" r="3.4" fill="currentColor" />
      {[90, 135, 180].map((angle) => (
        <rect
          key={angle}
          x="10.9"
          y="0.6"
          width="2.2"
          height="5.2"
          rx="1.1"
          fill="currentColor"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  )

  if (!pulse) return svg

  return (
    <span className={cn('relative inline-flex text-primary', className)}>
      <span className="signal-ping-ring" aria-hidden />
      <span className="signal-ping-ring [animation-delay:0.35s]" aria-hidden />
      {svg}
    </span>
  )
}
