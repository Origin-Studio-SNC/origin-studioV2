import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

const PLACEHOLDER = '/img/team-placeholder.png'

const TEAM = [
  {
    name: 'Chadi C.',
    role: 'Front-end & relation client',
    description:
      'Développement des interfaces utilisateur, compréhension des besoins clients et accompagnement humain à chaque étape du projet.',
    image: PLACEHOLDER,
    imageAlt: 'Portrait de Chadi C.',
  },
  {
    name: 'Eric T.',
    role: 'Back-end & infrastructure',
    description:
      'Architecture serveur, bases de données, organisation et gestion de l’infrastructure technique. Mise en place des environnements, sécurité et fiabilité pour des services stables en production.',
    image: PLACEHOLDER,
    imageAlt: 'Portrait d’Eric T.',
  },
] as const

function TeamMemberCard({
  member,
}: {
  member: (typeof TEAM)[number]
}) {
  return (
    <div className="group relative flex h-full min-h-0 flex-col gap-6 overflow-hidden border border-border bg-card/80 p-6 transition-colors duration-500 hover:bg-card sm:flex-row sm:items-stretch sm:gap-8 md:p-8">
      <div className="absolute top-0 left-0 z-10 h-0 w-1 bg-primary transition-all duration-500 group-hover:h-full" />
      <div className="relative mx-auto size-36 shrink-0 self-start overflow-hidden rounded-2xl border border-border bg-neutral-900 sm:mx-0 sm:size-40">
        <Image
          src={member.image}
          alt={member.imageAlt}
          width={160}
          height={160}
          className="size-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col text-center sm:text-left">
        <h3 className="mb-1 text-xl font-semibold tracking-tight md:text-2xl">{member.name}</h3>
        <p className="mb-4 text-sm italic text-muted-foreground">{member.role}</p>
        <p className="text-sm leading-relaxed text-foreground/80">{member.description}</p>
        <p className="mt-auto pt-5 text-xs text-foreground/45">
          <Link href="/contact" className="underline-offset-4 transition-colors hover:text-primary hover:underline">
            Nous écrire
          </Link>
          <span className="mx-2 text-foreground/25" aria-hidden>
            |
          </span>
          <a
            href="mailto:info@origin-studio.ch"
            className="underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            info@origin-studio.ch
          </a>
        </p>
      </div>
    </div>
  )
}

export function AboutTeamSection() {
  return (
    <section className="relative z-10 mb-24 lg:mb-40">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <span className="section-label mb-4 max-w-none text-violet-100/50">
            L&apos;équipe
          </span>
          <h2 className="wrap-break-words text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
            L&apos;esprit Studio.
          </h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
        {TEAM.map((member, i) => (
          <Reveal key={member.name} className="h-full min-h-0" delay={i * 0.08}>
            <TeamMemberCard member={member} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
