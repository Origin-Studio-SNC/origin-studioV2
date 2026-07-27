import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Origin Studio',
  description:
    'Comment Origin Studio collecte, utilise et protège vos données personnelles.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <article className="relative z-10 mx-auto max-w-3xl text-left">
        <header className="mb-10">
          <p className="section-label mb-4">Informations légales</p>
          <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="text-sm text-foreground/50">Dernière mise à jour : juillet 2026</p>
        </header>

        <div className="space-y-10 text-base leading-relaxed text-foreground/70">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Responsable du traitement</h2>
            <p>
              Origin Studio SNC, Chemin du Bois-Gentil 5, 1203 Genève, Suisse (IDE :
              CHE-357.084.912) est responsable du traitement des données décrites ci-dessous.
              Pour toute question, contactez-nous à{' '}
              <a href="mailto:info@origin-studio.ch" className="text-primary hover:underline">
                info@origin-studio.ch
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Données collectées</h2>
            <p>
              Lorsque vous utilisez le formulaire de contact, nous recevons votre nom, votre
              email, le type de projet, le budget estimé et le message que vous rédigez. Ces
              informations sont transmises par email via notre prestataire d&apos;envoi{' '}
              <strong>Resend</strong> (à info@origin-studio.ch, avec une copie de confirmation
              envoyée à votre propre adresse) et <strong>ne sont pas stockées dans une base de
              données</strong>. Elles restent uniquement dans notre messagerie professionnelle,
              le temps nécessaire au traitement de votre demande et à la relation qui peut en
              découler.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Cookies et mesure d&apos;audience</h2>
            <p>
              Ce site n&apos;utilise aucun cookie de suivi publicitaire ou d&apos;identification.
              Nous utilisons Vercel Analytics et Vercel Speed Insights pour mesurer la
              fréquentation et les performances du site : ces outils fonctionnent sans cookie et
              sans identifiant persistant, et ne permettent pas de vous identifier
              individuellement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Hébergement et sous-traitants</h2>
            <p>
              Le site est hébergé par Vercel Inc. (États-Unis). Les envois d&apos;emails du
              formulaire de contact transitent par Resend (États-Unis). Ces prestataires
              n&apos;interviennent que techniquement et ne sont pas autorisés à utiliser vos
              données à d&apos;autres fins.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Vos droits</h2>
            <p>
              Conformément à la loi fédérale suisse sur la protection des données (LPD) et, le
              cas échéant, au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
              et de suppression des données vous concernant. Pour exercer ce droit, écrivez-nous
              à{' '}
              <a href="mailto:info@origin-studio.ch" className="text-primary hover:underline">
                info@origin-studio.ch
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Sécurité</h2>
            <p>
              Les données transmises via le formulaire de contact sont échappées et validées
              côté serveur avant tout traitement, et un système de limitation de fréquence
              protège le formulaire contre les abus. Le site est servi exclusivement en HTTPS.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Modifications</h2>
            <p>
              Cette politique peut être mise à jour pour refléter l&apos;évolution du site ou de
              la réglementation. La date de dernière mise à jour figure en haut de cette page.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
