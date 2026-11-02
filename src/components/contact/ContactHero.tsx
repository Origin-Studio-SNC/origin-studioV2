export function ContactHero() {
  return (
    <header className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <h1
        className="reveal-on-load page-hero-title max-w-5xl wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        style={{ animationDelay: '0.1s' }}
      >
        Parlez-nous de votre projet.
      </h1>
      <p
        className="reveal-on-load mt-8 max-w-2xl text-base leading-relaxed text-mute md:mt-10 md:text-lg"
        style={{ animationDelay: '0.2s' }}
      >
        Décrivez votre besoin en quelques lignes. Nous répondons sous 24 h.
      </p>
    </header>
  )
}
