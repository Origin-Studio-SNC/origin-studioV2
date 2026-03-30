import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export function AboutStorySection() {
  const year = new Date().getFullYear()

  return (
    <section className="relative z-10 mb-24 grid grid-cols-1 items-center gap-16 lg:mb-40 lg:grid-cols-[60%_40%] lg:gap-20">
      <div className="flex flex-col gap-8">
        <p className="text-lg font-light leading-relaxed text-foreground/80">
          Fondé sur le principe de la précision helvétique, Origin Studio n&apos;est pas une agence
          comme les autres. Nous sommes un atelier de haute couture digitale. Chaque ligne de code,
          chaque interstice de design est pensé pour servir la performance et l&apos;image de marque
          de nos partenaires.
        </p>
        <p className="text-lg font-light leading-relaxed text-foreground/80">
          Pour nous, une PME suisse mérite la même excellence technologique qu&apos;une
          multinationale. C&apos;est pourquoi nous avons éliminé le superflu pour nous concentrer
          sur l&apos;essentiel : l&apos;impact.
        </p>
        <div className="mt-2">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-border px-6 text-[11px] font-medium uppercase tracking-[0.2em] md:px-8"
          >
            <Link href="/services">Découvrir nos services</Link>
          </Button>
        </div>
      </div>
      <div className="hidden justify-end lg:flex">
        <span
          className="select-none text-[clamp(5rem,14vw,10rem)] font-black leading-none text-foreground/[0.07]"
          aria-hidden
        >
          /{year}
        </span>
      </div>
    </section>
  )
}
