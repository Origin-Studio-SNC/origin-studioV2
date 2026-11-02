import { PROCESS_STEPS } from '@/lib/process-steps'

import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

export function MethodeSection() {
  return (
    <SceneSection id="methode" scene={4}>
      <h2>Une marche après l&apos;autre.</h2>
      <ol className="rows steps" data-hl="4">
        {PROCESS_STEPS.map((s, g) => (
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
