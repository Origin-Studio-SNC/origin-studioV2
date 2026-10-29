'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/payload-types'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { cn, normalizeExternalHref } from '@/lib/utils'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

const CATEGORIES = [
  { label: 'Tous', value: 'tous' },
  { label: 'Vitrine', value: 'vitrine' },
  { label: 'Application', value: 'application' },
  { label: 'Refonte', value: 'refonte' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Outil interne', value: 'outil-interne' },
] as const

const CATEGORY_LABELS: Record<string, string> = {
  vitrine: 'vitrine',
  application: 'application',
  refonte: 'refonte',
  ecommerce: 'e-commerce',
  'outil-interne': 'outil interne',
}

const STATS = [
  { label: 'Projets', value: '20+' },
  { label: 'À temps', value: '100%' },
  { label: 'Lighthouse', value: '95+' },
  { label: '', value: '🇨🇭' },
] as const

export function RealisationsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('tous')

  const filtered =
    active === 'tous'
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <main className="relative z-10 text-left">
      <div className="max-w-7xl text-left">
        {/* Hero */}
        <header className="relative z-10 mb-16 md:mb-20 lg:mb-24">
          <p
            className="reveal-on-load section-label mb-6 max-w-none text-mute md:mb-8"
            style={{ animationDelay: '0.06s' }}
          >
            Nos projets
          </p>
          <h1
            className="reveal-on-load page-hero-title mb-4 max-w-5xl wrap-break-words text-3xl leading-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            style={{ animationDelay: '0.16s' }}
          >
            Chaque projet,
            <br />
            <span className="text-primary">une obsession.</span>
          </h1>
          <p
            className="reveal-on-load mt-8 max-w-2xl text-base font-light leading-relaxed text-mute md:mt-10 md:text-lg"
            style={{ animationDelay: '0.26s' }}
          >
            Sites vitrines, applications, migrations — tous livrés à temps,
            tous hébergés en Suisse.
          </p>
        </header>

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
                  'h-auto shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:text-sm',
                  !isActive && 'text-muted-foreground hover:border-foreground/40',
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
              <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
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
        <p className="py-20 text-center text-muted-foreground">
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
              className="h-full min-h-0 w-full md:col-span-6"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row1[0]}
                className="h-full min-h-75 md:min-h-105"
              />
            </Reveal>
          )}
          {row1[1] && (
            <Reveal
              className="h-full min-h-0 w-full md:col-span-4"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row1[1]}
                className="h-full min-h-75 md:min-h-105"
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
              className="h-full min-h-0 w-full md:col-span-4"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row2[0]}
                className="h-full min-h-70 md:min-h-105"
              />  
            </Reveal>
          )}
          {row2[1] && (
            <Reveal
              className="h-full min-h-0 w-full md:col-span-6"
              delay={nextDelay()}
            >
              <ProjectCard
                project={row2[1]}
                className="h-full min-h-70 md:min-h-105"
              />
            </Reveal>
          )}
        </div>
      )}

      {/* Row 3+ */}
      {row3.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {row3.map((project) => (
            <Reveal
              key={project.id}
              className="h-full w-full"
              delay={nextDelay()}
            >
              <ProjectCard
                project={project}
                className="h-full min-h-75"
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

  const liveHref = normalizeExternalHref(project.liveUrl ?? undefined)

  return (
    <article
      className={cn(
        'group relative isolate block w-full overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-primary/50',
        className,
      )}
    >
      <Link
        href={`/realisations/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Voir le projet : ${project.title}`}
      />
      {thumbnail && (
        <Image
          src={thumbnail.url ?? ''}
          alt={thumbnail.alt ?? project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-background/30" />

      <div className="pointer-events-none absolute right-4 top-4 z-30 flex flex-col items-end gap-2">
        {liveHref && (
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Voir le site en ligne"
            className="pointer-events-auto inline-flex size-10 items-center justify-center border border-border bg-background/90 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 sm:h-auto sm:min-h-0 sm:w-auto sm:gap-1 sm:px-2.5 sm:py-1.5"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="sr-only">Voir en ligne</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wide sm:inline">
              En ligne
            </span>
            <ArrowUpRight className="size-4 shrink-0 sm:size-3" aria-hidden />
          </a>
        )}
        {project.badge === 'acces-anticipe' && (
          <span className="pointer-events-none inline-flex items-center gap-1 border border-border/60 bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
            🔒 Accès anticipé
          </span>
        )}
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-20 sm:top-4">
        <span className=" border border-primary/30 bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
          {CATEGORY_LABELS[project.category] ?? project.category}
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20">
        <p className="mb-2 text-xs text-muted-foreground">{project.client}</p>
        <h3 className="mb-3 wrap-break-words text-lg font-semibold leading-tight sm:text-xl md:text-2xl">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack?.slice(0, 3).map((s) => (
            <span
              key={s.tech}
              className=" border border-border bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground/70"
            >
              {s.tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}