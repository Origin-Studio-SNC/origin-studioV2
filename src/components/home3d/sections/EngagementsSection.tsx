import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

/**
 * Chaque engagement reprend une affirmation déjà publiée ailleurs sur le site :
 * code livré (À propos), prix publiés (/services), hébergement et stack (FAQ).
 */
const engagements = [
  {
    title: 'Votre code vous appartient',
    text: 'Pas de cage propriétaire : vous restez libre de faire évoluer votre stack, ou de changer d’équipe.',
  },
  {
    title: 'Des prix publiés',
    text: 'Prix de départ, paliers et délais sont sur la page Services. Le devis fixe le périmètre avant tout engagement.',
  },
  {
    title: 'Des sites légers',
    text: 'Next.js, hébergement en Suisse ou en Europe selon le besoin. Un site rapide consomme aussi moins.',
  },
] as const

export function EngagementsSection() {
  return (
    <SceneSection id="engagements" scene={2}>
      <h2>Nos engagements.</h2>
      <ul className="rows pledges" data-hl="2">
        {engagements.map((e, g) => (
          <li key={e.title}>
            <SceneRow scene={2} g={g}>
              <strong>{e.title}</strong>
              <small>{e.text}</small>
            </SceneRow>
          </li>
        ))}
      </ul>
    </SceneSection>
  )
}
