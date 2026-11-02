'use client'

import { useEffect, useRef, useState } from 'react'
import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Euler,
  HemisphereLight,
  InstancedMesh,
  MathUtils,
  MeshStandardMaterial,
  Object3D,
  OrthographicCamera,
  PCFShadowMap,
  Quaternion,
  Scene,
  SRGBColorSpace,
  DynamicDrawUsage,
  Vector3,
  WebGLRenderer,
} from 'three'

import { sceneStore } from './sceneStore'
import { buildStructures, rng, type CameraFrame } from './structures'

/**
 * Scène isométrique plein écran de la page d'accueil (docs/refonte-3d/maquette.html).
 * Un seul InstancedMesh de boîtes : à chaque frontière de section `data-scene`,
 * l'architecture se disperse puis se réassemble dans la structure suivante.
 *
 * Chargée via `HomeScene` (next/dynamic, ssr: false). Si WebGL n'est pas
 * disponible, rien n'est rendu et la page reste lisible sur fond papier.
 */

type Target = {
  p: Vector3
  q: Quaternion
  s: Vector3
  c: Color
  g: number
  on: boolean
}

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const eout = (t: number) => 1 - Math.pow(1 - t, 4)
const smooth = (t: number) => t * t * (3 - 2 * t)

function shuffle<T>(arr: T[], seed: number) {
  const r = rng(seed)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function AssemblyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true })
    } catch {
      setFailed(true)
      return
    }

    const mobile = window.innerWidth < 860
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75))
    renderer.shadowMap.enabled = true
    // PCFSoftShadowMap a été retiré de three (r18x) : PCFShadowMap est désormais filtré en doux.
    renderer.shadowMap.type = PCFShadowMap
    renderer.outputColorSpace = SRGBColorSpace

    const scene = new Scene()
    scene.background = new Color('#F1EFEA')

    /* lumière : ciel doux + un soleil bas pour de longues ombres architecturales */
    const sky = new HemisphereLight('#ffffff', '#c9c3b6', mobile ? 1.55 : 1.2)
    /*
     * Faux « ciel occlus » : une lumière douce, verticale, qui projette ses propres ombres.
     * Elle assombrit le dessous des dalles et les creux entre les pièces, comme une occlusion
     * ambiante, sans passe de post-traitement. Désactivée sur mobile pour économiser le GPU.
     */
    const occ = new DirectionalLight('#fffaf2', mobile ? 0 : 0.75)
    if (!mobile) {
      occ.castShadow = true
      occ.shadow.mapSize.set(1024, 1024)
      const oc = occ.shadow.camera
      oc.left = -24
      oc.right = 24
      oc.top = 24
      oc.bottom = -24
      oc.near = 1
      oc.far = 90
      occ.shadow.bias = -0.0008
      occ.shadow.normalBias = 0.03
      occ.shadow.radius = 4
    }
    const sun = new DirectionalLight('#fff6ea', 2.1)
    sun.castShadow = true
    sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048)
    const sc = sun.shadow.camera
    sc.left = -24
    sc.right = 24
    sc.top = 24
    sc.bottom = -24
    sc.near = 1
    sc.far = 90
    sun.shadow.bias = -0.0006
    sun.shadow.normalBias = 0.02
    scene.add(sky, sun, sun.target, occ, occ.target)

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 400)

    /* ---------- réserve de boîtes et cibles par structure ---------- */
    const configs = buildStructures()
    const N = Math.max(...configs.map((c) => c.list.length)) + 8
    const R = rng(2026)
    const cardinal: [number, number, number][] = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ]
    const boxDir: [number, number, number][] = []
    const boxDelay: number[] = []
    const boxDist: number[] = []
    /* Teinte propre à chaque bloc (±3,5 %) : casse l'aplat sans changer la palette.
       Générateur séparé de `R` pour ne pas modifier la chorégraphie existante. */
    const RT = rng(77)
    const boxTint = Array.from({ length: N }, () => 1 + (RT() - 0.5) * 0.07)
    for (let i = 0; i < N; i++) {
      boxDir.push(cardinal[Math.floor(R() * 6)])
      boxDelay.push(R() * 0.42)
      boxDist.push(5 + R() * 9)
    }

    const palette = [
      new Color('#ECEAE4'),
      new Color('#D8D3C9'),
      new Color('#B9B2A5'),
      new Color('#DA291C'),
    ]
    const RED = palette[3]

    const targets: Target[][] = configs.map((cfg, ci) => {
      const slots = shuffle([...Array(N).keys()], 100 + ci)
      const T = new Array<Target>(N)
      for (let k = 0; k < N; k++) {
        const i = slots[k]
        if (k < cfg.list.length) {
          const p = new Vector3(),
            q = new Quaternion(),
            s = new Vector3()
          cfg.list[k].m.decompose(p, q, s)
          T[i] = { p, q, s, c: palette[cfg.list[k].c], g: cfg.list[k].g, on: true }
        } else {
          const d = boxDir[i]
          T[i] = {
            p: new Vector3(d[0] * 48, d[1] * 48 + 2, d[2] * 48),
            q: new Quaternion(),
            s: new Vector3(0.001, 0.001, 0.001),
            c: palette[0],
            g: -1,
            on: false,
          }
        }
      }
      return T
    })

    /*
     * Retard d'arrivée par structure : une vague qui part du centre de la structure et gagne
     * l'extérieur (plus un peu de hasard), au lieu d'un retard purement aléatoire. Le résultat
     * se lit comme un assemblage. Les blocs inutilisés gardent leur retard aléatoire.
     */
    const RW = rng(404)
    const waveDelay: number[][] = targets.map((T) => {
      const live = T.filter((t) => t.on)
      const center = new Vector3()
      live.forEach((t) => center.add(t.p))
      center.divideScalar(Math.max(1, live.length))
      const dist = T.map((t) => (t.on ? t.p.distanceTo(center) : 0))
      const max = Math.max(1e-6, ...dist)
      return T.map((t, i) => (t.on ? (dist[i] / max) * 0.34 + RW() * 0.08 : boxDelay[i]))
    })

    /* intro : chaque pièce du plan A part de loin sur un axe, tournée d'un quart */
    const scatter: Target[] = targets[0].map((t, i) => {
      const d = boxDir[i],
        k = 26 + boxDist[i] * 1.5
      const turn = new Quaternion().setFromEuler(
        new Euler(
          (i % 3 === 0 ? 1 : 0) * (Math.PI / 2),
          (i % 3 === 1 ? 1 : 0) * (Math.PI / 2),
          (i % 3 === 2 ? 1 : 0) * (Math.PI / 2),
        ),
      )
      return {
        p: t.p.clone().add(new Vector3(d[0] * k, d[1] * k, d[2] * k)),
        q: t.q.clone().multiply(turn),
        s: t.s.clone(),
        c: t.c,
        g: -1,
        on: t.on,
      }
    })

    /* ---------- mesh instancié ---------- */
    const geo = new BoxGeometry(1, 1, 1)
    const mat = new MeshStandardMaterial({ color: '#ffffff', roughness: 0.86, metalness: 0 })

    /*
     * Arêtes biseautées, sans changer la géométrie : un bloc étiré (dalle de 12 unités sur 0,3)
     * déformerait un vrai biseau. Le shader lit donc la taille réelle de chaque instance et
     * incline la normale près des arêtes sur une largeur constante en unités monde, comme un
     * chanfrein qui accroche la lumière. Les axes de la boîte restent alignés sur ses faces, la
     * normale se calcule sans matrice inverse.
     */
    mat.onBeforeCompile = (shader) => {
      const varyings = `
varying vec3 vLocal;
varying vec3 vSize;
varying vec3 vAx0;
varying vec3 vAx1;
varying vec3 vAx2;`
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>${varyings}`)
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
vLocal = position;
mat4 bevelM = modelViewMatrix;
vSize = vec3(1.0);
#ifdef USE_INSTANCING
  bevelM = modelViewMatrix * instanceMatrix;
  vSize = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
#endif
vAx0 = normalize(bevelM[0].xyz);
vAx1 = normalize(bevelM[1].xyz);
vAx2 = normalize(bevelM[2].xyz);`,
        )
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>${varyings}`)
        .replace(
          '#include <normal_fragment_begin>',
          `#include <normal_fragment_begin>
{
  vec3 bp = vLocal * vSize;
  vec3 bd = 0.5 * vSize - abs(bp);
  float fx = step(bd.x, bd.y) * step(bd.x, bd.z);
  float fy = (1.0 - fx) * step(bd.y, bd.z);
  float fz = 1.0 - fx - fy;
  vec3 de = bd + vec3(fx, fy, fz) * 1000.0;
  float ex = step(de.x, de.y) * step(de.x, de.z);
  float ey = (1.0 - ex) * step(de.y, de.z);
  float ez = 1.0 - ex - ey;
  float edge = min(de.x, min(de.y, de.z));
  float width = min(0.06, 0.4 * min(vSize.x, min(vSize.y, vSize.z)));
  float bw = 1.0 - smoothstep(0.0, width, edge);
  vec3 tilt = sign(bp.x) * ex * vAx0 + sign(bp.y) * ey * vAx1 + sign(bp.z) * ez * vAx2;
  normal = normalize(normal + tilt * bw * 1.2);
  diffuseColor.rgb *= 1.0 + 0.05 * bw;
}`,
        )
    }
    mat.customProgramCacheKey = () => 'origin-iso-bevel-v1'

    const mesh = new InstancedMesh(geo, mat, N)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.instanceMatrix.setUsage(DynamicDrawUsage)
    mesh.frustumCulled = false
    for (let i = 0; i < N; i++) mesh.setColorAt(i, palette[0])
    scene.add(mesh)

    /* ---------- scroll → structure ---------- */
    let sections: HTMLElement[] = []
    const collectSections = () => {
      sections = [...document.querySelectorAll<HTMLElement>('[data-scene]')].sort(
        (a, b) => Number(a.dataset.scene) - Number(b.dataset.scene),
      )
    }
    let targetF = 0,
      F = 0
    const readScroll = () => {
      if (sections.length < configs.length) collectSections()
      if (!sections.length) return
      const y = window.scrollY + window.innerHeight * 0.5,
        w = window.innerHeight * 0.42
      // Position absolue dans la page (offsetTop dépend du parent positionné).
      const tops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY)
      let f = 0
      for (let k = sections.length - 1; k >= 0; k--)
        if (y >= tops[k]) {
          f = k
          break
        }
      for (let k = 1; k < sections.length; k++) {
        const d = y - tops[k]
        if (Math.abs(d) < w) {
          f = k - 1 + (d + w) / (2 * w)
          break
        }
      }
      f = Math.min(f, configs.length - 1)
      targetF = reduce ? Math.round(f) : f
    }

    /* ---------- caméra ---------- */
    let mx = 0,
      my = 0,
      smx = 0,
      smy = 0
    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
    }
    const camC = new Vector3(),
      camTmp = new Vector3()
    const placeCamera = (cA: CameraFrame, cB: CameraFrame, u: number, time: number) => {
      const narrow = window.innerWidth < 860
      const size = MathUtils.lerp(cA.size, cB.size, u) * (narrow ? 1.25 : 1)
      const shift = narrow ? 0 : MathUtils.lerp(cA.shift, cB.shift, u)
      camC.set(...cA.c).lerp(camTmp.set(...cB.c), u)
      if (narrow) camC.y -= 3
      const aspect = window.innerWidth / window.innerHeight,
        hh = size / 2,
        hw = hh * aspect,
        off = shift * 2 * hw
      camera.left = -hw - off
      camera.right = hw - off
      camera.top = hh
      camera.bottom = -hh
      camera.updateProjectionMatrix()
      const az = Math.PI / 4 + (reduce ? 0 : Math.sin(time * 0.00012) * 0.12 + smx * 0.22)
      const el = 0.6 + (reduce ? 0 : smy * 0.1)
      camera.position.set(
        camC.x + Math.cos(az) * Math.cos(el) * 80,
        camC.y + Math.sin(el) * 80,
        camC.z + Math.sin(az) * Math.cos(el) * 80,
      )
      camera.lookAt(camC)
      sun.position.set(camC.x + 14, camC.y + 26, camC.z + 6)
      sun.target.position.copy(camC)
      // Presque à la verticale, mais pas pile : `lookAt` dégénère quand la direction est parallèle à « haut ».
      occ.position.set(camC.x + 1.5, camC.y + 30, camC.z + 1)
      occ.target.position.copy(camC)
    }

    /* ---------- boucle de rendu ---------- */
    const hlAmt = new Float32Array(N)
    const dummy = new Object3D(),
      pTmp = new Vector3(),
      qTmp = new Quaternion(),
      sTmp = new Vector3(),
      col = new Color()
    let t0 = 0
    let raf = 0
    let disposed = false

    const frame = (now: number) => {
      const intro = reduce ? 1 : clamp((now - t0 - 250) / 3400)
      F += (targetF - F) * (reduce ? 1 : 0.075)
      if (Math.abs(targetF - F) < 0.0005) F = targetF
      smx += (mx - smx) * 0.04
      smy += (my - smy) * 0.04

      let a = Math.floor(F),
        t = F - a
      if (a >= configs.length - 1) {
        a = configs.length - 2
        t = 1
      }
      let A = targets[a],
        B = targets[a + 1]
      let gt = t
      if (intro < 1 && F < 0.02) {
        A = scatter
        B = targets[0]
        gt = intro
      }

      const settled = (gt < 0.004 || gt > 0.996) && intro >= 1
      const cur = gt > 0.5 ? (A === scatter ? 0 : a + 1) : a
      const tgtCfg = cur === a ? A : B
      // Indice de la structure d'arrivée, pour lire son retard de vague.
      const bIdx = A === scatter ? 0 : a + 1
      // Formulaire envoyé : le portail du plan G reste allumé.
      const hs =
        sceneStore.isSent() && cur === configs.length - 1
          ? { scene: cur, g: 0 }
          : sceneStore.getHighlight()

      for (let i = 0; i < N; i++) {
        const ta = A[i],
          tb = B[i]
        const lt = clamp((gt - waveDelay[bIdx][i]) / 0.58)
        const d = boxDir[i],
          dist = boxDist[i]
        if (lt < 0.62) {
          const u = eio(lt / 0.62)
          pTmp.set(tb.p.x + d[0] * dist, tb.p.y + d[1] * dist, tb.p.z + d[2] * dist)
          pTmp.lerpVectors(ta.p, pTmp, u)
          qTmp.slerpQuaternions(ta.q, tb.q, u)
          sTmp.lerpVectors(ta.s, tb.s, Math.min(1, u * 1.3))
        } else {
          const u = eout((lt - 0.62) / 0.38)
          pTmp.set(tb.p.x + d[0] * dist, tb.p.y + d[1] * dist, tb.p.z + d[2] * dist).lerp(tb.p, u)
          qTmp.copy(tb.q)
          sTmp.copy(tb.s)
        }
        dummy.position.copy(pTmp)
        dummy.quaternion.copy(qTmp)
        dummy.scale.copy(sTmp)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)

        const want = settled && hs.scene === cur && tgtCfg[i].g === hs.g && hs.g >= 0 ? 1 : 0
        hlAmt[i] += (want - hlAmt[i]) * 0.12
        col
          .copy(ta.c)
          .lerp(tb.c, clamp(lt * 1.5))
          .multiplyScalar(boxTint[i])
        if (hlAmt[i] > 0.002) col.lerp(RED, hlAmt[i] * 0.85)
        mesh.setColorAt(i, col)
      }
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

      placeCamera(
        configs[a].cam,
        configs[Math.min(a + 1, configs.length - 1)].cam,
        smooth(A === scatter ? 0 : t),
        now,
      )
      renderer.render(scene, camera)

      sceneStore.setActive(Math.round(F))
      raf = requestAnimationFrame(frame)
    }

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      collectSections()
      readScroll()
    }

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    resize()
    F = targetF

    // Shaders compilés en arrière-plan (KHR_parallel_shader_compile quand il existe) :
    // la première image ne bloque pas le thread principal. L'intro part ensuite.
    const start = () => {
      if (disposed) return
      t0 = performance.now()
      raf = requestAnimationFrame(frame)
    }
    renderer.compileAsync(scene, camera).then(start, start)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      scene.remove(mesh, sky, sun, sun.target, occ, occ.target)
      mesh.dispose()
      geo.dispose()
      mat.dispose()
      sun.dispose()
      occ.dispose()
      sky.dispose()
      renderer.dispose()
      sceneStore.reset()
    }
  }, [])

  if (failed) return null

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 block h-full w-full" />
  )
}
