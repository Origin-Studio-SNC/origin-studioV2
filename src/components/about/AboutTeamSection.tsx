import { LinkSimple } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

const TEAM = [
  {
    name: 'Elio',
    role: 'Lead Architect & Strategy',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkod9ju01zRwgxEzGDfYBbsgmt_QmMdhNpbQeqy1Qzgl4yL55211gP71f_EG7wm5HMOmjIp4O7o5iGXXK4b0YXT2yFsgqvkGmlNRPI70aN2TSPCsxQUSuvZsAO_ztapm8tmXsw8-spDMKHSj545JIqVnQM_M7Xpg8BiIWPLiyWGY0zqWU5UqEsa_-phKzFgbLazWsZuH13j8Vt-CynKm2c0bzonKsSDoCoHVSxTWK6ifjlo3e4T0RLaMe0kkphhsyhOhnHBv2wqQ',
    imageAlt: 'Portrait d’Elio, architecte web',
    tags: ['React', 'Next.js', 'System Design'],
    linkedIn: '#',
  },
  {
    name: 'Chadi',
    role: 'Creative Director & Brand',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaqzmFZLDXKyiu0nefxACe8xpcF-Wci9CFhctt_9i-G7znF4UPX_xrQs03AICII9gm1IHS0JGWx-NPLBQQ-QrzmZpzzEX5tkk1RPxONyZM0m3hQ5vCyESHn9ylGVDxJPRM7h8P2TQr8prnc1ZWm7icry7ev3YW4DXCfIiuaEDO7zOcJN3AOqnf-3JuW3Qtw5oCWNaK4L7BSdPvMX11BGtxrecXFOyGoUFBiipcRWuRJoINSvlbB5wiQFH4C0UbkBiLZyaKtuds_A',
    imageAlt: 'Portrait de Chadi, directeur créatif',
    tags: ['Visual Design', 'Branding', 'Motion'],
    linkedIn: '#',
  },
] as const

function TeamMemberCard({
  member,
}: {
  member: (typeof TEAM)[number]
}) {
  return (
    <div className="group relative flex flex-col gap-6 overflow-hidden border border-border bg-card/80 p-8 transition-colors duration-500 hover:bg-card md:p-10">
      <div className="absolute top-0 left-0 h-0 w-1 bg-primary transition-all duration-500 group-hover:h-full" />
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div>
        <h3 className="mb-2 text-2xl font-semibold tracking-tight">{member.name}</h3>
        <p className="mb-6 text-sm uppercase tracking-widest text-muted-foreground">{member.role}</p>
        <div className="mb-8 flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={member.linkedIn}
          className="flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-primary"
        >
          <LinkSimple className="size-[18px]" weight="regular" aria-hidden />
          LinkedIn
        </Link>
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {TEAM.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08}>
            <TeamMemberCard member={member} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
