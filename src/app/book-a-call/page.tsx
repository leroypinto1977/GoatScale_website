import type { Metadata } from 'next';
import BookACallClient from './BookACallClient';

export const metadata: Metadata = {
  title: 'Book a Call — Goat Scale',
  description:
    'Book a free discovery call with Goat Scale. No sales pressure — just a conversation about your goals and how we can help you scale.',
  alternates: { canonical: '/book-a-call' },
  openGraph: {
    title: 'Book a Call — Goat Scale',
    description:
      'Book a free discovery call. A conversation about your goals and how we can help you scale.',
    url: 'https://goatscale.com/book-a-call',
    type: 'website',
  },
};

export default function BookACallPage() {
  return <BookACallClient />;
}
