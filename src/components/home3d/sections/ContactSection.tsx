import Link from 'next/link'

import { EMAIL, PHONE_DISPLAY, whatsappUrl } from '@/lib/contact'

import { CopyButton } from './CopyButton'
import { SceneContactForm } from './SceneContactForm'
import { SceneSection } from './SceneSection'

export function ContactSection() {
  return (
    <SceneSection id="contact" scene={6}>
      <span className="mono lbl">Plan G · Le seuil</span>
      <h2>La porte est ouverte.</h2>
      <p className="lead">
        Décrivez votre projet en quelques lignes. Nous revenons vers vous avec des questions
        précises, puis une proposition claire, sans coûts cachés.
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
            href={whatsappUrl("Bonjour Origin Studio, j'aimerais discuter d'un projet.")}
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
