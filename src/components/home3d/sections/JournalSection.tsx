import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Post } from '@/payload-types'

import { SceneRow } from './SceneRow'
import { SceneSection } from './SceneSection'

const categoryLabels: Record<Post['category'], string> = {
  strategie: 'Stratégie',
  technique: 'Technique',
  'cas-clients': 'Cas clients',
  hebergement: 'Hébergement',
}

const dateParts = new Intl.DateTimeFormat('fr-CH', {
  timeZone: 'Europe/Zurich',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

/** Date au format dd.mm.yyyy, quelle que soit la locale du serveur. */
function formatDate(iso: string) {
  const parts = dateParts.formatToParts(new Date(iso))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('day')}.${get('month')}.${get('year')}`
}

/**
 * Catégorie puis premier mot-clé, comme « Technique · CMS » dans la maquette.
 * Le mot-clé est omis s'il répète la catégorie (« Hébergement · Hébergement Suisse »).
 */
function topics(post: Pick<Post, 'category' | 'tags'>) {
  const category = categoryLabels[post.category]
  const tag = post.tags?.find((t) => !t.tag.toLowerCase().startsWith(category.toLowerCase()))?.tag
  return [category, tag].filter(Boolean).join(' · ')
}

export async function JournalSection() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 3,
    depth: 0,
    select: { title: true, slug: true, publishedAt: true, category: true, tags: true },
  })

  return (
    <SceneSection id="journal" scene={5}>
      <span className="mono lbl">Plan F · La bibliothèque</span>
      <h2>Ce que nous apprenons, nous l&apos;écrivons.</h2>
      <ul className="rows" data-hl="5">
        {posts.map((post, g) => (
          <li key={post.id}>
            <SceneRow scene={5} g={g} href={`/blog/${post.slug}`}>
              <strong>{post.title}</strong>
              <em>{post.publishedAt ? formatDate(post.publishedAt) : ''}</em>
              <small>{topics(post)}</small>
            </SceneRow>
          </li>
        ))}
      </ul>
      <Link className="btn ghost" href="/blog" style={{ alignSelf: 'flex-start' }}>
        Tous les articles
      </Link>
    </SceneSection>
  )
}
