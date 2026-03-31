import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogClient } from '@/components/blog/BlogClient'

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
    <div className="blog-page relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(720px,85vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <BlogClient
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}