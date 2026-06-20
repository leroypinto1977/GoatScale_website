import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import SmoothScroll from '@/components/layout/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Goat Scale — Build Systems. Scale Fast.',
  description:
    'Goat Scale is a dev agency that builds websites, web apps, and mobile applications — and the internal systems and workflows that help companies scale 10x faster.',
  keywords: [
    'dev agency',
    'web development',
    'web applications',
    'mobile apps',
    'internal systems',
    'workflow automation',
    'Next.js agency',
    'scale',
  ],
  authors: [{ name: 'Goat Scale' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL('https://goatscale.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Goat Scale — Build Systems. Scale Fast.',
    description:
      'We design and build the websites, apps, and internal systems that help companies move 10x faster.',
    type: 'website',
    url: 'https://goatscale.com',
    siteName: 'Goat Scale',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goat Scale — Build Systems. Scale Fast.',
    description:
      'We design and build the websites, apps, and internal systems that help companies move 10x faster.',
    creator: '@goatscale',
  },
};

import CustomCursor from '@/components/ui/CustomCursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Goat Scale',
    url: 'https://goatscale.com',
    description:
      'Dev agency that builds websites, web apps, mobile applications, and the internal systems that help companies scale 10x faster.',
    email: 'hello@goatscale.com',
    sameAs: ['https://linkedin.com', 'https://github.com'],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <CustomCursor />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
