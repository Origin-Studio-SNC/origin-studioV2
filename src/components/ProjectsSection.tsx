const projects = {
  featured: {
    tag: 'E-Commerce Luxury',
    title: 'Villa Collection',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLy6fHHC-B39sCe1cxYBatDKv7GHY0vdVM07rm2rQZ1EhNleUwxBskcUwyWnloZsXB5xtk1DTJhpJXfgM8PF9Y4BRk5bDM_l8Sw4ulZnxBOCEIj4AjnMA54sRqqrZUC_lHLc3U0Mur1fTxkhidgCggRI37xekNYWLIwH0kip7nydfl-OFpwhh1Q4XWXUW6-E94bjar5orRXGtCRt2qXal059jBh0LFFEmmZZI8R6MrK35JwySMpkNkNZWHLxol2KYsETxpVnRe1A',
    alt: 'Site e-commerce luxe — Villa Collection',
  },
  secondary: [
    {
      tag: 'Fintech',
      title: 'Swiss Capital Partners',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAhpp1Mh5Cdrc5ISTQDkCKShfklF-QVyxI67-TdSFFfHucUucPv1Jm309HK0KYUjA0hdcEJ2-iAsGV5ChtgMG-xG-0oe65qAOUgWJ5hfdii8uchuaAYywBQnvKUkbINokjjczpLwZoOYNWLisF2tJq0JSRps09hwTy5yXONQrB9y__iGNUds3nKdy049ukzFIy-1_4lNEBjGKfSmLdbIDm2Et5aXkoMMQzY7b-olghbNSLDYyykyS-rmzXD5c-kiU9fOv6ydTJBLQ',
      alt: 'Interface dashboard corporate minimaliste',
    },
    {
      tag: 'SaaS',
      title: 'Nova Analytics',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAxT9ETD6ngdhp6sAPhVmZqSusaoRoqMExMISft9NYjqyUjdg8roOxkYVH3pFDLzyP88iWtx0uc5pz8_fLXciqVUlVNLoehE8bwMM9bqLko8fChAIBX-xYd5nZ01fA43f52anMoORCexGQ44Plry509I-O8mkgE7_LHoD4cdGdeXsHbzACT0DhtNNMDdk3wQEutvsNhJW5y2xNWD0Ty4SnU_4LqO9LRcR5EzBrNT7p6RIsTXWU15eVYkcL3Egyqvqs9gg6cNEHfxQ',
      alt: 'Branding et identité pour une startup tech',
    },
  ],
} as const

const stats = [
  { label: 'Projets livrés', value: '120+' },
  { label: 'Note Google', value: '5.0' },
  { label: 'Performance', value: '98%' },
  { label: 'Cafés bus', value: '∞' },
] as const

const ProjectsSection = () => {
  const { featured, secondary } = projects

  return (
    <section
      id="realisations"
      className="bg-muted/30 px-5 py-20 sm:px-6 md:py-28 lg:px-40 lg:py-[130px]"
    >
      <div className="mx-auto max-w-7xl">
        <p className="section-label mb-10 md:mb-16">Projets</p>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-10">
          {/* Featured */}
          <article className="group relative aspect-4/3 overflow-hidden rounded-sm border border-border bg-card md:col-span-6 md:aspect-auto md:min-h-[520px]">
            <img
              src={featured.image}
              alt={featured.alt}
              className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                {featured.tag}
              </span>
              <h4 className="text-2xl font-light sm:text-3xl">{featured.title}</h4>
            </div>
          </article>

          {/* Secondary stack */}
          <div className="flex flex-col gap-6 md:col-span-4">
            {secondary.map((p) => (
              <article
                key={p.title}
                className="group relative h-[300px] overflow-hidden rounded-sm border border-border bg-card"
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <span className="mb-3 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/70">
                    {p.tag}
                  </span>
                  <h4 className="text-xl font-light">{p.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-20 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border border-border bg-card/50 p-4 sm:p-6 md:p-8"
            >
              <p className="mb-2 text-[10px] uppercase tracking-widest text-foreground/50">
                {s.label}
              </p>
              <p className="text-3xl font-light">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
