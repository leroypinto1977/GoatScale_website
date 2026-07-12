import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import SmoothScroll from '@/components/layout/SmoothScroll';
import MotionProvider from '@/components/layout/MotionProvider';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Goat Scale — Launch. Operate. Transform.',
  description:
    'Goat Scale builds websites, web apps, and mobile apps — and the CRM, ERP, and business operating systems companies run on. Product engineering, business systems, and digital transformation.',
  keywords: [
    'web development agency',
    'web applications',
    'mobile app development',
    'CRM development',
    'ERP systems',
    'business operating system',
    'workflow automation',
    'digital transformation',
    'digitalisation',
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
    title: 'Goat Scale — Launch. Operate. Transform.',
    description:
      'We build websites, web & mobile apps — and the CRM, ERP, and operating systems companies run on.',
    type: 'website',
    url: 'https://goatscale.com',
    siteName: 'Goat Scale',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goat Scale — Launch. Operate. Transform.',
    description:
      'We build websites, web & mobile apps — and the CRM, ERP, and operating systems companies run on.',
    creator: '@goatscale',
  },
};

import Preloader from '@/components/layout/Preloader';

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
      'Goat Scale builds websites, web apps, and mobile apps — and the CRM, ERP, and business operating systems companies run on.',
    email: 'hello@goatscale.com',
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <MotionProvider>
          <Preloader />
          <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
