import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Reveal } from '@/components/motion/Reveal'

const ResourcesSection = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
    where: {
      _status: { equals: 'published' },
    },
  })

  if (!posts.length) return null

  return (
    <section
      id="ressources"
      className="bg-muted/20 px-5 py-20 sm:px-6 md:py-28 lg:px-40 lg:py-[130px]"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="section-label mb-10 md:mb-16">Ressources</p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:items-center md:gap-8">
          {posts.map((post, index) => {
            const isFeatured = index === 1
            const coverImage =
              post.coverImage && typeof post.coverImage === 'object'
                ? post.coverImage
                : null

            const publishedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('fr-CH', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : ''

            return (
              <Reveal
                key={post.id}
                delay={index * 0.1}
                className="h-full min-h-0 min-w-0"
              >
              <Link
                href={`/blog/${post.slug}`}
                className={
                  isFeatured
                    ? 'group flex h-full min-h-0 flex-col overflow-hidden rounded-sm border border-primary/30 bg-card shadow-2xl shadow-primary/5 lg:-mt-12 lg:mb-12'
                    : 'group flex h-full min-h-0 flex-col overflow-hidden rounded-sm border border-border bg-card'
                }
              >
                <div className="aspect-video overflow-hidden">
                  {coverImage && (
                    <Image
                      src={coverImage.url ?? ''}
                      alt={coverImage.alt ?? post.title}
                      width={600}
                      height={340}
                      className={
                        isFeatured
                          ? 'h-full w-full object-cover transition-all duration-700 group-hover:scale-105'
                          : 'h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100'
                      }
                    />
                  )}
                </div>
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                      {publishedDate}
                    </span>
                    <span className="size-1 rounded-full bg-primary" />
                    <span className="text-[10px] uppercase tracking-widest text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="mb-4 text-xl font-light leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h4>
                  <p className="mb-6 line-clamp-2 text-sm text-foreground/55">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((t) => (
                      <span
                        key={t.tag}
                        className="rounded-full border border-border bg-background px-2 py-1 text-[9px] uppercase tracking-wide text-foreground/70"
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ResourcesSection