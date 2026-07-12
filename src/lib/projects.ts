export type Project = {
  slug: string;
  title: string;
  client: string;
  category: 'Operating System' | 'Platform' | 'E-Commerce' | 'Brand & Web';
  pillar: 'launch' | 'operate' | 'transform';
  sector: string;
  year: string;
  thumbnail: string;
  heroImage: string;
  summary: string;
  challenge: string;
  approach: string;
  features: string[];
  tags: string[];
  results: { label: string; value: string }[];
  gallery: string[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'goat-erp',
    title: 'GOAT ERP',
    client: 'The GOAT Media',
    category: 'Operating System',
    pillar: 'operate',
    sector: 'Media production',
    year: '2025–26',
    thumbnail: '/images/work/goaterp-dashboard.png',
    heroImage: '/images/work/goaterp-dashboard.png',
    summary:
      'The complete operating system for a video production company — staffing, attendance, billing, client deliverables, and shoot scheduling in one platform.',
    challenge:
      'A fast-growing media company was coordinating shoots, editors, client deliverables, leave requests, and invoicing across chat threads and spreadsheets. Six different roles — from directors to accountants to clients — needed six different views of the same operation, with none of the noise.',
    approach:
      'We built a single platform with role-based access for all six roles. Attendance defaulters and leave accrual run on scheduled jobs, billing and cashflow live next to the work that generates them, and shoot bookings flow through a shared production calendar. Real-time updates keep every dashboard live, and the whole system is covered by end-to-end tests.',
    features: [
      'Six-role RBAC — director, PM, team manager, member, accountant, client',
      'Attendance, leave accrual & defaulter automation on scheduled jobs',
      'Billing: invoices, expenses & cashflow views',
      'Shoot calendar with day sheets & booking dialogs',
      'Client deliverables & asset library',
      'Real-time dashboards (WebSockets) with Redis caching',
    ],
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Redis', 'WebSockets', 'Playwright'],
    results: [
      { label: 'Operational roles served', value: '6' },
      { label: 'Modules in production', value: '12+' },
      { label: 'Environments (prod · staging · QA)', value: '3' },
    ],
    gallery: [
      '/images/work/goaterp-dashboard.png',
      '/images/work/goaterp-billing.png',
      '/images/work/goaterp-attendance.png',
      '/images/work/goaterp-calendar.png',
      '/images/work/goaterp-clients.png',
    ],
  },
  {
    slug: 'alpio',
    title: 'Alpio',
    client: 'GoatScale (in-house)',
    category: 'Platform',
    pillar: 'operate',
    sector: 'Agency operations',
    year: '2026',
    thumbnail: '/images/work/alpio-studio-dashboard.png',
    heroImage: '/images/work/alpio-studio-dashboard.png',
    summary:
      'Our own two-sided agency platform: a staff operations console and a premium client portal — projects, proposals, billing, credentials, and messaging under one roof.',
    challenge:
      'Agency-client collaboration usually happens across email, invoices-as-PDFs, and shared docs — and clients never get a real home for their engagement. We wanted one system where our team runs the studio and every client gets a first-class portal, with hard guarantees that no tenant can ever see another\'s data.',
    approach:
      'Alpio ships as two isolated apps from one monorepo: Studio for staff, Spaces for clients. Isolation is enforced in depth — separate deployments, separate auth pools, and Postgres row-level security underneath it all. Client credentials are stored in a vault encrypted with AWS KMS. Billing, proposals, onboarding, and threaded messaging complete the loop.',
    features: [
      'Two-sided architecture: staff console + client portal',
      'Postgres row-level security for hard tenant isolation',
      'AWS KMS-encrypted credentials vault',
      'Proposals, billing timelines & payment tracking',
      'Threaded client messaging & notifications',
      'Live analytics with warehouse-driven reporting',
    ],
    tags: ['Next.js', 'Turborepo', 'Neon Postgres', 'Drizzle', 'Better Auth', 'AWS KMS'],
    results: [
      { label: 'Isolated apps, one codebase', value: '2' },
      { label: 'Tenant isolation', value: 'RLS' },
      { label: 'Credential encryption', value: 'KMS' },
    ],
    gallery: [
      '/images/work/alpio-studio-dashboard.png',
      '/images/work/alpio-spaces-home.png',
      '/images/work/alpio-studio-billing.png',
      '/images/work/alpio-spaces-billing.png',
      '/images/work/alpio-studio-dark.png',
    ],
  },
  {
    slug: 'akshara',
    title: 'Akshara',
    client: 'Akshara Nair',
    category: 'E-Commerce',
    pillar: 'launch',
    sector: 'Fashion & handloom',
    year: '2026',
    thumbnail: '/images/work/akshara-home.png',
    heroImage: '/images/work/akshara-home.png',
    summary:
      'A made-to-order handloom storefront for an influencer-led studio — plus a separately deployed admin panel running the whole operation.',
    challenge:
      'An influencer with a 284K-strong audience needed more than a link-in-bio shop: a premium storefront worthy of handcrafted sarees and blouses, and a back office her team could actually run — orders, inventory, and customer communication — without touching code.',
    approach:
      'We shipped two apps on one database: an editorial storefront that sells the craft, and a JWT-secured admin panel with live revenue and low-stock dashboards. Every order-status change triggers an automated customer email, and a static-fallback layer keeps the storefront serving even if the database blinks.',
    features: [
      'Editorial storefront with made-to-order flow',
      'Separately deployed, JWT-secured admin panel',
      'Order lifecycle with automated status emails (Brevo)',
      'Live revenue & low-stock dashboards',
      'GA4, Microsoft Clarity & PostHog analytics',
      'Database-with-static-fallback resilience',
    ],
    tags: ['Next.js', 'Neon Postgres', 'Zustand', 'Brevo', 'Framer Motion'],
    results: [
      { label: 'Launch audience', value: '284K' },
      { label: 'Deployed apps (store + admin)', value: '2' },
      { label: 'Analytics integrations', value: '3' },
    ],
    gallery: ['/images/work/akshara-home.png', '/images/work/akshara-mid.png'],
    liveUrl: 'https://akshara-store.vercel.app',
  },
  {
    slug: 'evherfit',
    title: 'EVHERFIT',
    client: 'EVHERFIT',
    category: 'E-Commerce',
    pillar: 'launch',
    sector: 'D2C fitness',
    year: '2026',
    thumbnail: '/images/work/evherfit-home.png',
    heroImage: '/images/work/evherfit-home.png',
    summary:
      'A motion-heavy D2C store for a women\'s fitness product — with guest checkout, HMAC-verified Razorpay payments, and a full order-ops admin.',
    challenge:
      'A single-product fitness brand needed maximum conversion with minimum friction: no accounts, no cart ceremony — see the product, feel the brand, pay, done. Behind that, the founder needed real order operations: payment integrity, courier tracking, and revenue visibility.',
    approach:
      'The storefront is pure conviction — smooth-scroll, parallax product showcase, count-up stats — with a guest checkout that gets out of the way. Payments are HMAC-verified and confirmed by an authoritative Razorpay webhook so no order is ever missed. The admin panel tracks revenue, average order value, and every order through to courier handoff.',
    features: [
      'Guest checkout — no accounts, no friction',
      'Razorpay with HMAC verification + authoritative webhook',
      'Server-side pricing (client can\'t tamper)',
      'Admin: revenue & AOV KPIs, 14-day animated chart',
      'Order lifecycle with courier tracking',
      'Lenis smooth scroll, parallax hero, reduced-motion support',
    ],
    tags: ['Next.js', 'Drizzle', 'PostgreSQL', 'Razorpay', 'Motion', 'Lenis'],
    results: [
      { label: 'Checkout steps to pay', value: '1' },
      { label: 'Payment confirmation', value: 'Webhook' },
      { label: 'Product variants at launch', value: '3' },
    ],
    gallery: ['/images/work/evherfit-home.png', '/images/work/evherfit-mid.png'],
    liveUrl: 'https://evherfit.com',
  },
  {
    slug: 'imobiles',
    title: 'iMobiles',
    client: 'iMobiles, Chennai',
    category: 'Operating System',
    pillar: 'transform',
    sector: 'Retail & franchise',
    year: '2026',
    thumbnail: '/images/work/imobiles-dashboard.png',
    heroImage: '/images/work/imobiles-dashboard.png',
    summary:
      'A franchise-management platform for a multi-brand mobile retailer — every handset tracked by IMEI from HQ warehouse to the moment it\'s sold.',
    challenge:
      'A Chennai mobile-retail operation with seven franchise stores had no shared view of stock. Handsets moved between HQ and franchises on trust and phone calls; nobody could say where a specific IMEI was, and outstanding payments between HQ and stores lived in notebooks.',
    approach:
      'We modelled the business as an IMEI state machine — created, at HQ, in transit, at franchise, sold — so every unit has exactly one true location. HQ and franchise staff get separate role-based consoles: HQ sees stock distribution, franchise leaderboards, and outstanding payments; stores manage their own inventory, transfers, and sales with GST-formatted invoicing. The build is engineered to production standard: unit and end-to-end test suites, error monitoring, and CI hooks.',
    features: [
      'IMEI state machine — one source of truth per handset',
      'HQ console: stock distribution, leaderboards, outstanding payments',
      'Franchise console: inventory, transfers, sales',
      'GST-compliant ₹ formatting & invoicing',
      'Full test pyramid: Vitest + Playwright e2e',
      'Sentry error monitoring & CI hooks',
    ],
    tags: ['Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'Recharts', 'Playwright'],
    results: [
      { label: 'Franchise stores modelled', value: '7' },
      { label: 'Units tracked in demo', value: '255' },
      { label: 'IMEI lifecycle states', value: '5' },
    ],
    gallery: ['/images/work/imobiles-dashboard.png', '/images/work/imobiles-inventory.png'],
    liveUrl: 'https://imobiles-app.vercel.app',
  },
  {
    slug: 'soule-healers',
    title: 'Soule Healers',
    client: 'Soule Healers',
    category: 'Brand & Web',
    pillar: 'launch',
    sector: 'Wellness & therapy',
    year: '2026',
    thumbnail: '/images/work/soulehealers-home.png',
    heroImage: '/images/work/soulehealers-home.png',
    summary:
      'A three-property brand ecosystem for a therapy practice — a brand home plus two conversion funnels with real payments, built on one design language.',
    challenge:
      'A psyche-healing practitioner had two distinct offers and no digital presence tying them together. Each offer needed its own high-conversion landing page with payment built in, and the brand needed a home that made the whole practice feel like one considered world — not three disconnected pages.',
    approach:
      'We designed a brand-book-driven system — a signature butterfly motif, four "wings" of branch colors — and rolled it across three coordinated properties: the brand site, and a dedicated funnel per offer with Razorpay checkout and automated email follow-up. A single-file content architecture means copy changes never require touching components.',
    features: [
      'Three coordinated properties, one design system',
      'Razorpay checkout with thank-you & email flows (Brevo)',
      'Signature SVG butterfly pattern & brand motif',
      'Single-file content architecture per site',
      'Lenis smooth scroll, scroll-reveal with reduced-motion support',
      'Discovery-call booking integration',
    ],
    tags: ['Next.js', 'Tailwind', 'Razorpay', 'Brevo', 'Lenis'],
    results: [
      { label: 'Coordinated web properties', value: '3' },
      { label: 'Offers with built-in checkout', value: '2' },
      { label: 'Design language', value: '1' },
    ],
    gallery: [
      '/images/work/soulehealers-home.png',
      '/images/work/soulehealers-programs.png',
      '/images/work/soulehealers-offer.png',
    ],
    liveUrl: 'https://soulehealers-website.vercel.app',
  },
  {
    slug: 'goat-assets',
    title: 'GOAT Assets',
    client: 'GOAT Assets, Mumbai',
    category: 'Brand & Web',
    pillar: 'launch',
    sector: 'Investment advisory',
    year: '2025',
    thumbnail: '/images/work/goatassets-home.png',
    heroImage: '/images/work/goatassets-home.png',
    summary:
      'The corporate web presence for a Mumbai investment-assets firm — institutional trust, rendered in pixels, with full SEO and lead capture.',
    challenge:
      'An investment firm dealing in real-world assets needed a site that could sit comfortably next to the institutions it works with. Credibility was the entire brief: real photography, precise information architecture, and zero template feel — plus the plumbing to convert visits into conversations.',
    approach:
      'We built a multi-page corporate site with insight sections per asset class, a careers page, and a server-side contact API delivering enquiries by email. Structured data, sitemaps, and OpenGraph metadata make it fully legible to search engines — the firm\'s digital front door, indexed properly.',
    features: [
      'Multi-page corporate IA: insights, careers, contact, legal',
      'Asset-class insight sections (retail, office, industrial, capital)',
      'Server-side contact API with email delivery',
      'JSON-LD structured data, sitemap & OpenGraph',
      'Real brand photography throughout',
    ],
    tags: ['Next.js', 'React', 'Tailwind', 'SEO'],
    results: [
      { label: 'Asset classes covered', value: '4' },
      { label: 'Structured data', value: 'JSON-LD' },
      { label: 'Corporate pages', value: '8+' },
    ],
    gallery: ['/images/work/goatassets-home.png', '/images/work/goatassets-mid.png'],
  },
  {
    slug: '6f-school-of-it',
    title: '6F School of IT',
    client: '6F School of IT',
    category: 'Brand & Web',
    pillar: 'launch',
    sector: 'Education & training',
    year: '2026',
    thumbnail: '/images/work/sixf-home.png',
    heroImage: '/images/work/sixf-home.png',
    summary:
      'A two-surface marketing system for a DevOps training institute — an evergreen brand site plus a campaign landing page, both feeding one lead pipeline.',
    challenge:
      'A DevOps & AIOps training institute needed to run always-on brand marketing and sharp course-launch campaigns at the same time — without leads scattering across forms and inboxes.',
    approach:
      'We built two coordinated surfaces: the institute\'s evergreen site and a conversion-focused campaign page for its flagship AWS DevOps program. Both write leads directly into a serverless Postgres pipeline, and a full SVG brand kit keeps the identity crisp at every size.',
    features: [
      'Evergreen brand site + campaign landing page',
      'Serverless Postgres lead capture (Neon)',
      'Animated hero & scroll reveals (Framer Motion)',
      'Full SVG logo system (mark, mono, lockups)',
      'SEO & OpenGraph metadata on a custom domain',
    ],
    tags: ['Next.js', 'Neon Postgres', 'Framer Motion', 'Tailwind'],
    results: [
      { label: 'Marketing surfaces', value: '2' },
      { label: 'Lead pipeline', value: '1' },
      { label: 'Logo system variants', value: '4' },
    ],
    gallery: ['/images/work/sixf-home.png', '/images/work/sixf-mid.png'],
  },
];

/* Products & platforms currently in build — shown as a strip, not full case studies. */
export type LabProject = {
  name: string;
  descriptor: string;
  stack: string;
};

export const labProjects: LabProject[] = [
  {
    name: 'Oryn',
    descriptor: 'AI-native WhatsApp, Instagram & Messenger engagement platform for SMBs',
    stack: 'Go · Postgres · Claude · Stripe',
  },
  {
    name: 'Creovate',
    descriptor: 'Whitelabel multi-tenant LMS — every creator gets a branded academy on their own domain',
    stack: 'Next.js · Mux · LiveKit · Expo',
  },
  {
    name: 'Aviate',
    descriptor: 'Gym-chain platform: QR check-ins, memberships, workouts & admin analytics',
    stack: 'Fastify · Expo · Redis · BullMQ',
  },
  {
    name: 'Passly',
    descriptor: 'Zero-knowledge password manager, built native for Apple platforms',
    stack: 'SwiftUI · AES-256-GCM · Stripe',
  },
  {
    name: 'ServerWhiz',
    descriptor: 'Server & infrastructure management suite with live metrics and an embedded terminal',
    stack: 'Rust · Tauri · Redis · WebSockets',
  },
  {
    name: 'Cashlio',
    descriptor: 'Three-tier billing & licensing SaaS: cloud license server + offline-first desktop apps',
    stack: 'Next.js · Electron · SQLite',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
