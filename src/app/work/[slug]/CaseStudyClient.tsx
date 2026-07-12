'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '@/lib/projects';
import styles from './page.module.css';

interface Props {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export default function CaseStudyClient({ project, prev, next }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  return (
    <div ref={containerRef} className={styles.page}>
      {/* 1. Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <Link href="/work" className={styles.backLink}>
            <span aria-hidden="true">←</span> All case studies
          </Link>

          <motion.div
            className={styles.heroHead}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.categoryLabel}>
              <span className={styles.statusDot} />
              {project.category} · {project.sector} · {project.year}
            </div>
            <h1 className={styles.mainTitle}>{project.title}</h1>
            <p className={styles.lede}>{project.summary}</p>

            <div className={styles.heroActions}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit live site
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              <Link href="/start-a-project" className="btn btn-outline">
                Build something like this
              </Link>
            </div>
          </motion.div>

          {/* Hero visual — browser-framed, parallaxed */}
          <motion.div
            className={styles.heroVisual}
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.browserFrame}>
              <div className={styles.frameHeader}>
                <div className={styles.macDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.frameUrl}>
                  {project.liveUrl
                    ? project.liveUrl.replace(/^https?:\/\//, '')
                    : `${project.slug} · production`}
                </div>
              </div>
              <div className={styles.heroImgContainer}>
                <Image
                  src={project.heroImage}
                  alt={`${project.title} — product interface`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1180px"
                  className={styles.heroImg}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Meta strip */}
      <section className={styles.metaStrip}>
        <div className="container">
          <div className={styles.metadataGrid}>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Client</span>
              <span className={styles.metaValue}>{project.client}</span>
            </div>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Sector</span>
              <span className={styles.metaValue}>{project.sector}</span>
            </div>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Stack</span>
              <div className={styles.stackWrap}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.stackTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Narrative */}
      <section className={styles.narrative}>
        <div className="container">
          <div className={styles.narrativeGrid}>
            <div className={styles.narrativeBlock}>
              <span className={styles.sectionLabel}>The challenge</span>
              <p className={styles.narrativeText}>{project.challenge}</p>
            </div>
            <div className={styles.narrativeBlock}>
              <span className={styles.sectionLabel}>What we did</span>
              <p className={styles.narrativeText}>{project.approach}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What we built */}
      <section className={styles.features}>
        <div className="container">
          <span className={styles.sectionLabel}>What we built</span>
          <div className={styles.featureGrid}>
            {project.features.map((feature, i) => (
              <motion.div
                key={feature}
                className={styles.featureItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <span className={styles.featureIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.featureText}>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. By the numbers */}
      <section className={styles.diagnostics}>
        <div className="container">
          <div className={styles.diagnosticsHeader}>
            <span className={styles.sectionLabel}>By the numbers</span>
          </div>

          <div className={styles.resultsGrid}>
            {project.results.map((result, i) => (
              <motion.div
                key={i}
                className={styles.resultItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.resultValue}>{result.value}</div>
                <div className={styles.resultLabel}>{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery */}
      {project.gallery.length > 1 && (
        <section className={styles.gallery}>
          <div className="container">
            <span className={styles.sectionLabel}>Inside the product</span>
            <div className={styles.galleryGrid}>
              {project.gallery.slice(1).map((src, i) => (
                <motion.figure
                  key={src}
                  className={styles.galleryItem}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — product view ${i + 2}`}
                    width={1440}
                    height={900}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.galleryImg}
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA band */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>
              Need a system like this<span className="bold"> in your business?</span>
            </h2>
            <p className={styles.ctaSub}>
              Tell us where you are — we&apos;ll show you the fastest route forward.
              Fixed-price proposal, you own 100% of the code.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/start-a-project" className="btn btn-primary">
                Start a Project
              </Link>
              <Link href="/book-a-call" className="btn btn-outline">
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Prev / Next navigation */}
      <nav className={styles.pagination} aria-label="More projects">
        <div className="container">
          <div className={styles.paginationGrid}>
            {prev ? (
              <Link href={`/work/${prev.slug}`} className={styles.pagLink}>
                <span className={styles.pagDir}>← Previous</span>
                <span className={styles.pagTitle}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/work/${next.slug}`} className={`${styles.pagLink} ${styles.pagNext}`}>
                <span className={styles.pagDir}>Next →</span>
                <span className={styles.pagTitle}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
