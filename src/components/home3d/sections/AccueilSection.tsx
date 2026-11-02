import { ScrollCue } from './ScrollCue'
import { SceneSection } from './SceneSection'

export function AccueilSection() {
  return (
    <>
      <SceneSection id="accueil" scene={0}>
        <h1>On construit votre présence en ligne, pièce par pièce.</h1>
        <p className="lead">
          Agence web à Genève. Deux développeurs réalisent vos sites, boutiques en ligne,
          applications métier et automatisations, pour les PME de Suisse romande.
        </p>
        <p className="hint">
          <b aria-hidden="true"></b>Réponse sous 24 h. Devis gratuit.
        </p>
        <div className="cta">
          <a className="btn dark" href="#contact">
            Démarrer un projet <span aria-hidden="true">→</span>
          </a>
          <a className="btn ghost" href="#travaux">
            Nos réalisations
          </a>
        </div>
      </SceneSection>
      <ScrollCue />
    </>
  )
}
