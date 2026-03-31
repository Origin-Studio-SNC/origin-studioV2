export function ServicesHero() {
  return (
    <header className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <span
        className="reveal-on-load section-label mb-6 block max-w-none text-violet-100/50 md:mb-8"
        style={{ animationDelay: '0.06s' }}
      >
        Services
      </span>
      <h1
        className="reveal-on-load page-hero-title max-w-5xl wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        style={{ animationDelay: '0.16s' }}
      >
        On construit des sites qui <span className="text-primary">durent.</span>
      </h1>
      <p
        className="reveal-on-load mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg"
        style={{ animationDelay: '0.26s' }}
      >
        Architectures pensées pour durer, performances mesurables et déploiements sans surprise.
        Nous concevons des outils numériques qui portent les standards de demain — aujourd&apos;hui.
      </p>
    </header>
  )
}
