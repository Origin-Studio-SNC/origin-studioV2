import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import type { Post } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { Reveal } from '@/components/motion/Reveal'
import { formatDate } from '@/lib/utils'

const CATEGORY_LABELS: Record<Post['category'], string> = {
  strategie: 'Stratégie digitale',
  technique: 'Technique',
  'cas-clients': 'Cas clients',
  hebergement: 'Hébergement Suisse',
}

const CATEGORY_STYLES: Record<string, string> = {
  strategie: 'border-blue-500/30 bg-blue-500/20 text-blue-400',
  technique: 'border-green-500/30 bg-green-500/20 text-green-400',
  'cas-clients': 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
  hebergement: 'border-cyan-500/30 bg-cyan-500/20 text-cyan-400',
}

const getPublishedPostBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 200,
    where: { _status: { equals: 'published' } },
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPublishedPostBySlug(slug)
  if (!post) {
    return { title: 'Article introuvable' }
  }

  const desc = post.metaDescription ?? post.excerpt
  const ogImage =
    (post.metaImage && typeof post.metaImage === 'object'
      ? post.metaImage
      : null) ??
    (post.coverImage && typeof post.coverImage === 'object'
      ? post.coverImage
      : null)

  const imageUrl =
    ogImage && typeof ogImage.url === 'string' && ogImage.url.startsWith('http')
      ? ogImage.url
      : undefined

  return {
    title: `${post.title} | Origin Studio`,
    description: desc,
    openGraph: {
      title: post.title,
      description: desc ?? undefined,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const cover =
    post.coverImage && typeof post.coverImage === 'object'
      ? post.coverImage
      : null

  const author =
    post.author && typeof post.author === 'object' ? post.author : null

  const categoryStyle =
    CATEGORY_STYLES[post.category] ??
    'border-foreground/20 bg-foreground/10 text-foreground/70'

  return (
    <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(720px,85vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <article className="relative z-10 mx-auto max-w-3xl text-left">
        <Reveal>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Journal
          </Link>
        </Reveal>

        <Reveal delay={0.04}>
          <header className="mb-10">
            <p className="section-label mb-4">
              {formatDate(post.publishedAt)}
              {post.readingTime != null && post.readingTime > 0
                ? ` · ${post.readingTime} min de lecture`
                : ''}
            </p>
            <h1 className="mb-6 wrap-break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${categoryStyle}`}
              >
                {CATEGORY_LABELS[post.category]}
              </span>
              {author && (
                <span className="text-sm text-foreground/50">
                  Par {author.name}
                </span>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li key={t.id ?? t.tag}>
                    <span className="rounded-full border border-border bg-card/60 px-2.5 py-0.5 text-xs text-foreground/60">
                      {t.tag}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </header>
        </Reveal>

        {cover?.url && (
          <Reveal>
            <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-sm border border-border">
              <Image
                src={cover.url}
                alt={cover.alt ?? post.title}
                fill
                sizes="(max-width: 768px) 100vw, min(768px, 100vw)"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.06}>
          <div className="prose prose-invert prose-lg max-w-none wrap-break-words prose-pre:max-w-full prose-pre:overflow-x-auto">
            <RichText content={post.content} />
          </div>
        </Reveal>
      </article>
    </div>
  )
}
