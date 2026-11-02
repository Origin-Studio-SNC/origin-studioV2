import { cn } from '@/lib/utils'

import type { ServiceOfferVisual } from './serviceOffersData'

/**
 * Visuels isométriques des offres de /services : mêmes blocs, même palette (papier, trois
 * gris chauds, un rouge) que la scène 3D de l'accueil. Statiques et décoratifs.
 */

type Tone = 'light' | 'red'
type Box = { x: number; y: number; z: number; w: number; d: number; h: number; tone?: Tone }

const U = 30
const K = Math.cos(Math.PI / 6)

/** Mêmes teintes que la palette de `AssemblyScene` (#ECEAE4, #D8D3C9, #B9B2A5, #DA291C). */
const FILL = {
  light: { top: '#ECE8DF', left: '#D3CCBF', right: '#B9B2A5' },
  red: { top: '#E8473C', left: '#DA291C', right: '#A91D13' },
} as const

function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * U * K, (x + y) * U * 0.5 - z * U]
}

function points(coords: [number, number, number][]) {
  return coords.map(([x, y, z]) => project(x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ')
}

function faces({ x, y, z, w, d, h }: Box) {
  return {
    top: points([
      [x, y, z + h],
      [x + w, y, z + h],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    left: points([
      [x, y + d, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    right: points([
      [x + w, y, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x + w, y, z + h],
    ]),
  }
}

const depth = (b: Box) => b.x + b.y + (b.w + b.d) / 2

const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.d && b.y < a.y + a.d

/**
 * Ordre de peinture : un bloc posé sur un autre passe après lui (même emprise, z plus haut) ;
 * sinon du fond vers l'avant.
 */
const paintOrder = (a: Box, b: Box) => (overlaps(a, b) ? a.z - b.z : depth(a) - depth(b))

const slab = (w: number, d: number): Box => ({ x: 0, y: 0, z: 0, w, d, h: 0.35 })

const SCENES: Record<ServiceOfferVisual, Box[]> = {
  /** Site : des pages dressées sur un socle. */
  wireframe: [
    slab(7, 5),
    { x: 0.8, y: 1.5, z: 0.35, w: 1.7, d: 0.25, h: 2.2 },
    { x: 3.0, y: 1.5, z: 0.35, w: 1.7, d: 0.25, h: 3.0 },
    { x: 5.2, y: 1.5, z: 0.35, w: 1.7, d: 0.25, h: 1.6 },
    { x: 1.6, y: 3.4, z: 0.35, w: 1.4, d: 0.25, h: 1.1 },
    { x: 4.0, y: 3.4, z: 0.35, w: 1.4, d: 0.25, h: 1.5 },
    { x: 3.6, y: 1.38, z: 3.35, w: 0.5, d: 0.5, h: 0.5, tone: 'red' },
  ],
  /** E-commerce : des caisses de hauteurs différentes, un article posé sur le tunnel d'achat. */
  commerce: [
    slab(7, 5),
    { x: 0.7, y: 1.0, z: 0.35, w: 1.6, d: 1.6, h: 1.3 },
    { x: 2.7, y: 1.0, z: 0.35, w: 1.6, d: 1.6, h: 2.0 },
    { x: 4.7, y: 1.0, z: 0.35, w: 1.6, d: 1.6, h: 1.6 },
    { x: 1.2, y: 3.2, z: 0.35, w: 3.4, d: 1.1, h: 0.18 },
    { x: 2.6, y: 3.45, z: 0.53, w: 0.6, d: 0.6, h: 0.6, tone: 'red' },
  ],
  /** Application : trois couches (données, logique, interface) et un escalier. */
  devices: [
    { x: 0.5, y: 0.5, z: 0, w: 5.5, d: 4, h: 0.5 },
    { x: 0.9, y: 0.7, z: 0.9, w: 4.7, d: 3.5, h: 0.5 },
    { x: 1.3, y: 0.9, z: 1.8, w: 3.9, d: 3, h: 0.5 },
    { x: 1.7, y: 1.6, z: 2.3, w: 0.9, d: 1.4, h: 0.3 },
    { x: 2.6, y: 1.6, z: 2.3, w: 0.9, d: 1.4, h: 0.6 },
    { x: 3.5, y: 1.6, z: 2.3, w: 0.9, d: 1.4, h: 0.9 },
    { x: 4.55, y: 2.0, z: 2.3, w: 0.55, d: 0.55, h: 0.55, tone: 'red' },
  ],
  /** Automatisation : une chaîne d'étapes reliées, la deuxième (l'IA) en rouge. */
  workflow: [
    { x: 0, y: 0.8, z: -0.25, w: 8.2, d: 3, h: 0.25 },
    { x: 0.4, y: 1.6, z: 0, w: 1.4, d: 1.4, h: 1.0 },
    { x: 1.8, y: 2.15, z: 0, w: 1.6, d: 0.3, h: 0.12 },
    { x: 3.4, y: 1.6, z: 0, w: 1.4, d: 1.4, h: 1.4, tone: 'red' },
    { x: 4.8, y: 2.15, z: 0, w: 1.6, d: 0.3, h: 0.12 },
    { x: 6.4, y: 1.6, z: 0, w: 1.4, d: 1.4, h: 1.9 },
  ],
}

function viewBoxOf(boxes: Box[]) {
  const xs: number[] = []
  const ys: number[] = []
  for (const b of boxes) {
    for (const x of [b.x, b.x + b.w]) {
      for (const y of [b.y, b.y + b.d]) {
        for (const z of [b.z, b.z + b.h]) {
          const [sx, sy] = project(x, y, z)
          xs.push(sx)
          ys.push(sy)
        }
      }
    }
  }
  const pad = 18
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  return `${minX.toFixed(0)} ${minY.toFixed(0)} ${(Math.max(...xs) + pad - minX).toFixed(0)} ${(
    Math.max(...ys) +
    pad -
    minY
  ).toFixed(0)}`
}

type Props = { variant: ServiceOfferVisual; className?: string }

export function IsoVisual({ variant, className }: Props) {
  const boxes = [...SCENES[variant]].sort(paintOrder)

  return (
    <div
      className={cn('flex aspect-4/3 w-full items-center justify-center md:aspect-auto md:min-h-70', className)}
      aria-hidden
    >
      <svg viewBox={viewBoxOf(boxes)} className="h-auto max-h-88 w-full" fill="none">
        <g stroke="#171714" strokeOpacity="0.14" strokeWidth="0.75" strokeLinejoin="round">
          {boxes.map((b, i) => {
            const f = faces(b)
            const fill = FILL[b.tone ?? 'light']
            return (
              <g key={i}>
                <polygon points={f.left} fill={fill.left} />
                <polygon points={f.right} fill={fill.right} />
                <polygon points={f.top} fill={fill.top} />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
