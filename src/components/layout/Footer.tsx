'use client';

import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Footer.module.css';

const sitemap = [
  {
    heading: 'Services',
    links: [
      { label: 'Launch — Product Engineering', href: '/services/launch' },
      { label: 'Operate — Business Systems', href: '/services/operate' },
      { label: 'Transform — Digitalisation', href: '/services/transform' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Process', href: '/#process' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Engage',
    links: [
      { label: 'Start a Project', href: '/start-a-project' },
      { label: 'Book a Call', href: '/book-a-call' },
      { label: 'Contact', href: '/#contact' },
      { label: 'Email Us', href: 'mailto:hello@goatscale.com', external: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* CTA row */}
        <div className={styles.cta}>
          <div>
            <span className="label"><i />Let&apos;s build</span>
            <h2 className={styles.ctaTitle}>
              Have a system <span className="bold">worth scaling?</span>
            </h2>
          </div>
          <MagneticButton href="/start-a-project" className={`btn btn-primary ${styles.ctaBtn}`}>
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
        </div>

        {/* Sitemap */}
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              GOAT<span className={styles.logoBadge}>SCALE</span>
            </Link>
            <p className={styles.tagline}>Built with intent. Designed to scale.</p>
            <a href="mailto:hello@goatscale.com" className={styles.email}>
              hello@goatscale.com
            </a>
          </div>

          {sitemap.map((col) => (
            <nav key={col.heading} className={styles.navCol} aria-label={col.heading}>
              <span className={styles.navHeading}>{col.heading}</span>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={styles.navLink}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Giant wordmark — the logo at monumental scale */}
        <div className={styles.wordmark} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/goatscale-lockup-dark.png" alt="" className={styles.wordmarkImg} />
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} Goat Scale. All rights reserved.</p>
          <div className={styles.bottomRight}>
            <Link href="/privacy" className={styles.legal}>Privacy</Link>
            <Link href="/terms" className={styles.legal}>Terms</Link>
            <Link href="/refund-policy" className={styles.legal}>Refunds</Link>
            <button
              type="button"
              className={styles.toTop}
              onClick={() => {
                const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
                if (lenis) lenis.scrollTo(0, { duration: 1.2 });
                else window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth',
                });
              }}
            >
              Back to top
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
