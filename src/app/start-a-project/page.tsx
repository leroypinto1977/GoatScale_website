import type { Metadata } from 'next';
import StartProjectClient from './StartProjectClient';

export const metadata: Metadata = {
  title: 'Start a Project — Goat Scale',
  description:
    'Tell us what you are building. Share your brief and we will get back to you within 24 hours to scope, plan, and start building.',
  alternates: { canonical: '/start-a-project' },
  openGraph: {
    title: 'Start a Project — Goat Scale',
    description:
      'Tell us what you are building. Share your brief and we will respond within 24 hours.',
    url: 'https://goatscale.com/start-a-project',
    type: 'website',
  },
};

export default function StartAProjectPage() {
  return <StartProjectClient />;
}
