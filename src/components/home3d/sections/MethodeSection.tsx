import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

const steps = [
  {
    title: 'Prise de contact',
    text: 'Un échange pour comprendre vos objectifs, vos contraintes et votre budget.',
  },
  {
    title: 'Conception',
    text: 'Architecture technique, parcours et maquettes, validés avec vous avant le code.',
  },
  {
    title: 'Développement',
    text: 'Le site prend forme par jalons, avec des points réguliers pour ajuster.',
  },
  {
    title: 'Mise en ligne',
    text: 'Lancement, suivi et maintenance. Nous restons là après le jour J.',
  },
] as const

export function MethodeSection() {
  return (
    <SceneSection id="methode" scene={4}>
      <span className="mono lbl">Plan E · L&apos;escalier</span>
      <h2>Une marche après l&apos;autre.</h2>
      <ol className="rows steps" data-hl="4">
        {steps.map((s, g) => (
          <li key={s.title}>
            <SceneRow scene={4} g={g}>
              <strong>{s.title}</strong>
              <small>{s.text}</small>
            </SceneRow>
          </li>
        ))}
      </ol>
    </SceneSection>
  )
}
