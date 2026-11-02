import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'

export function AboutStorySection() {
  return (
    <section className="relative z-10 mb-24 lg:mb-40">
      <Reveal>
        <div className="flex max-w-2xl flex-col gap-6">
          <p className="text-lg leading-relaxed text-foreground/80">
            Nous sommes deux, à Genève. Quand vous nous écrivez, vous parlez à ceux qui écrivent le
            code.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80">
            Une PME n’a pas besoin d’une grande agence pour avoir un site rapide, un back-office
            propre et un hébergement fiable. Elle a besoin d’un cadrage honnête, d’un prix annoncé
            et d’un code qu’elle peut reprendre ailleurs.
          </p>
          <div className="mt-2">
            <Button asChild variant="outline" size="lg" className="border-border px-6 md:px-8">
              <Link href="/services">Voir les services et les prix</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
