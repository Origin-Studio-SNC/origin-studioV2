import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — Origin Studio',
  description: 'Informations légales relatives à Origin Studio, agence web basée à Genève.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <article className="relative z-10 mx-auto max-w-3xl text-left">
        <header className="mb-10">
          <p className="section-label mb-4">Informations légales</p>
          <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Mentions légales
          </h1>
        </header>

        <div className="space-y-10 text-base leading-relaxed text-foreground/70">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Éditeur du site</h2>
            <p>
              Origin Studio SNC
              <br />
              Chemin du Bois-Gentil 5, 1203 Genève, Suisse
              <br />
              IDE : CHE-357.084.912
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Contact</h2>
            <p>
              Email :{' '}
              <a href="mailto:info@origin-studio.ch" className="text-primary hover:underline">
                info@origin-studio.ch
              </a>
              <br />
              Téléphone :{' '}
              <a href="tel:+41791763992" className="text-primary hover:underline">
                +41 79 176 39 92
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logos, identité
              visuelle) est la propriété d&apos;Origin Studio SNC, sauf mention contraire, et ne peut
              être reproduit sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Responsabilité</h2>
            <p>
              Origin Studio SNC s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations diffusées sur ce site, sans garantie d&apos;exhaustivité. Origin Studio
              SNC ne saurait être tenue responsable des erreurs ou omissions, ni de l&apos;usage
              qui pourrait être fait de ces informations.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
