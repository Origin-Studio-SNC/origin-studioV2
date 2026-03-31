import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { RichText } from '@/components/RichText'

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
    <main className="px-5 py-20 sm:px-6 lg:px-40 lg:py-[130px]">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          href="/realisations"
          className="mb-12 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Nos réalisations
        </Link>

        {/* Hero */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="section-label mb-6">
              {project.client} · {project.year}
            </p>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
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
          <div className="flex flex-col gap-4 lg:items-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground/70 transition-colors hover:border-foreground/40"
              >
                GitHub
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Cover image */}
        {thumbnail && (
          <div className="relative mb-20 aspect-video w-full overflow-hidden rounded-sm border border-border">
            <Image
              src={thumbnail.url ?? ''}
              alt={thumbnail.alt ?? project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Challenge / Solution / Results */}
        {(project.challenge || project.solution || project.results) && (
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
        )}

        {/* Content principal */}
        {project.content && (
          <div className="mb-20 mx-auto max-w-3xl">
            <div className="prose prose-invert prose-lg max-w-none">
              <RichText content={project.content} />
            </div>
          </div>
        )}

        {/* Galerie */}
        {project.gallery && project.gallery.length > 0 && (
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
        )}

        {/* CTA bas de page */}
        <div className="border border-border bg-card/40 p-10 md:p-16 text-center">
          <p className="section-label mb-4">Projet suivant</p>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Un projet similaire ?
          </h2>
          <p className="mb-8 text-foreground/55">
            Parlons-en — réponse sous 24h, devis gratuit.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Démarrer un projet
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

      </div>
    </main>
  )
}