import type { Metadata } from 'next';
import { FAQS } from '@/lib/faqs';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ — Goat Scale',
  description:
    'Answers on pricing, timelines, process, code ownership, and post-launch support for Goat Scale projects.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient />
    </>
  );
}
