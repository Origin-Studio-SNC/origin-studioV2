import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const baseUrl = 'https://www.origin-studio.ch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: posts }, { docs: projects }] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 200,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      limit: 100,
      select: { slug: true, updatedAt: true },
    }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/realisations`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/politique-de-confidentialite`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? undefined,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/realisations/${project.slug}`,
    lastModified: project.updatedAt ?? undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...projectRoutes]
}
