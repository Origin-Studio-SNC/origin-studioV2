import { Euler, Matrix4, Quaternion, Vector3 } from 'three'

import { PLAN_NAMES } from './sceneStore'

/**
 * Les 7 structures isométriques de la page d'accueil, reprises telles quelles
 * de docs/refonte-3d/maquette.html. Chaque structure est une liste de boîtes
 * (matrice + teinte + groupe de survol) et un cadrage de caméra.
 */

/** Teintes, indices dans la palette de la scène. */
export const C = { light: 0, mid: 1, dark: 2, red: 3 } as const
export type Tone = (typeof C)[keyof typeof C]

export type Piece = {
  m: Matrix4
  c: Tone
  /** Groupe allumé par le survol d'une ligne de texte, -1 si aucun. */
  g: number
}

export type CameraFrame = {
  c: [number, number, number]
  size: number
  shift: number
}

export type Structure = {
  list: Piece[]
  cam: CameraFrame
  name: string
}

/** Aléatoire déterministe (mulberry32) : les structures sont identiques à chaque chargement. */
export function rng(seed: number): () => number {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Builder = {
  list: Piece[]
  tag: (g: number) => void
  group: (x: number, y: number, z: number, rx: number, ry: number, rz: number, fn: () => void) => void
  box: (x: number, y: number, z: number, w: number, h: number, d: number, c?: Tone) => void
  slab: (x: number, y: number, z: number, w: number, d: number, c?: Tone, t?: number) => void
  col: (x: number, y: number, z: number, h: number, c?: Tone, s?: number) => void
  stairs: (
    x: number,
    y: number,
    z: number,
    n: number,
    rise: number,
    run: number,
    width: number,
    axis?: 'x' | 'z',
    c?: Tone,
  ) => void
  frame: (x: number, y: number, z: number, w: number, h: number, ry?: number, c?: Tone, t?: number) => void
  floaters: (n: number, seed: number, rMin: number, rMax: number, cy?: number) => void
}

function builder(): Builder {
  const list: Piece[] = []
  const stack = [new Matrix4()]
  let tag = -1
  const top = () => stack[stack.length - 1]

  const box: Builder['box'] = (x, y, z, w, h, d, c = C.light) => {
    const m = new Matrix4().compose(new Vector3(x, y, z), new Quaternion(), new Vector3(w, h, d))
    list.push({ m: top().clone().multiply(m), c, g: tag })
  }

  const group: Builder['group'] = (x, y, z, rx, ry, rz, fn) => {
    const m = new Matrix4().compose(
      new Vector3(x, y, z),
      new Quaternion().setFromEuler(new Euler(rx, ry, rz)),
      new Vector3(1, 1, 1),
    )
    stack.push(top().clone().multiply(m))
    fn()
    stack.pop()
  }

  const b: Builder = {
    list,
    tag(g) {
      tag = g
    },
    group,
    box,
    slab: (x, y, z, w, d, c = C.light, t = 0.32) => box(x, y - t / 2, z, w, t, d, c),
    col: (x, y, z, h, c = C.light, s = 0.42) => box(x, y + h / 2, z, s, h, s, c),
    stairs: (x, y, z, n, rise, run, width, axis = 'x', c = C.mid) => {
      for (let i = 0; i < n; i++) {
        const h = rise * (i + 1)
        if (axis === 'x') box(x + run * i + run / 2, y + h / 2, z, run, h, width, c)
        else box(x, y + h / 2, z + run * i + run / 2, width, h, run, c)
      }
    },
    frame: (x, y, z, w, h, ry = 0, c = C.light, t = 0.38) =>
      group(x, y, z, 0, ry, 0, () => {
        box(-w / 2, h / 2, 0, t, h, t, c)
        box(w / 2, h / 2, 0, t, h, t, c)
        box(0, h + t / 2, 0, w + t, t, t, c)
      }),
    floaters: (n, seed, rMin, rMax, cy = 2) => {
      const r = rng(seed)
      for (let i = 0; i < n; i++) {
        const th = r() * Math.PI * 2,
          ph = (r() - 0.5) * 1.6,
          rad = rMin + r() * (rMax - rMin)
        const s = 0.3 + r() * 0.9
        // L'ordre des appels à r() est celui de la maquette : ne pas le réorganiser.
        box(
          Math.cos(th) * Math.cos(ph) * rad,
          cy + Math.sin(ph) * rad * 0.8,
          Math.sin(th) * Math.cos(ph) * rad,
          s,
          s * (r() < 0.3 ? 2.4 : 1),
          s,
          i === 3 ? C.red : r() < 0.5 ? C.light : C.mid,
        )
      }
    },
  }
  return b
}

/* A · Le palais : des sols dans tous les sens, une aile inversée, un couloir sans fin */
function palais(): Structure {
  const b = builder()
  b.slab(0, 0, 0, 6, 6, C.light)
  ;[
    [-2.5, -2.5],
    [2.5, -2.5],
    [-2.5, 2.5],
  ].forEach(([x, z]) => b.col(x, 0, z, 3, C.light))
  b.slab(-1, 3.3, -0.6, 4, 4.8, C.mid)
  b.stairs(-2.6, 0, 2.1, 8, 0.41, 0.5, 1.3, 'x', C.mid)
  b.frame(1.8, 0, -1, 1.8, 2.4, Math.PI / 2, C.red)
  b.slab(5.6, 5.2, -3.2, 3.6, 3.6, C.light)
  b.stairs(1.0, 3.3, -2.2, 7, 0.27, 0.55, 1.1, 'x', C.light)
  b.col(6.8, 5.2, -4.4, 2.6, C.mid)
  b.col(4.4, 5.2, -4.4, 2.6, C.mid)
  b.frame(5.6, 5.2, -2.0, 2, 2.6, 0, C.light)
  // aile inversée, suspendue au ciel
  b.group(-3.4, 12.2, -3, Math.PI, 0, 0, () => {
    b.slab(0, 0, 0, 5.2, 5.2, C.light)
    ;[
      [-2.2, -2.2],
      [2.2, -2.2],
      [-2.2, 2.2],
      [2.2, 2.2],
    ].forEach(([x, z]) => b.col(x, 0, z, 2.6, C.mid))
    b.stairs(-2, 0, 0, 6, 0.42, 0.55, 1.2, 'x', C.light)
    b.frame(1.2, 0, 1.2, 1.6, 2.3, 0, C.mid)
  })
  // un mur qui est aussi un sol
  b.group(-7.6, 4.2, 1.8, 0, 0, -Math.PI / 2, () => {
    b.slab(0, 0, 0, 6.4, 4, C.mid)
    b.stairs(-2.8, 0, 0, 6, 0.32, 0.6, 1.2, 'x', C.light)
    b.col(1.8, 0, 1.2, 2.2, C.light)
    b.frame(2, 0, -1, 1.4, 2, Math.PI / 2, C.light)
  })
  // couloir inférieur de cadres de portes
  b.slab(4.4, -3.4, 4.6, 3, 10, C.mid)
  for (let i = 0; i < 6; i++) b.frame(4.4, -3.4, 0.6 + i * 1.6, 2.2, 2.7, 0, i === 5 ? C.dark : C.light)
  b.group(2.6, -3.4, 0.2, 0, Math.PI / 2, 0, () => b.stairs(0, 0, 0, 7, 0.486, 0.42, 1.2, 'x', C.light))
  b.floaters(18, 11, 9, 15, 2)
  return { list: b.list, cam: { c: [0.6, 3.2, 0], size: 29, shift: 0.2 }, name: PLAN_NAMES[0] }
}

/* B · La tour : cinq étages, un par service */
function tour(): Structure {
  const b = builder()
  for (let i = 0; i < 5; i++) {
    b.tag(i)
    const y = i * 2.6,
      ox = i % 2 ? 0.7 : -0.7,
      oz = i % 2 ? -0.5 : 0.5
    b.slab(ox, y, oz, 5, 5, i % 2 ? C.mid : C.light)
    ;[
      [-2.1, -2.1],
      [2.1, -2.1],
      [-2.1, 2.1],
      [2.1, 2.1],
    ].forEach(([x, z]) => b.col(ox + x, y, oz + z, 2.28, C.light, 0.38))
    b.frame(ox + 0.6, y, oz + 2.1, 1.5, 1.9, 0, C.light, 0.28)
    b.box(ox - 0.9, y + 0.35, oz - 0.8, 1.4, 0.7, 0.9, C.dark)
    if (i < 4) {
      if (i % 2 === 0) b.stairs(ox + 2.6, y, oz - 1.8, 7, 0.37, 0.48, 1, 'z', C.mid)
      else b.group(ox - 2.6, y, oz + 1.8, 0, Math.PI, 0, () => b.stairs(0, 0, 0, 7, 0.37, 0.48, 1, 'z', C.mid))
    }
  }
  b.tag(-1)
  b.slab(0.7, 13.3, -0.5, 5.4, 5.4, C.light, 0.5)
  b.slab(0, -1.4, 0, 9, 9, C.mid, 0.6)
  b.floaters(14, 23, 8, 13, 6)
  return { list: b.list, cam: { c: [0, 6, 0], size: 25, shift: 0.22 }, name: PLAN_NAMES[1] }
}

/* C · Les trois piliers : un bloc plein, un porte-à-faux léger, un cadre ouvert */
function piliers(): Structure {
  const b = builder()
  b.tag(0)
  for (let x = 0; x < 3; x++)
    for (let y = 0; y < 3; y++)
      for (let z = 0; z < 3; z++)
        b.box(-6 + x * 1.02, 0.47 + y * 1.02, -1 + z * 1.02, 0.98, 0.98, 0.98, (x + y + z) % 2 ? C.light : C.mid)
  b.tag(1)
  b.col(0, 0, 0, 6.4, C.light, 0.32)
  for (let k = 0; k < 4; k++)
    b.group(0, 1.4 + k * 1.5, 0, 0, (k * Math.PI) / 2, 0, () => b.slab(1.2, 0, 0, 3, 0.9, C.light, 0.16))
  b.box(0, 0.25, 0, 1, 0.5, 1, C.mid)
  b.tag(2)
  const e = 3.2,
    t = 0.2,
    ox = 5.6,
    oy = 0.1,
    oz = 0
  for (const sy of [0, e]) {
    b.box(ox, oy + sy, oz - e / 2, e, t, t, C.light)
    b.box(ox, oy + sy, oz + e / 2, e, t, t, C.light)
    b.box(ox - e / 2, oy + sy, oz, t, t, e, C.light)
    b.box(ox + e / 2, oy + sy, oz, t, t, e, C.light)
  }
  for (const [dx, dz] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ])
    b.box(ox + (dx * e) / 2, oy + e / 2, oz + (dz * e) / 2, t, e, t, C.light)
  b.box(ox, oy + 1.1, oz, 1, 1, 1, C.dark)
  b.tag(-1)
  b.slab(0, 0, 0.2, 17, 6, C.mid, 0.5)
  b.floaters(16, 79, 9, 14, 2)
  return { list: b.list, cam: { c: [0, 2, 0], size: 21, shift: 0.22 }, name: PLAN_NAMES[2] }
}

/* D · Trois pièces : une pièce ouverte par projet */
function pieces(): Structure {
  const b = builder()
  const room = (g: number, x: number, y: number, z: number, ry: number, accent: boolean) => {
    b.tag(g)
    b.group(x, y, z, 0, ry, 0, () => {
      b.slab(0, 0, 0, 4.4, 4.4, C.light)
      b.box(0, 1.6, -2.05, 4.4, 3.2, 0.3, C.mid)
      b.box(-2.05, 1.6, 0.15, 0.3, 3.2, 4.1, C.light)
      b.slab(-0.5, 3.5, -0.5, 3.4, 3.4, C.light, 0.28)
      b.box(0.4, 0.42, -0.2, 1.8, 0.84, 0.9, C.dark)
      b.box(0.3, 1.9, -1.85, 1.8, 1.0, 0.08, accent ? C.red : C.dark)
      b.col(2, 0, 2, 3.2, C.light, 0.32)
      b.frame(-2.05, 0, 0.9, 1.2, 2.1, Math.PI / 2, C.light, 0.24)
    })
  }
  room(0, -6, 0, 0, 0, true)
  room(1, 0, 3, -2.5, 0, false)
  room(2, 6, -1.6, 1.5, 0, false)
  b.tag(-1)
  b.stairs(-3.6, 0, -1.2, 8, 0.375, 0.42, 1, 'x', C.mid)
  b.slab(3.4, 3, -2, 1.6, 1.4, C.mid)
  b.group(2.6, -1.6, -1.3, 0, 0, 0, () => {
    for (let i = 0; i < 6; i++) b.box(0.25 + i * 0.25, 4.3 - i * 0.77 - 0.385, 0, 0.25, 0.77, 1, C.mid)
  })
  b.floaters(20, 37, 10, 15, 1.5)
  return { list: b.list, cam: { c: [0, 1.5, -0.5], size: 25, shift: 0.22 }, name: PLAN_NAMES[3] }
}

/* E · L'escalier : quatre paliers, un par étape de la méthode */
function escalier(): Structure {
  const b = builder()
  for (let i = 0; i < 4; i++) {
    b.tag(i)
    const x = -6 + i * 4,
      y = -3 + i * 2.4,
      z = 2 - i * 1.3
    b.slab(x, y, z, 2.4, 2.4, C.light, 0.4)
    b.box(x, y - 0.4 - (y + 9) / 2, z, 1.1, y + 9, 1.1, C.mid)
    b.frame(x + 0.3, y, z - 0.6, 1.3, 2.1, 0, i === 3 ? C.red : C.light, 0.3)
    if (i < 3) {
      for (let s = 0; s < 6; s++) {
        const t = (s + 1) / 7
        b.box(x + 1.2 + t * 1.6, y + 0.2 + t * 2.4 - 0.2, z - t * 1.3, 0.3, 0.4, 1.1, C.mid)
      }
    }
  }
  b.tag(-1)
  b.slab(-1, -9.4, 0, 18, 7, C.mid, 0.5)
  b.floaters(18, 51, 9, 14, 0)
  return { list: b.list, cam: { c: [0, -0.5, 0], size: 25, shift: 0.22 }, name: PLAN_NAMES[4] }
}

/* F · La bibliothèque : un pupitre et sa pile de pages par article, un mur d'étagères derrière */
function bibliotheque(): Structure {
  const b = builder()
  const r = rng(88)
  ;[
    [-5.2, 0],
    [0, 1.2],
    [5.2, -0.4],
  ].forEach(([x, z], k) => {
    b.tag(k)
    const h = 1.6 + k * 0.5
    b.box(x, h / 2, z, 1.4, h, 1.4, C.mid)
    for (let i = 0; i < 9; i++)
      b.group(x, h + 0.07 + i * 0.13, z, 0, (r() - 0.5) * 0.5, 0, () =>
        b.box(0, 0, 0, 2.3, 0.1, 3, i === 8 ? C.light : i % 2 ? C.light : C.mid),
      )
  })
  b.tag(-1)
  b.box(0, 3, -4, 17, 6.4, 0.4, C.light)
  for (let row = 0; row < 3; row++) {
    b.box(0, 1.2 + row * 1.9, -3.5, 17, 0.14, 0.7, C.mid)
    let x = -8.2
    while (x < 8) {
      const w = 0.18 + r() * 0.22,
        hh = 0.9 + r() * 0.6
      if (r() > 0.2)
        b.box(
          x + w / 2,
          1.27 + row * 1.9 + hh / 2,
          -3.5,
          w,
          hh,
          0.55,
          r() < 0.06 ? C.red : r() < 0.5 ? C.light : C.dark,
        )
      x += w + 0.06 + (r() < 0.1 ? 0.8 : 0)
      if (x > 8) break
    }
  }
  b.slab(0, 0, -0.5, 17, 8, C.light, 0.5)
  b.floaters(10, 91, 10, 14, 3)
  return { list: b.list, cam: { c: [0, 2.4, -0.8], size: 21, shift: 0.22 }, name: PLAN_NAMES[5] }
}

/* G · Le seuil : une colonnade qui mène à une porte, des cadres qui s'enfoncent derrière */
function seuil(): Structure {
  const b = builder()
  b.slab(0, 0, 3, 9, 16, C.light, 0.5)
  b.tag(0)
  b.box(-1.65, 3.6, -3, 0.7, 7.2, 0.7, C.light)
  b.box(1.65, 3.6, -3, 0.7, 7.2, 0.7, C.light)
  b.box(0, 7.55, -3, 4.0, 0.7, 0.7, C.light)
  b.box(0, 0.1, -3, 2.6, 0.2, 0.9, C.red)
  b.tag(-1)
  for (let i = 1; i <= 5; i++) b.frame(0, 0, -3 - i * 1.7, 3.3, 7.2, 0, i % 2 ? C.mid : C.light, 0.5)
  b.slab(0, 0, -7.5, 4.6, 8, C.mid, 0.3)
  for (let i = 0; i < 6; i++) {
    b.col(-3.6, 0, -1 + i * 2.1, 5.4, C.light, 0.55)
    b.col(3.6, 0, -1 + i * 2.1, 5.4, C.light, 0.55)
  }
  for (let s = 0; s < 6; s++) b.box(0, -0.25 - s * 0.4, 11.1 + s * 0.5, 4.5, 0.4, 0.5, C.mid)
  b.floaters(16, 67, 10, 15, 3)
  return { list: b.list, cam: { c: [0, 2.2, 0.5], size: 26, shift: 0.22 }, name: PLAN_NAMES[6] }
}

/** Construit les 7 structures, dans l'ordre des sections `data-scene`. */
export function buildStructures(): Structure[] {
  return [palais(), tour(), piliers(), pieces(), escalier(), bibliotheque(), seuil()]
}
