import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { RichText } from '@/components/RichText'
import { Reveal } from '@/components/motion/Reveal'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 100,
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  const thumbnail =
    project.thumbnail && typeof project.thumbnail === 'object'
      ? project.thumbnail
      : null

  const CATEGORY_COLORS: Record<string, string> = {
    vitrine: 'border-blue-500/30 bg-blue-500/20 text-blue-400',
    application: 'border-green-500/30 bg-green-500/20 text-green-400',
    refonte: 'border-orange-500/30 bg-orange-500/20 text-orange-400',
    ecommerce: 'border-purple-500/30 bg-purple-500/20 text-purple-400',
    migration: 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
  }

  const categoryColor =
    CATEGORY_COLORS[project.category ?? ''] ??
    'border-foreground/20 bg-foreground/10 text-foreground/70'

  return (
    <div className="realisation-detail-page relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(720px,85vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <main className="relative z-10 text-left">
      <div className="max-w-7xl text-left">

        {/* Back */}
        <Reveal>
          <Link
            href="/realisations"
            className="mb-12 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Nos réalisations
          </Link>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.04}>
        <div className="mb-16 grid grid-cols-1 gap-10 min-w-0 sm:gap-12 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div className="min-w-0">
            <p className="section-label mb-6">
              {project.client} · {project.year}
            </p>
            <h1 className="mb-6 wrap-break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {project.title}
            </h1>
            <p className="mb-8 text-lg text-foreground/60 leading-relaxed">
              {project.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${categoryColor}`}>
                {project.category}
              </span>
              {project.stack?.map((s) => (
                <span
                  key={s.tech}
                  className="rounded-full border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-wide text-foreground/70"
                >
                  {s.tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:items-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
              >
                Voir le site
                <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/70 transition-colors hover:border-foreground/40 sm:w-auto sm:px-6"
              >
                GitHub
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
        </Reveal>

        {/* Cover image */}
        {thumbnail && (
          <Reveal>
          <div className="relative mb-20 aspect-video w-full overflow-hidden rounded-sm border border-border">
            <Image
              src={thumbnail.url ?? ''}
              alt={thumbnail.alt ?? project.title}
              fill
              sizes="(max-width: 1024px) 100vw, min(100vw, 1280px)"
              className="object-cover"
              priority
            />
          </div>
          </Reveal>
        )}

        {/* Challenge / Solution / Results */}
        {(project.challenge || project.solution || project.results) && (
          <Reveal>
          <div className="mb-20 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {[
              { label: '01 — Le défi', content: project.challenge },
              { label: '02 — La solution', content: project.solution },
              { label: '03 — Les résultats', content: project.results },
            ].map(
              (block) =>
                block.content && (
                  <div
                    key={block.label}
                    className="bg-background p-8 md:p-10"
                  >
                    <p className="section-label mb-6">{block.label}</p>
                    <div className="prose prose-invert prose-sm max-w-none text-foreground/70">
                      {/* RichText renderer — à adapter selon ton setup Payload */}
                      <RichText content={block.content} />
                    </div>
                  </div>
                ),
            )}
          </div>
          </Reveal>
        )}

        {/* Content principal */}
        {project.content && (
          <Reveal>
            <div className="mb-20 min-w-0 max-w-3xl">
              <div className="prose prose-invert prose-lg max-w-none wrap-break-words prose-pre:max-w-full prose-pre:overflow-x-auto">
                <RichText content={project.content} />
              </div>
            </div>
          </Reveal>
        )}

        {/* Galerie */}
        {project.gallery && project.gallery.length > 0 && (
          <Reveal>
          <div className="mb-20">
            <p className="section-label mb-10">Galerie</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(project.gallery ?? []).map((item, i) => {
                const img =
                  item.image && typeof item.image === 'object'
                    ? item.image
                    : null
                if (!img) return null
                return (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-sm border border-border"
                  >
                    <Image
                      src={img.url ?? ''}
                      alt={item.caption ?? img.alt ?? ''}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {item.caption && (
                      <p className="absolute bottom-3 left-4 text-xs text-foreground/50">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          </Reveal>
        )}

        {/* CTA bas de page */}
        <Reveal>
        <div className="border border-border bg-card/40 px-5 py-10 text-center sm:px-8 sm:py-12 md:p-16">
          <p className="section-label mb-4">Projet suivant</p>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Un projet similaire ?
          </h2>
          <p className="mb-8 text-sm text-foreground/55 sm:text-base">
            Parlons-en — réponse sous 24h, devis gratuit.
          </p>
          <Link
            href="/contact"
            className="mx-auto inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mx-0 sm:w-auto sm:max-w-none sm:px-8"
          >
            Démarrer un projet
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        </Reveal>

      </div>
      </main>
    </div>
  )
}