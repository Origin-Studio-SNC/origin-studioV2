import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Project } from '@/payload-types'

import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

const categoryLabels: Record<Project['category'], string> = {
  vitrine: 'Site vitrine',
  application: 'Application',
  refonte: 'Refonte',
  ecommerce: 'E-commerce',
  'outil-interne': 'Outil interne',
}

export async function RealisationsSection() {
  const payload = await getPayload({ config: configPromise })

  // Mêmes projets que l'ancienne home : mis en avant, publiés, dans l'ordre choisi.
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      and: [{ featured: { equals: true } }, { _status: { equals: 'published' } }],
    },
    sort: 'order',
    limit: 3,
    depth: 0,
    select: { title: true, slug: true, category: true, excerpt: true },
  })

  return (
    <SceneSection id="travaux" scene={3}>
      <span className="mono lbl">Plan D · Trois pièces</span>
      <h2>Trois projets, trois espaces.</h2>
      <ul className="rows" data-hl="3">
        {projects.map((project, g) => (
          <li key={project.id}>
            <SceneRow scene={3} g={g} href={`/realisations/${project.slug}`}>
              <strong>{project.title}</strong>
              <em>{categoryLabels[project.category]}</em>
              <small>{project.excerpt}</small>
            </SceneRow>
          </li>
        ))}
      </ul>
    </SceneSection>
  )
}
