import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

const engagements = [
  {
    title: 'Qualité suisse',
    shape: 'Le bloc',
    text: 'Une rigueur obsessionnelle dans chaque ligne de code et chaque pixel dessiné.',
  },
  {
    title: 'Éco-conception',
    shape: 'Le porte-à-faux',
    text: "Des sites légers et rapides, à l'empreinte carbone réduite, sans rien sacrifier au design.",
  },
  {
    title: 'Transparence',
    shape: 'Le cadre ouvert',
    text: 'Pas de coûts cachés, pas de jargon technique inutile. Vous comprenez ce que vous payez.',
  },
] as const

export function EngagementsSection() {
  return (
    <SceneSection id="engagements" scene={2}>
      <span className="mono lbl">Plan C · Les trois piliers</span>
      <h2>Trois engagements, sans exception.</h2>
      <ul className="rows" data-hl="2">
        {engagements.map((e, g) => (
          <li key={e.title}>
            <SceneRow scene={2} g={g}>
              <strong>{e.title}</strong>
              <em>{e.shape}</em>
              <small>{e.text}</small>
            </SceneRow>
          </li>
        ))}
      </ul>
    </SceneSection>
  )
}
