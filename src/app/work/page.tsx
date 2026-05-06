'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projects';
import type { Project } from '@/lib/projects';
import styles from './page.module.css';

const FILTERS = ['All', 'Web', 'Mobile', 'Branding', 'Strategy'] as const;
type Filter = typeof FILTERS[number];

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={styles.card}
    >
      <Link href={`/work/${project.slug}`} className={styles.cardLink}>
        <div className={styles.cardInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.thumbnail} alt={project.title} className={styles.image} loading="lazy" />
          <div className={styles.overlay} />
          
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={styles.category}>{project.category}</span>
              <span className={styles.year}>{project.year}</span>
            </div>
            
            <div className={styles.cardBottom}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardClient}>{project.client}</p>
              <div className={styles.tags}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<Filter>('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label">Our Work</span>
            <h1 className={styles.heroTitle}>
              Every project,<br />
              <span className={styles.accent}>built to last.</span>
            </h1>
            <p className={styles.heroSub}>
              {projects.length} projects shipped across web, mobile, and internal systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <WorkCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
