export function ContactHero() {
  return (
    <header className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <span
        className="reveal-on-load section-label mb-6 block max-w-none text-violet-100/50 md:mb-8"
        style={{ animationDelay: '0.06s' }}
      >
        Contact
      </span>
      <h1
        className="reveal-on-load page-hero-title max-w-5xl wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        style={{ animationDelay: '0.16s' }}
      >
        Un projet <span className="text-primary">en tête ?</span>
      </h1>
      <p
        className="reveal-on-load mt-8 max-w-2xl text-base font-light leading-relaxed text-violet-200 md:mt-10 md:text-lg"
        style={{ animationDelay: '0.26s' }}
      >
        Nous transformons des visions complexes en expériences numériques radicales. Échangeons sur
        votre prochaine révolution.
      </p>
    </header>
  )
}
