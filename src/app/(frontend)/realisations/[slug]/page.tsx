import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { RichText } from '@/components/RichText'
import { Reveal } from '@/components/motion/Reveal'
import { normalizeExternalHref } from '@/lib/utils'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 100,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
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
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    depth: 2,
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  const thumbnail =
    project.thumbnail && typeof project.thumbnail === 'object'
      ? project.thumbnail
      : null

  const CATEGORY_LABELS: Record<string, string> = {
    vitrine: 'vitrine',
    application: 'application',
    refonte: 'refonte',
    ecommerce: 'e-commerce',
    'outil-interne': 'outil interne',
  }

  const categoryLabel = CATEGORY_LABELS[project.category ?? ''] ?? project.category

  const caseBlocks = [
    { title: 'Le défi', content: project.challenge, isResult: false },
    { title: 'La solution', content: project.solution, isResult: false },
    { title: 'Les résultats', content: project.results, isResult: true },
  ].flatMap((b) => (b.content ? [{ ...b, content: b.content }] : []))

  const liveHref = normalizeExternalHref(project.liveUrl ?? undefined)
  const githubHref = normalizeExternalHref(project.githubUrl ?? undefined)

  return (
    <div className="realisation-detail-page relative mx-auto w-full max-w-360 overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <main className="relative z-10 text-left">
      <div className="max-w-7xl text-left">

        {/* Back */}
        <Reveal>
          <Link
            href="/realisations"
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              {project.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className=" border border-primary/30 bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                {categoryLabel}
              </span>
              {project.badge === 'acces-anticipe' && (
                <span className="inline-flex items-center gap-1 border border-border/60 bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  🔒 Accès anticipé
                </span>
              )}
              {project.stack?.map((s) => (
                <span
                  key={s.tech}
                  className=" border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-wide text-foreground/70"
                >
                  {s.tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:items-end">
            {liveHref && (
              <a
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="case-btn case-btn--dark w-full sm:w-auto"
              >
                Voir en ligne
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
            {githubHref && (
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="case-btn case-btn--ghost w-full sm:w-auto"
              >
                Code sur GitHub
                <ArrowUpRight className="size-4" aria-hidden />
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
        {caseBlocks.length > 0 && (
          <div className="case-grid mb-20">
            {caseBlocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 0.12}>
                <article
                  className={`case-block${block.isResult ? ' case-block--result' : ''}`}
                >
                  <p className="case-block__idx">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="case-block__title">{block.title}</h2>
                  <div className="case-prose">
                    <RichText content={block.content} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* Content principal */}
        {project.content && (
          <Reveal>
            <div className="mb-20 min-w-0 max-w-3xl">
              <div className="post-prose">
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
                      <p className="absolute bottom-3 left-4 text-xs text-muted-foreground">
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
          <p className="mb-8 text-sm text-muted-foreground sm:text-base">
            Parlons-en — réponse sous 24h, devis gratuit.
          </p>
          <Link
            href="/contact"
            className="case-btn case-btn--dark mx-auto w-full max-w-xs sm:mx-0 sm:w-auto sm:max-w-none"
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