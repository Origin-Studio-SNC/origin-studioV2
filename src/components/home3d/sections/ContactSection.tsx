import Link from 'next/link'

import { EMAIL, PHONE_DISPLAY, whatsappMessageFor, whatsappUrl } from '@/lib/contact'

import { CopyButton } from './CopyButton'
import { SceneContactForm } from './SceneContactForm'
import { SceneSection } from './SceneSection'

export function ContactSection() {
  return (
    <SceneSection id="contact" scene={6}>
      <h2>Racontez-nous votre projet.</h2>
      <p className="lead">
        Quelques lignes suffisent. Nous répondons sous 24 h avec des questions précises, puis une
        proposition chiffrée.
      </p>
      <SceneContactForm />
      <div className="contact">
        <div className="cline">
          <span className="v" id="mail">
            {EMAIL}
          </span>
          <CopyButton target="mail" />
        </div>
        <div className="cline">
          <span className="v" id="tel">
            {PHONE_DISPLAY}
          </span>
          <CopyButton target="tel" />
          <a
            className="mono"
            href={whatsappUrl(whatsappMessageFor())}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <footer className="mono">
        <span>© 2026 Origin Studio</span>
        <span>Genève, Suisse</span>
        <Link href="/about">À propos</Link>
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/politique-de-confidentialite">Confidentialité</Link>
      </footer>
    </SceneSection>
  )
}
