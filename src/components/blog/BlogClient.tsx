'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react'
import type { Post } from '@/payload-types'
import { formatDate } from '@/lib/utils'

const CATEGORIES = [
  { label: 'Tous', value: 'tous' },
  { label: 'Stratégie', value: 'strategie' },
  { label: 'Design UI/UX', value: 'design' },
  { label: 'Tech', value: 'technique' },
  { label: 'Marketing', value: 'marketing' },
] as const

const CATEGORY_COLORS: Record<string, string> = {
  strategie: 'text-blue-400',
  design: 'text-purple-400',
  technique: 'text-green-400',
  marketing: 'text-orange-400',
  'cas-clients': 'text-yellow-400',
  hebergement: 'text-cyan-400',
}

export function BlogClient({
  posts,
  currentPage,
  totalPages,
}: {
  posts: Post[]
  currentPage: number
  totalPages: number
}) {
  const [active, setActive] = useState('tous')

  const filtered =
    active === 'tous'
      ? posts
      : posts.filter((p) => p.category === active)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main className="relative z-10 text-left">
      <div className="max-w-7xl text-left">
        {/* Hero */}
        <header className="relative z-10 mb-16 md:mb-20 lg:mb-24">
        <p className="section-label mb-6 max-w-none text-violet-100/50 md:mb-8">
          RESSOURCES
        </p>
        <h1 className="page-hero-title mb-6 max-w-5xl text-4xl leading-tight sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
          Insights pour{' '}
          <span className="italic text-primary">PME</span>
          <br />
          <span className="text-foreground/20">ET STARTUPS</span>{' '}
          suisses.
        </h1>
        <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg">
          Stratégies de design, ingénierie produit et culture de
          l'excellence pour les bâtisseurs de l'écosystème helvétique.
        </p>
        </header>

        {/* Filtres */}
        <div className="mb-12 flex flex-wrap justify-start gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === cat.value
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-transparent text-foreground/60 hover:border-foreground/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 grid grid-cols-1 overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/50 md:grid-cols-2"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[420px]">
              <span className="absolute left-4 top-4 z-10 rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                À la une
              </span>
              {featured.coverImage &&
                typeof featured.coverImage === 'object' && (
                  <Image
                    src={featured.coverImage.url ?? ''}
                    alt={featured.coverImage.alt ?? featured.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="mb-4 text-[11px] uppercase tracking-widest text-foreground/40">
                {formatDate(featured.publishedAt)} /{' '}
                <span
                  className={
                    CATEGORY_COLORS[featured.category ?? ''] ??
                    'text-foreground/60'
                  }
                >
                  {featured.category}
                </span>
              </p>
              <h2 className="mb-4 text-2xl font-bold leading-snug transition-colors group-hover:text-primary md:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-8 line-clamp-3 text-sm text-foreground/55 leading-relaxed">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors group-hover:text-primary">
                Lire l'article
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* Grid articles */}
        {rest.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {rest.map((post, i) => (
              <ArticleCard key={post.id} post={post} index={i + 2} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border pt-8">
            <p className="text-sm text-foreground/40 uppercase tracking-widest">
              Page {String(currentPage).padStart(2, '0')} —{' '}
              {String(totalPages).padStart(2, '0')}
            </p>
            <div className="flex gap-6">
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="text-sm uppercase tracking-widest text-foreground/50 transition-colors hover:text-foreground"
                >
                  ← Précédent
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="text-sm uppercase tracking-widest text-foreground/50 transition-colors hover:text-foreground"
                >
                  Suivant →
                </Link>
              )}
            </div>
            <p className="hidden text-sm uppercase tracking-widest text-foreground/30 md:block">
              Origin Studio / Journal de bord
            </p>
          </div>
        )}

      </div>
    </main>
  )
}

function ArticleCard({ post, index }: { post: Post; index: number }) {
  const coverImage =
    post.coverImage && typeof post.coverImage === 'object'
      ? post.coverImage
      : null

  const categoryColor =
    CATEGORY_COLORS[post.category ?? ''] ?? 'text-foreground/60'

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/50"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage.url ?? ''}
            alt={coverImage.alt ?? post.title}
            fill
            className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
          />
        ) : (
          <div className="h-full w-full bg-card" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p
          className={`mb-3 text-[10px] font-semibold uppercase tracking-widest ${categoryColor}`}
        >
          {post.category}
        </p>
        <h3 className="mb-3 flex-1 text-base font-bold leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-xs text-foreground/50 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags?.slice(0, 2).map((t) => (
              <span
                key={t.tag}
                className="rounded-full border border-border px-2 py-0.5 text-[9px] uppercase tracking-wide text-foreground/50"
              >
                {t.tag}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-light text-foreground/30 uppercase tracking-widest">
            / {String(index).padStart(2, '0')}
          </span>
        </div>
      </div>
    </Link>
  )
}