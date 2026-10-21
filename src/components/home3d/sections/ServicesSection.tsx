import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

/** Du haut vers le bas de la tour : `g` est l'étage allumé (0 = rez). */
const services = [
  {
    g: 4,
    title: 'Développement web sur mesure',
    floor: 'Étage 5',
    text: 'Applications web performantes et évolutives, construites selon vos besoins précis.',
  },
  {
    g: 3,
    title: 'Design et expérience utilisateur',
    floor: 'Étage 4',
    text: 'Des interfaces claires qui guident vos visiteurs sans effort.',
  },
  {
    g: 2,
    title: 'E-commerce',
    floor: 'Étage 3',
    text: 'Catalogue, paiements, commandes et back-office pour vendre en ligne sereinement.',
  },
  {
    g: 1,
    title: 'IA et automatisation',
    floor: 'Étage 2',
    text: "Automatiser les tâches répétitives et intégrer l'IA là où elle fait gagner du temps.",
  },
  {
    g: 0,
    title: 'Infrastructure et sécurité',
    floor: 'Étage 1',
    text: 'Hébergement suisse, maintenance et protection des données.',
  },
] as const

export function ServicesSection() {
  return (
    <SceneSection id="services" scene={1}>
      <span className="mono lbl">Plan B · La tour</span>
      <h2>Cinq métiers, un seul plan.</h2>
      <ul className="rows" data-hl="1">
        {services.map((s) => (
          <li key={s.g}>
            <SceneRow scene={1} g={s.g}>
              <strong>{s.title}</strong>
              <em>{s.floor}</em>
              <small>{s.text}</small>
            </SceneRow>
          </li>
        ))}
      </ul>
    </SceneSection>
  )
}
