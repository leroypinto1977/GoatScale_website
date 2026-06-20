import type { Metadata } from 'next';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
  title: 'Work — Goat Scale',
  description:
    'Selected work: CRMs, mobile apps, internal systems, and brand sites we have shipped for clients across web, mobile, and internal systems.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work — Goat Scale',
    description:
      'Selected systems, platforms, and products we have shipped for clients across industries.',
    url: 'https://goatscale.com/work',
    type: 'website',
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
