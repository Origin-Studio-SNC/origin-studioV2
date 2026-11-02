export function AboutHeroSection() {
  return (
    <section className="relative z-10 mb-20 md:mb-28 lg:mb-36">
      <div className="flex flex-col">
        <h1
          className="reveal-on-load page-hero-title max-w-5xl wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          Deux développeurs. Un front, un back.
        </h1>
        <p
          className="reveal-on-load mt-8 max-w-2xl text-base leading-relaxed text-mute md:mt-10 md:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          Origin Studio est une agence web basée à Genève. Chadi s’occupe des interfaces et de la
          relation avec vous, Eric du serveur, des bases de données et de la mise en production.
          Nous travaillons pour des PME de Suisse romande.
        </p>
      </div>
    </section>
  )
}
