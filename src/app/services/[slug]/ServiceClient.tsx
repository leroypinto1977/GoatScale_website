'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { EASE_OUT, viewportOnce } from '@/lib/motion';
import type { ServicePillar } from '@/lib/services';
import type { Project } from '@/lib/projects';
import styles from './page.module.css';

interface ServiceClientProps {
  service: ServicePillar;
  related: Project[];
  others: ServicePillar[];
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServiceClient({ service, related, others }: ServiceClientProps) {
  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <motion.span
            className="label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <i />Services · {service.number}
          </motion.span>

          <Reveal as="h1" split="lines" className={styles.heroTitle} delay={0.1}>
            <span className={styles.kicker}>{service.kicker}.</span>
            {service.title}
          </Reveal>

          <motion.p
            className={`body-lg ${styles.tagline}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
          >
            {service.intro}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT }}
          >
            <Link href="/start-a-project" className="btn btn-primary">
              Start a Project <ArrowIcon />
            </Link>
            <Link href="/book-a-call" className="btn btn-outline">
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Offerings ────────────────────────────────────────── */}
      <section className={`section ${styles.offerings}`}>
        <div className="container">
          <span className="label"><i />What&apos;s included</span>
          <div className={styles.offeringList}>
            {service.offerings.map((o, i) => (
              <motion.div
                key={o.name}
                className={styles.offeringRow}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              >
                <span className={styles.offeringNum}>{String(i + 1).padStart(2, '0')}</span>
                <h2 className={styles.offeringName}>{o.name}</h2>
                <p className={styles.offeringDesc}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes + Fit ───────────────────────────────────── */}
      <section className={`section ${styles.value}`}>
        <div className="container">
          <div className={styles.valueGrid}>
            <motion.div
              className={styles.valueCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <h3 className={styles.valueHeading}>What you get</h3>
              <ul className={styles.valueList}>
                {service.outcomes.map((o) => (
                  <li key={o}>
                    <span className={styles.check}><CheckIcon /></span>
                    {o}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={`${styles.valueCard} ${styles.valueCardAlt}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            >
              <h3 className={styles.valueHeading}>This is for you if…</h3>
              <ul className={styles.valueList}>
                {service.fit.map((f) => (
                  <li key={f}>
                    <span className={styles.check}><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related work ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className={`section ${styles.related}`}>
          <div className="container">
            <span className="label"><i />Proof of work</span>
            <h2 className={`heading-xl ${styles.relatedTitle}`}>
              Built under this <span className="bold">pillar.</span>
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT }}
                >
                  <Link href={`/work/${p.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImageWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumbnail} alt={p.title} className={styles.relatedImage} />
                    </div>
                    <div className={styles.relatedBody}>
                      <span className={styles.relatedMeta}>{p.client} · {p.year}</span>
                      <h3 className={styles.relatedName}>{p.title}</h3>
                      <p className={styles.relatedSummary}>{p.summary}</p>
                      <span className={styles.relatedCta}>
                        Read case study <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Other pillars ────────────────────────────────────── */}
      <section className={`section ${styles.others}`}>
        <div className="container">
          <span className="label"><i />Keep exploring</span>
          <div className={styles.othersGrid}>
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className={styles.otherCard}>
                <span className={styles.otherKicker}>{s.kicker}.</span>
                <span className={styles.otherTitle}>{s.title}</span>
                <span className={styles.otherArrow}><ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Ready to {service.kicker.toLowerCase()}?</h2>
              <p className={styles.ctaSub}>Tell us where you are — we&apos;ll show you the fastest route forward.</p>
            </div>
            <Link href="/start-a-project" className="btn btn-primary">
              Start a Project <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
