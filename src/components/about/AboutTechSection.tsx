import React from 'react'

const STACK = [
  'Next.js',
  'NestJS',
  'Tailwind CSS',
  'TypeScript',
  'Python',
  'Payload CMS',
  'PostgreSQL',
] as const

export function AboutTechSection() {
  return (
    <section className="relative z-10 mb-12 md:mb-20">
      <div className="flex flex-wrap justify-center gap-3 md:justify-start md:gap-4">
        {STACK.map((name) => (
          <div
            key={name}
            className="cursor-default rounded-full border border-border px-5 py-2 text-[10px] font-bold tracking-[0.2em] text-foreground/45 uppercase transition-[transform,box-shadow,border-color,background-color,color] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/8 hover:text-foreground/95 hover:shadow-[0_8px_28px_-8px_oklch(0.56_0.23_272/0.35)]"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}
