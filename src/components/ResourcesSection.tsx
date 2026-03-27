import Link from 'next/link'

type ResourcePost = {
  date: string
  category: string
  title: string
  excerpt: string
  tags: readonly string[]
  image: string
  imageAlt: string
  href: string
  featured?: boolean
}

const posts: ResourcePost[] = [
  {
    date: '12 Oct 2024',
    category: 'Performance',
    title: 'Pourquoi la vitesse de chargement est vitale en 2025.',
    excerpt:
      "Analyse de l'impact direct du Core Web Vitals sur votre taux de conversion e-commerce.",
    tags: ['SEO', 'Next.js'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_LmOBglfqKyxnTrb3csZ8mHr45vt7Iy9JqSJugHiQbwmQE5nIA1DMQqxaeya5XhglV-4U3EswKjayxiSjcwux9xEhZIe9aHY0mzGI6P1rzRNkip63VZexWlyM13yQjK2kY8GrETv8Wajo6zT8vpKjeZWTKPbmxsyfGITP9TM2qphKmhIrsSl9GMXt1Mqv1SBy3ol04NKHk06TFD66omKmQ5MQqc7vZzH_QNihBcWn-c0pZG_Q-flvIKOwMpy-M8Dlz1db4RCfTA',
    imageAlt: 'Espace de travail moderne avec ordinateur portable',
    href: '/blog',
  },
  {
    date: '05 Nov 2024',
    category: 'Stratégie',
    title: 'Le minimalisme : un atout stratégique pour votre marque.',
    excerpt:
      "Comment réduire le bruit visuel aide vos clients à se concentrer sur l'essentiel : votre message.",
    tags: ['UX Design', 'Branding'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvY5XioUb0166b6ghIkp5e3U3YdYTXX6KwnJVC9brwUene72FUtLPN16-KGFdo9vWTQ2KbmP1J9GFZQMXLTWUDn3bQJ6XHbOFO2WTwqApL9EOr4hLKz2XMFuiGIS_PfkZQ0RZjZfPspLo43kMmSN9rEjbY66ZYA856VXcJOGHBC8E0GpjllnMPVUTULA-MM7jREm0NkWQYVZQcvZsJQg5tHz8aZsXHq1zt3lDit2kl8O7cqH0mGxvjD6KFCYPIRQ6nheqv6WSuUA',
    imageAlt: 'Équipe en collaboration dans un bureau minimaliste',
    href: '/blog',
    featured: true,
  },
  {
    date: '28 Nov 2024',
    category: 'Technique',
    title: "L'essor du Headless CMS dans le web moderne.",
    excerpt:
      'Découvrez pourquoi nous avons abandonné WordPress pour des solutions plus agiles.',
    tags: ['CMS', 'API'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkZ7aGB3MSGLhhMA8D2FInBD2uP2EZCB7Gsu9bN0VEI7DkyaTEqRkb5MEb-PHPS8SwlK-_7g3vh5CI_XgAxSKOPyPwzTFffX0ub0hdlrwLe5WONYO9Z-8sNqKoe7im-lxpa6cr5hTHhVHm_iFF5AlTe2epJvDeGK7X52cWs6I6_-zqhCNx9NYfVsDrFDNADYU8rPJFqyKWY2wBy9duEGLy8ZfFcYUnhEmY5_uP0pwcte1lRT6IgHrlprBJ8MPIIKjTc87v2SKbrg',
    imageAlt: 'Écran affichant du code source propre',
    href: '/blog',
  },
]

const ResourcesSection = () => {
  return (
    <section id="ressources" className="bg-muted/20 px-6 py-[130px] lg:px-40">
      <div className="mx-auto max-w-7xl">
        <p className="section-label mb-16">Ressources</p>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className={
                post.featured
                  ? 'group overflow-hidden rounded-sm border border-primary/30 bg-card shadow-2xl shadow-primary/5 md:-mt-12 md:mb-12'
                  : 'group overflow-hidden rounded-sm border border-border bg-card'
              }
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className={
                    post.featured
                      ? 'h-full w-full object-cover transition-all duration-700 group-hover:scale-105'
                      : 'h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100'
                  }
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                    {post.date}
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
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-2 py-1 text-[9px] uppercase tracking-wide text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResourcesSection
