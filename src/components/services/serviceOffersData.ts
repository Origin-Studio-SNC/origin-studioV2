/** Aligné sur `ServiceVisual` */
export type ServiceOfferVisual = 'wireframe' | 'workflow' | 'devices' | 'commerce'

export type OfferTier = {
  name: string
  tagline: string
  price: string
  featured?: boolean
  specs: { label: string; value: string }[]
  ctaLabel: string
}

export type ServiceOfferDefinition = {
  title: string
  description: string
  tags: readonly string[]
  /** Affiché sur la page : entrée de gamme indicative */
  price: string
  visual: ServiceOfferVisual
  reverse: boolean
  contactService: 'site' | 'ecommerce' | 'app' | 'ia'
  modalIntro: string
  tiers: readonly OfferTier[]
}

export const SERVICE_OFFERS: readonly ServiceOfferDefinition[] = [
  {
    title: 'Sites web sur mesure',
    description:
      'Sites vitrine ou institutionnels sur mesure, avec CMS et stack moderne. Design, performance et SEO structurants pour une présence durable.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Payload CMS'],
    price: "3'500",
    visual: 'wireframe',
    reverse: false,
    contactService: 'site',
    modalIntro:
      'Les montants sont indicatifs. Le devis définitif dépend du nombre de pages, des intégrations, du design et des contenus.',
    tiers: [
      {
        name: 'Essentiel',
        tagline: 'Vitrine ou landing ciblée',
        price: "3'500 – 6'000 CHF",
        specs: [
          { label: 'Délai', value: '4 – 6 sem.' },
          { label: 'Périmètre', value: '1 à 5 pages, CMS' },
          { label: 'Design', value: 'Sur base de charte / composants' },
          { label: 'SEO', value: 'Structure & balisage de base' },
          { label: 'Support', value: '1 mois correctifs' },
        ],
        ctaLabel: 'Demander un devis',
      },
      {
        name: 'Avancé',
        tagline: 'Site riche, évolutif',
        price: "6'000 – 12'000 CHF",
        featured: true,
        specs: [
          { label: 'Délai', value: '6 – 10 sem.' },
          { label: 'Périmètre', value: 'Multi-sections, blog, médias' },
          { label: 'Design', value: 'Pages sur mesure, animations légères' },
          { label: 'SEO', value: 'Optimisation contenu & perf' },
          { label: 'Support', value: '2 mois' },
        ],
        ctaLabel: 'Discuter du projet',
      },
      {
        name: 'Sur mesure',
        tagline: 'Projet complexe ou marque forte',
        price: 'Sur devis',
        specs: [
          { label: 'Délai', value: 'Selon cahier des charges' },
          { label: 'Périmètre', value: 'Fonctionnalités spécifiques, intégrations' },
          { label: 'Design', value: 'Direction artistique poussée' },
          { label: 'SEO', value: 'Stratégie & suivi possible' },
          { label: 'Support', value: 'Forfait négocié' },
        ],
        ctaLabel: 'Planifier un appel',
      },
    ],
  },
  {
    title: 'E-commerce & boutiques en ligne',
    description:
      "Boutique en ligne avec catalogue, panier, paiements (Stripe, TWINT au besoin) et back-office commandes. Emails transactionnels, logistique de base, SEO produit et cadre RGPD intégrés au périmètre.",
    tags: [
      'Stripe',
      'Catalogue & stocks',
      "Tunnel d'achat",
      'Back-office',
      'Emails commande',
      'SEO e-commerce',
    ],
    price: "5'000",
    visual: 'commerce',
    reverse: true,
    contactService: 'ecommerce',
    modalIntro:
      'Le prix varie fortement selon le catalogue (nombre de références, variantes), les moyens de paiement, la logistique et les connecteurs (ERP, compta). Les fourchettes ci-dessous posent le cadre.',
    tiers: [
      {
        name: 'Lancement',
        tagline: 'Boutique ciblée, catalogue limité',
        price: "5'000 – 10'000 CHF",
        specs: [
          { label: 'Délai', value: '8 – 12 sem.' },
          { label: 'Catalogue', value: 'Volume modéré, variantes standard' },
          { label: 'Paiements', value: 'Stripe (carte) + base' },
          { label: 'Back-office', value: 'Commandes, produits, clients' },
          { label: 'Support', value: '2 mois' },
        ],
        ctaLabel: 'Demander un devis',
      },
      {
        name: 'Croissance',
        tagline: 'Catalogue dense & automatisations',
        price: "10'000 – 25'000 CHF",
        featured: true,
        specs: [
          { label: 'Délai', value: '12 – 18 sem.' },
          { label: 'Catalogue', value: 'Import, règles, promotions' },
          { label: 'Paiements', value: 'TWINT, multi-devises au besoin' },
          { label: 'Back-office', value: 'Workflows, emails avancés' },
          { label: 'Support', value: '3 – 4 mois' },
        ],
        ctaLabel: 'Discuter du projet',
      },
      {
        name: 'Entreprise',
        tagline: 'Intégrations & volumétrie',
        price: 'Sur devis',
        specs: [
          { label: 'Délai', value: '16 sem. et +' },
          { label: 'Catalogue', value: 'ERP, stocks temps réel, B2B' },
          { label: 'Paiements', value: 'Règles métier, facturation' },
          { label: 'Infra', value: 'Perf, sécurité, SLA' },
          { label: 'Support', value: 'Prioritaire, négocié' },
        ],
        ctaLabel: 'Planifier un appel',
      },
    ],
  },
  {
    title: 'Applications Web & Mobile',
    description:
      'Applications métier web et mobile, de la conception à la mise en production cloud. Données structurées, droits utilisateurs et intégrations pensées pour évoluer avec vous.',
    tags: ['Next.js', 'React Native', 'Tailwind CSS', 'TypeScript', 'PostgreSQL'],
    price: "8'000",
    visual: 'devices',
    reverse: false,
    contactService: 'app',
    modalIntro:
      'La complexité métier, les rôles utilisateurs, les intégrations et le niveau de test déterminent le budget. Les paliers ci-dessous sont des ordres de grandeur.',
    tiers: [
      {
        name: 'Starter',
        tagline: 'Votre première application web',
        price: "8'000 – 12'000 CHF",
        specs: [
          { label: 'Délai', value: '6 – 8 sem.' },
          { label: 'Types', value: 'App web responsive' },
          { label: 'Dashboard', value: 'Tableaux de bord de base' },
          { label: 'Tests', value: 'Tests manuels' },
          { label: 'Support', value: '2 mois' },
        ],
        ctaLabel: 'Demander un devis',
      },
      {
        name: 'Avancé',
        tagline: 'Application complète et évolutive',
        price: "15'000 – 25'000 CHF",
        featured: true,
        specs: [
          { label: 'Délai', value: '10 – 14 sem.' },
          { label: 'Types', value: 'Web app + PWA' },
          { label: 'Dashboard', value: 'Back-office complet' },
          { label: 'Tests', value: 'Tests auto (unitaires)' },
          { label: 'Support', value: '4 mois' },
        ],
        ctaLabel: 'Discuter du projet',
      },
      {
        name: 'Entreprise',
        tagline: 'Solution multi-plateforme',
        price: 'Sur devis',
        specs: [
          { label: 'Délai', value: '16 sem. et +' },
          { label: 'Types', value: 'Natif multi-plateforme' },
          { label: 'Dashboard', value: 'Enterprise, rôles avancés' },
          { label: 'Tests', value: 'E2E & charge' },
          { label: 'Support', value: '6 mois + prioritaire' },
        ],
        ctaLabel: 'Planifier un appel',
      },
    ],
  },
  {
    title: 'Intelligence Artificielle & Automatisation',
    description:
      "Automatisation de processus et usage de l'IA là où le gain est clair. Connexion à vos outils, garde-fous sur les données et solutions maintenables dans la durée.",
    tags: ['IA', 'Chatbots', 'RPA', 'Automatisation', 'Optimisation'],
    price: "2'000",
    visual: 'workflow',
    reverse: true,
    contactService: 'ia',
    modalIntro:
      "Un script d'automatisation simple n'a pas le même coût qu'un agent IA branché sur plusieurs systèmes. Nous cadrons le périmètre avant de chiffrer.",
    tiers: [
      {
        name: 'Starter',
        tagline: 'Automatisation ponctuelle',
        price: "2'000 – 5'000 CHF",
        specs: [
          { label: 'Délai', value: '2 – 4 sem.' },
          { label: 'Périmètre', value: '1–2 outils, flux simples' },
          { label: 'IA', value: 'Assistants / prompts cadrés' },
          { label: 'Données', value: 'Sources déjà structurées' },
          { label: 'Support', value: '1 mois' },
        ],
        ctaLabel: 'Demander un devis',
      },
      {
        name: 'Avancé',
        tagline: 'Workflows & intégrations',
        price: "5'000 – 15'000 CHF",
        featured: true,
        specs: [
          { label: 'Délai', value: '4 – 10 sem.' },
          { label: 'Périmètre', value: 'APIs, CRM, ticketing…' },
          { label: 'IA', value: 'RAG, agents multi-étapes' },
          { label: 'Données', value: 'Indexation, garde-fous' },
          { label: 'Support', value: '2 – 3 mois' },
        ],
        ctaLabel: 'Discuter du projet',
      },
      {
        name: 'Entreprise',
        tagline: 'Industrialisation',
        price: 'Sur devis',
        specs: [
          { label: 'Délai', value: 'Selon charge' },
          { label: 'Périmètre', value: 'Multi-équipes, conformité' },
          { label: 'IA', value: 'Monitoring, reprise sur erreur' },
          { label: 'Données', value: 'Sécurité & traçabilité' },
          { label: 'Support', value: 'Forfait dédié' },
        ],
        ctaLabel: 'Planifier un appel',
      },
    ],
  },
] as const
