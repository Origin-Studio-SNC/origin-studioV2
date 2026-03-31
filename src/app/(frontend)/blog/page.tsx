import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogClient } from '@/components/blog/BlogClient'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const payload = await getPayload({ config: configPromise })
  const currentPage = Number(searchParams.page ?? 1)
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
    <BlogClient
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}