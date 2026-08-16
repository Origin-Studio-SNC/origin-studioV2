import { LogoMark } from '@/components/LogoMark'

type Props = {
  initials: string
  className?: string
}

/**
 * Repli "sur marque" en l'absence de vraie photo d'équipe : un monogramme
 * plutôt qu'un placeholder générique. Reprend le glyphe et le dégradé du
 * hero pour rester dans la même grammaire visuelle.
 */
export function TeamAvatar({ initials, className }: Props) {
  return (
    <div className={`relative flex size-full items-center justify-center overflow-hidden bg-neutral-900 ${className ?? ''}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 70% at 30% 20%, oklch(0.52 0.2 275 / 0.22) 0%, transparent 60%),
            linear-gradient(155deg, oklch(0.1 0.02 270) 0%, oklch(0.05 0.02 270) 100%)
          `,
        }}
      />
      <LogoMark className="absolute top-10 right-10 h-20 w-20 text-primary/10" />
      <span className="relative font-serif text-4xl text-primary/85">{initials}</span>
    </div>
  )
}
