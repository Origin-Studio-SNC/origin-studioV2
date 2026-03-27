import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

const services = [
  {
    num: '/01',
    title: 'Développement web sur mesure',
    desc: 'Applications web performantes et évolutives, développées selon vos besoins spécifiques.',
  },
  {
    num: '/02',
    title: 'Design & Expérience utilisateur',
    desc: "Interfaces intuitives et élégantes qui placent l'utilisateur au centre de l'expérience.",
  },
  {
    num: '/03',
    title: 'Intelligence artificielle & Automatisation',
    desc: "Intégration de l'IA et automatisation des processus pour optimiser votre activité.",
  },
  {
    num: '/04',
    title: 'Solutions sécurisées & infrastructures',
    desc: 'Infrastructure sécurisée, hébergement suisse et protection des données.',
  },
] as const

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="px-5 py-20 sm:px-6 md:py-28 lg:px-40 lg:py-[130px]"
    >
      <div className="mx-auto max-w-7xl">
        <p className="section-label mb-10 md:mb-16">Nos services</p>

        <div className="flex flex-col border-t border-border">
          {services.map((s) => (
            <div
              key={s.num}
              className="group relative flex flex-col justify-between border-b border-border px-4 py-8 transition-all duration-500 hover:bg-muted/30 sm:px-6 md:flex-row md:items-center md:px-8 md:py-12"
            >
              <div className="absolute bottom-0 left-0 top-0 w-0 bg-primary transition-all duration-500 group-hover:w-[3px]" />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                <span className="font-mono text-sm text-foreground/40">
                  {s.num}
                </span>
                <h3 className="text-xl font-light text-foreground/90 sm:text-2xl md:text-3xl">
                  {s.title}
                </h3>
              </div>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70 md:mt-0">
                {s.desc}
              </p>

              <ArrowUpRight
                weight="light"
                className="hidden size-6 text-foreground/20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground md:block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
