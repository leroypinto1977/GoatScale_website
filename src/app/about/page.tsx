import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About — Goat Scale',
  description:
    'A small, sharp dev agency that builds websites, apps, and internal systems that help ambitious companies move faster than they thought possible.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Goat Scale',
    description:
      'A small, sharp dev agency building websites, apps, and internal systems for ambitious companies.',
    url: 'https://goatscale.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
