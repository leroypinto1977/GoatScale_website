export type ServicePillar = {
  slug: string;
  number: string;
  /** The pillar verb — Launch / Operate / Transform. */
  kicker: string;
  title: string;
  tagline: string;
  intro: string;
  offerings: { name: string; desc: string }[];
  /** "What you get" chips. */
  outcomes: string[];
  /** "This is for you if…" qualifiers. */
  fit: string[];
  /** Related case-study slugs from lib/projects. */
  relatedSlugs: string[];
};

export const servicePillars: ServicePillar[] = [
  {
    slug: 'launch',
    number: '01',
    kicker: 'Launch',
    title: 'Product Engineering',
    tagline: 'Websites, web apps, and mobile apps — designed, built, and shipped fast.',
    intro:
      'Everything you need to get to market: strategy, design, and engineering under one roof. No templates, no hand-offs between five vendors — one team that ships production-quality product in weeks.',
    offerings: [
      {
        name: 'Websites & Landing Pages',
        desc: 'Conversion-built marketing sites and landing pages with zero template DNA — fast, SEO-ready, and designed to sell.',
      },
      {
        name: 'Web Applications',
        desc: 'Full-stack platforms, SaaS products, portals, and dashboards — architected for real users and real scale.',
      },
      {
        name: 'Mobile Apps',
        desc: 'Cross-platform iOS and Android apps that feel native — one codebase, both stores, shipped together.',
      },
      {
        name: 'MVP Builds',
        desc: 'A scoped, production-quality first version of your product — built to validate fast and priced to make sense.',
      },
    ],
    outcomes: [
      'Design + engineering under one roof',
      'Launch in weeks, not quarters',
      'SEO & performance baked in',
      'You own 100% of the code',
    ],
    fit: [
      'You need a product or website shipped without hiring a full team',
      "Your current site doesn't match the calibre of your business",
      'You have a validated idea and need an MVP in market',
    ],
    relatedSlugs: ['meridian-studios', 'pulse-mobile'],
  },
  {
    slug: 'operate',
    number: '02',
    kicker: 'Operate',
    title: 'Business Operating Systems',
    tagline: 'Custom CRM, ERP, and internal systems — built around how your business actually works.',
    intro:
      'Off-the-shelf tools force your business into their shape. We build the opposite: CRM, ERP, and internal systems moulded to your workflows — one source of truth that your team actually adopts. This is our core.',
    offerings: [
      {
        name: 'CRM Systems',
        desc: 'Pipeline, customers, and follow-ups in one place — a CRM shaped to your sales motion, not a generic tool you fight.',
      },
      {
        name: 'ERP & Inventory',
        desc: 'Orders, stock, procurement, and finance flows unified into a single system with live visibility.',
      },
      {
        name: 'Internal Tools & Dashboards',
        desc: 'Role-based tools and executive dashboards that replace the spreadsheets your team drowns in.',
      },
      {
        name: 'Automations & Integrations',
        desc: 'Your existing tools connected and talking to each other — with the manual copy-paste work automated away.',
      },
    ],
    outcomes: [
      'One source of truth for operations',
      'Hours of manual work automated weekly',
      'Dashboards leadership actually uses',
      'Systems that scale with headcount',
    ],
    fit: [
      'Your operations live in six disconnected spreadsheets',
      "Off-the-shelf CRM or ERP doesn't fit how you work",
      'Your team spends hours a day shuffling data between tools',
    ],
    relatedSlugs: ['flowdesk-crm', 'warehouseos'],
  },
  {
    slug: 'transform',
    number: '03',
    kicker: 'Transform',
    title: 'Digital Transformation',
    tagline: 'From paper trails and legacy tools to a business that runs on rails.',
    intro:
      "Digitalisation isn't buying more software — it's redesigning how your business runs, then building the systems to match. We audit, roadmap, and modernise, and we stay until the new way of working sticks.",
    offerings: [
      {
        name: 'Transformation Audit & Roadmap',
        desc: 'We map your processes, tools, and gaps — and hand you a prioritised, costed roadmap to a digital operation.',
      },
      {
        name: 'Process Digitalisation',
        desc: 'Paper registers, WhatsApp threads, and spreadsheets converted into clean digital workflows your team adopts.',
      },
      {
        name: 'Legacy Modernisation',
        desc: 'Ageing systems rebuilt or bridged to modern infrastructure — without stopping the business while we do it.',
      },
      {
        name: 'Tech Strategy',
        desc: 'A senior technical partner for stack, build-vs-buy, hiring, and scale decisions — a fractional CTO on your side.',
      },
    ],
    outcomes: [
      'A clear, costed digital roadmap',
      'Processes your team actually adopts',
      'Legacy risk retired safely',
      'Senior tech leadership on demand',
    ],
    fit: [
      'You know you need to digitalise but not where to start',
      'A decade-old system is holding the business hostage',
      "You're scaling and the manual processes are cracking",
    ],
    relatedSlugs: ['warehouseos', 'flowdesk-crm'],
  },
];

export function getServiceBySlug(slug: string): ServicePillar | undefined {
  return servicePillars.find((s) => s.slug === slug);
}

export function getOtherServices(slug: string): ServicePillar[] {
  return servicePillars.filter((s) => s.slug !== slug);
}
