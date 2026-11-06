import { getPayload } from 'payload'
import configPromise from '@payload-config'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

// Dynamic import pour réduire le bundle initial
const BlogClient = dynamic(
  () => import('@/components/blog/BlogClient').then((mod) => mod.BlogClient),
  { ssr: true }
)

// Pagination : chaque page de liste a son propre canonical (`/blog?page=2`),
// sinon la page 2 se déclarerait doublon de la page 1.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { page } = await searchParams
  const pageNumber = Number(page ?? 1)
  const path = Number.isInteger(pageNumber) && pageNumber > 1 ? `/blog?page=${pageNumber}` : '/blog'

  return buildPageMetadata({
    title: 'Journal web & e-commerce en Suisse | Origin Studio',
    description:
      "Articles sur la stratégie digitale, la technique et l'hébergement en Suisse, par l'équipe d'Origin Studio à Genève.",
    path,
  })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const payload = await getPayload({ config: configPromise })
  const currentPage = Number(page ?? 1)
  const limit = 7 // 1 featured + 3 cards + 3 cards

  const { docs: posts, totalPages } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    depth: 1,
    limit,
    page: currentPage,
    where: { _status: { equals: 'published' } },
  })

  return (
    <div className="blog-page relative mx-auto w-full max-w-360 overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <BlogClient
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}