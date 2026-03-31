'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/payload-types'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const CATEGORIES = [
  { label: 'Tous', value: 'tous' },
  { label: 'Vitrine', value: 'vitrine' },
  { label: 'Application', value: 'application' },
  { label: 'Refonte', value: 'refonte' },
  { label: 'E-commerce', value: 'ecommerce' },
] as const

const CATEGORY_COLORS: Record<string, string> = {
  vitrine: 'border-blue-500/30 bg-blue-500/20 text-blue-400',
  application: 'border-green-500/30 bg-green-500/20 text-green-400',
  refonte: 'border-orange-500/30 bg-orange-500/20 text-orange-400',
  ecommerce: 'border-purple-500/30 bg-purple-500/20 text-purple-400',
  migration: 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
}

const STATS = [
  { label: 'Projets', value: '50+' },
  { label: 'À temps', value: '100%' },
  { label: 'Lighthouse', value: '95+' },
  { label: '', value: '🇨🇭' },
] as const

export function RealisationsClient({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState('tous')

  const itemHidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
  const itemShow = reduced
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : { opacity: 1, y: 0, transition: { duration: 0.5, ease } }

  const filtered =
    active === 'tous'
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <main className="relative z-10 text-left">
      <div className="max-w-7xl text-left">
        {/* Hero */}
        <motion.header
          className="relative z-10 mb-16 md:mb-20 lg:mb-24"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduced ? 0 : 0.1,
                delayChildren: reduced ? 0 : 0.06,
              },
            },
          }}
        >
          <motion.p
            className="section-label mb-6 max-w-none text-violet-100/50 md:mb-8"
            variants={{ hidden: itemHidden, show: itemShow }}
          >
            Nos projets
          </motion.p>
          <motion.h1
            className="page-hero-title mb-4 max-w-5xl wrap-break-words text-3xl leading-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            variants={{ hidden: itemHidden, show: itemShow }}
          >
            Chaque projet,
            <br />
            <span className="text-primary italic">une obsession.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg"
            variants={{ hidden: itemHidden, show: itemShow }}
          >
            Sites vitrines, applications, migrations — tous livrés à temps,
            tous hébergés en Suisse.
          </motion.p>
        </motion.header>

        {/* Filtres */}
        <Reveal>
        <div className="mb-10 flex flex-wrap justify-start gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.value
            return (
              <Button
                key={cat.value}
                type="button"
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActive(cat.value)}
                className={cn(
                  'h-auto shrink-0 rounded-full px-3 py-1.5 text-xs sm:px-4 sm:text-sm',
                  !isActive && 'text-foreground/60 hover:border-foreground/40',
                )}
              >
                {cat.label}
              </Button>
            )
          })}
        </div>
        </Reveal>

        {/* Bento Grid */}
        <BentoGrid projects={filtered} />

        {/* Stats */}
        <Reveal>
        <div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border border-border bg-card/50 p-6 md:p-8"
            >
              <p className="mb-2 text-[10px] uppercase tracking-widest text-foreground/50">
                {s.label}
              </p>
              <p className="text-3xl font-light">{s.value}</p>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </main>
  )
}

function BentoGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <Reveal>
        <p className="py-20 text-center text-foreground/40">
          Aucun projet dans cette catégorie.
        </p>
      </Reveal>
    )
  }

  // Reproduit le layout de la maquette :
  // Row 1 : 2 cards (60/40)
  // Row 2 : 2 cards (40/60)
  // Row 3 : 3 cards égales
  const row1 = projects.slice(0, 2)
  const row2 = projects.slice(2, 4)
  const row3 = projects.slice(4)

  let cardIndex = 0
  const nextDelay = () => (cardIndex++) * 0.07

  return (
    <div className="space-y-4">
      {/* Row 1 */}
      {row1.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
          {row1[0] && (
            <Reveal
              className="min-h-0 md:col-span-6"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row1[0]}
                className="h-full min-h-[300px] md:min-h-[420px]"
              />
            </Reveal>
          )}
          {row1[1] && (
            <Reveal
              className="min-h-0 md:col-span-4"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row1[1]}
                className="h-full min-h-[300px] md:min-h-[420px]"
              />
            </Reveal>
          )}
        </div>
      )}

      {/* Row 2 */}
      {row2.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
          {row2[0] && (
            <Reveal
              className="min-h-0 md:col-span-4"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row2[0]}
                className="h-full min-h-[280px] md:min-h-[380px]"
              />
            </Reveal>
          )}
          {row2[1] && (
            <Reveal
              className="min-h-0 md:col-span-6"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row2[1]}
                className="h-full min-h-[280px] md:min-h-[380px]"
              />
            </Reveal>
          )}
        </div>
      )}

      {/* Row 3+ */}
      {row3.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {row3.map((project) => (
            <Reveal key={project.id} delay={nextDelay()}>
              <ProjectCard
                project={project}
                className="h-full min-h-[300px]"
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const thumbnail =
    project.thumbnail && typeof project.thumbnail === 'object'
      ? project.thumbnail
      : null

  const categoryColor =
    CATEGORY_COLORS[project.category ?? ''] ??
    'border-foreground/20 bg-foreground/10 text-foreground/70'

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className={`group relative overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-primary/50 ${className}`}
    >
      {thumbnail && (
        <Image
          src={thumbnail.url ?? ''}
          alt={thumbnail.alt ?? project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

      <div className="absolute left-4 top-4">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${categoryColor}`}
        >
          {project.category}
        </span>
      </div>

      <div className="absolute bottom-5 left-5 right-5">
        <p className="mb-2 text-xs text-foreground/50">{project.client}</p>
        <h3 className="mb-3 wrap-break-words text-lg font-semibold leading-tight sm:text-xl md:text-2xl">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack?.slice(0, 3).map((s) => (
            <span
              key={s.tech}
              className="rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground/70"
            >
              {s.tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}