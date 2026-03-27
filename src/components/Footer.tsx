import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from '@phosphor-icons/react/dist/ssr'

const menuLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#realisations', label: 'Projets' },
  { href: '/#about', label: 'Agence' },
  { href: '/blog', label: 'Journal' },
] as const

const socialLinks = [
  { href: 'https://www.linkedin.com/company/origin-studio-swiss', label: 'LinkedIn' },
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: '/mentions-legales', label: 'Mentions légales' },
] as const

const Footer = () => {
  return (
    <footer className="border-t border-border px-5 pb-10 pt-20 sm:px-6 md:pb-12 md:pt-28 lg:px-40 lg:pt-[130px]">
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-10 md:mb-24 md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:gap-12 lg:gap-x-12">

        <div className="md:col-span-5">
          <Image
            src="/img/logo_origin_full.svg"
            alt="Origin Studio"
            width={120}
            height={120}
            className="mb-5"
          />
          <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
            Nous créons des outils numériques pour les entreprises qui exigent la
            perfection technique et l&apos;élégance visuelle.
          </p>
        </div>

        <nav
          className="flex flex-col gap-3 md:col-span-3 md:pt-1"
          aria-label="Pied de page"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/45">
            Menu
          </p>
          {menuLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="w-fit text-sm text-foreground/70 transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="md:col-span-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/45">
            Contact &amp; localisation
          </p>
          <a
            href="mailto:info@origin-studio.ch"
            className="block text-lg leading-snug text-foreground transition-colors hover:text-primary"
          >
            info@origin-studio.ch
          </a>

          <div className="relative mt-6 pl-7">
            <MapPin
              weight="regular"
              className="pointer-events-none absolute left-0 top-[0.22em] size-4.5 text-primary"
              aria-hidden
            />
            <address className="not-italic text-sm leading-relaxed text-foreground/70">
              Chemin du Bois-Gentil 5
              <br />
              1203 Genève, Suisse
            </address>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
        <p className="text-center text-[10px] uppercase tracking-widest text-foreground/40 md:text-left">
          © {new Date().getFullYear()} Origin Studio · Genève, Suisse 🇨🇭
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:justify-end">
          {socialLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[10px] uppercase tracking-widest text-foreground/40 transition-opacity hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
