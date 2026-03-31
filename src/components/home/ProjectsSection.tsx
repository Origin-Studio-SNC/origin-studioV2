import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'

const stats = [
  { label: 'Projets livrés', value: '50+' },
  { label: 'Note Google', value: '5.0' },
  { label: 'Performance', value: '95+' },
  { label: 'Cafés bus', value: '∞' },
] as const

const ProjectsSection = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'order',
    limit: 3,
    depth: 1,
  })

  const featured = projects[0]
  const secondary = projects.slice(1, 3)

  if (!featured) return null

  return (
    <section
      id="realisations"
      className="bg-muted/30 px-5 py-20 sm:px-6 md:py-28 lg:px-40 lg:py-[130px]"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="section-label mb-10 md:mb-16">Projets</p>
        </Reveal>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-10">
          {/* Featured */}
          <Reveal className="min-h-0 md:col-span-6">
          <article className="group relative aspect-4/3 h-full min-h-[280px] overflow-hidden rounded-sm border border-border bg-card md:aspect-auto md:min-h-[520px]">
            {featured.thumbnail && typeof featured.thumbnail === 'object' && (
              <Image
                src={featured.thumbnail.url ?? ''}
                alt={featured.thumbnail.alt ?? featured.title}
                fill
                className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                {featured.category}
              </span>
              <h4 className="text-2xl font-light sm:text-3xl">{featured.title}</h4>
            </div>
          </article>
          </Reveal>

          {/* Secondary stack */}
          <div className="flex min-h-0 flex-col gap-6 md:col-span-4">
            {secondary.map((project, i) => (
              <Reveal key={project.id} delay={0.08 * (i + 1)}>
              <article
                className="group relative h-[300px] overflow-hidden rounded-sm border border-border bg-card"
              >
                {project.thumbnail && typeof project.thumbnail === 'object' && (
                  <Image
                    src={project.thumbnail.url ?? ''}
                    alt={project.thumbnail.alt ?? project.title}
                    fill
                    className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <span className="mb-3 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/70">
                    {project.category}
                  </span>
                  <h4 className="text-xl font-light">{project.title}</h4>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-20 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
            <div className="border border-border bg-card/50 p-4 sm:p-6 md:p-8">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-foreground/50">
                {s.label}
              </p>
              <p className="text-3xl font-light">{s.value}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
