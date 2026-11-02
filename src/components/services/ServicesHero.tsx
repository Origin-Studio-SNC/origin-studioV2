export function ServicesHero() {
  return (
    <header className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <h1
        className="reveal-on-load page-hero-title max-w-5xl wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        style={{ animationDelay: '0.1s' }}
      >
        Ce que nous construisons, et ce que ça coûte.
      </h1>
      <p
        className="reveal-on-load mt-8 max-w-2xl text-base leading-relaxed text-mute md:mt-10 md:text-lg"
        style={{ animationDelay: '0.2s' }}
      >
        Quatre offres, chacune avec ses paliers, ses délais et son support. Les montants sont
        indicatifs : le devis final dépend du périmètre.
      </p>
    </header>
  )
}
