const engagements = [
  {
    num: '01',
    title: 'Qualité Suisse',
    description:
      "Une rigueur obsessionnelle dans chaque ligne de code et chaque pixel dessiné. Nous ne transigeons jamais sur l'excellence.",
  },
  {
    num: '02',
    title: 'Éco-conception',
    description:
      'Des sites optimisés pour être légers, rapides et minimiser leur empreinte carbone numérique sans sacrifier le design.',
  },
  {
    num: '03',
    title: 'Transparence',
    description:
      'Pas de coûts cachés, pas de jargon technique inutile. Un accompagnement clair et honnête tout au long du projet.',
  },
] as const

const EngagementsSection = () => {
  return (
    <section id="engagements" className="px-6 py-[130px] lg:px-40">
      <div className="mx-auto max-w-7xl">
        <p className="section-label mb-16">Nos engagements</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {engagements.map((item) => (
            <div
              key={item.num}
              className="group relative border border-border bg-card p-12"
            >
              <span className="absolute left-8 top-8 font-mono text-xs text-foreground/40">
                {item.num}
              </span>
              <h3 className="mb-4 mt-6 text-2xl font-light text-foreground/90">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EngagementsSection
