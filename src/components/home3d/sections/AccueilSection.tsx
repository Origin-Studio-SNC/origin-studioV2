import { SceneSection } from './SceneSection'

export function AccueilSection() {
  return (
    <SceneSection id="accueil" scene={0}>
      <span className="mono lbl">Agence web · Genève</span>
      <h1>Sites web et applications sur mesure, conçus à Genève.</h1>
      <p className="lead">
        Nous concevons et développons des sites, boutiques en ligne et applications pour les PME,
        les commerces et les professions libérales de Suisse romande. Chaque élément est pensé,
        taillé, puis assemblé avec précision.
      </p>
      <p className="mono hint">
        <b aria-hidden="true"></b>Chaque pièce trouve sa place.
      </p>
      <div className="cta">
        <a className="btn dark" href="#contact">
          Démarrer un projet <span aria-hidden="true">→</span>
        </a>
        <a className="btn ghost" href="#travaux">
          Nos réalisations
        </a>
      </div>
      <span className="mono hint">
        <b aria-hidden="true"></b>Faites défiler, l&apos;espace se reconfigure
      </span>
    </SceneSection>
  )
}
