export type Project = {
  slug: string;
  title: string;
  client: string;
  category: 'Web' | 'Mobile' | 'Branding' | 'Strategy';
  year: string;
  thumbnail: string;
  heroImage: string;
  summary: string;
  challenge: string;
  approach: string;
  tags: string[];
  results: { label: string; value: string }[];
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: 'flowdesk-crm',
    title: 'FlowDesk CRM',
    client: 'LogiTrack Ltd.',
    category: 'Web',
    year: '2024',
    thumbnail: '/images/projects/flowdesk-thumb.png',
    heroImage: '/images/projects/flowdesk-hero.png',
    summary:
      'A full-stack CRM system built for a logistics company, replacing 6 manual spreadsheet workflows with one unified platform.',
    challenge:
      'LogiTrack was managing customer relationships, order pipelines, and delivery tracking across 6 disconnected spreadsheets. Data was duplicated, updates were missed, and the ops team spent 4+ hours a day just reconciling information — leaving no bandwidth for growth.',
    approach:
      'We architected FlowDesk as a single source of truth: a real-time CRM with role-based dashboards, automated order status updates via webhook integrations, and a custom reporting engine. The stack was chosen for speed-to-market without sacrificing scalability.',
    tags: ['Next.js', 'PostgreSQL', 'System Design', 'TypeScript'],
    results: [
      { label: 'Time saved per week', value: '28 hrs' },
      { label: 'Data accuracy improvement', value: '94%' },
      { label: 'Onboarding time', value: '2 weeks' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'pulse-mobile',
    title: 'Pulse Mobile',
    client: 'Pulse Health Inc.',
    category: 'Mobile',
    year: '2024',
    thumbnail: '/images/projects/pulse-thumb.png',
    heroImage: '/images/projects/pulse-hero.png',
    summary:
      'Cross-platform fitness tracking app with real-time data sync and AI-powered coaching built for iOS and Android.',
    challenge:
      'Pulse needed a mobile app that could handle live biometric data from wearables, deliver personalised coaching in real-time, and retain users well beyond the typical 30-day drop-off cliff for fitness apps. Existing solutions were either too generic or too expensive to white-label.',
    approach:
      'We built Pulse on React Native for cross-platform reach, backed by a Node.js real-time engine using WebSockets. AI coaching is powered by a fine-tuned model that adapts plans weekly based on workout completion and recovery data. The UX was designed with gamification loops to drive retention.',
    tags: ['React Native', 'Node.js', 'WebSockets', 'AI Integration'],
    results: [
      { label: 'D30 retention rate', value: '68%' },
      { label: 'App Store rating', value: '4.8★' },
      { label: 'Active users at launch', value: '2,400+' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'meridian-studios',
    title: 'Meridian Studios',
    client: 'Meridian Creative',
    category: 'Web',
    year: '2023',
    thumbnail: '/images/projects/meridian-thumb.png',
    heroImage: '/images/projects/meridian-hero.png',
    summary:
      'Brand website for a premium creative studio. Zero-bloat, perfect Lighthouse score, fully animated editorial experience.',
    challenge:
      'Meridian had outgrown their Squarespace site. Their new work demanded a bespoke digital presence that matched the calibre of their output — fast, animated, editorial — without any template DNA.',
    approach:
      'We built the site from scratch in Next.js with GSAP for all motion. Every animation was designed to feel effortless, not performative. The result: a 100/100 Lighthouse score, sub-1s FCP, and a site that feels like the agency itself.',
    tags: ['Next.js', 'GSAP', 'Headless CMS', 'Motion Design'],
    results: [
      { label: 'Lighthouse Performance', value: '100' },
      { label: 'First Contentful Paint', value: '0.8s' },
      { label: 'Inbound enquiries post-launch', value: '+210%' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'warehouseos',
    title: 'WarehouseOS',
    client: 'NorthCore Distribution',
    category: 'Web',
    year: '2023',
    thumbnail: '/images/projects/warehouse-thumb.png',
    heroImage: '/images/projects/warehouse-hero.png',
    summary:
      'End-to-end warehouse management system with live inventory tracking and automated reorder workflows.',
    challenge:
      'NorthCore was running a warehouse on paper logs and a decade-old ERP system that couldn\'t talk to their ecommerce stack. Stockouts were costing them $40K/month. They needed a modern internal OS, not another off-the-shelf tool.',
    approach:
      'WarehouseOS is a bespoke internal platform built with React and a Python backend. Real-time inventory is powered by barcode/QR scanner integrations. Reorder rules are configurable per SKU, and everything pipes into a live executive dashboard. We shipped an MVP in 6 weeks.',
    tags: ['React', 'Python', 'FastAPI', 'Automation', 'PostgreSQL'],
    results: [
      { label: 'Monthly stockout cost eliminated', value: '$40K' },
      { label: 'Inventory accuracy', value: '99.2%' },
      { label: 'MVP delivery time', value: '6 weeks' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
    ],
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
