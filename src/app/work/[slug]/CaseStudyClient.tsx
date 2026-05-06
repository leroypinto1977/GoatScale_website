'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import styles from './page.module.css';

interface Props {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export default function CaseStudyClient({ project, prev, next }: Props) {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.heroImage} alt={project.title} className={styles.heroImg} />
          <div className={styles.heroOverlay} />
        </div>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/work" className={styles.backLink}>← All Work</Link>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>{project.category}</span>
              <span className={styles.badge}>{project.year}</span>
            </div>
            <h1 className={styles.heroTitle}>{project.title}</h1>
            <p className={styles.heroClient}>{project.client}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className={`section ${styles.overview}`}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div>
              <span className="label">The Summary</span>
              <p className={`body-lg ${styles.overviewText}`}>{project.summary}</p>
            </div>
            <div className={styles.metaPanel}>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Client</span>
                <span className={styles.metaVal}>{project.client}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Year</span>
                <span className={styles.metaVal}>{project.year}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Category</span>
                <span className={styles.metaVal}>{project.category}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Stack</span>
                <div className={styles.tagRow}>
                  {project.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className={`section ${styles.textSection}`}>
        <div className="container">
          <div className={styles.textBlock}>
            <span className="label">The Challenge</span>
            <p className={`body-lg ${styles.bodyText}`}>{project.challenge}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className={`section ${styles.textSection} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.textBlock}>
            <span className="label">Our Approach</span>
            <p className={`body-lg ${styles.bodyText}`}>{project.approach}</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className={`section ${styles.results}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label">The Results</span>
          </motion.div>
          <div className={styles.resultsGrid}>
            {project.results.map((r, i) => (
              <motion.div
                key={r.label}
                className={styles.resultCard}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.resultValue}>{r.value}</span>
                <span className={styles.resultLabel}>{r.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallery}>
        <div className={styles.galleryStrip}>
          {project.gallery.map((src, i) => (
            <motion.div
              key={i}
              className={styles.galleryItem}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${project.title} screenshot ${i + 1}`} className={styles.galleryImg} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next/Prev Projects */}
      <section className={`section ${styles.adjacent}`}>
        <div className="container">
          <div className={styles.adjacentGrid}>
            {prev && (
              <Link href={`/work/${prev.slug}`} className={styles.adjCard}>
                <span className={styles.adjDir}>← Previous</span>
                <span className={styles.adjTitle}>{prev.title}</span>
                <span className={styles.adjClient}>{prev.client}</span>
              </Link>
            )}
            {next && (
              <Link href={`/work/${next.slug}`} className={`${styles.adjCard} ${styles.adjRight}`}>
                <span className={styles.adjDir}>Next →</span>
                <span className={styles.adjTitle}>{next.title}</span>
                <span className={styles.adjClient}>{next.client}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Liked what you saw?</h2>
              <p className={styles.ctaSub}>Let&apos;s build something like this — or better — for you.</p>
            </div>
            <Link href="/start-a-project" className="btn btn-primary">Start a Project →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
