'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projects';
import type { Project } from '@/lib/projects';
import Reveal from '@/components/ui/Reveal';
import { EASE_OUT } from '@/lib/motion';
import styles from './page.module.css';

// Derive filters from the actual project data so we never render a tab
// (e.g. "Branding", "Strategy") that has no projects behind it.
const FILTERS = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
type Filter = (typeof FILTERS)[number];

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
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={index < 4}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
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
          <motion.span
            className="label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <i />Our Work
          </motion.span>
          <Reveal as="h1" split="lines" className={styles.heroTitle} delay={0.15}>
            Every project,<br />
            <span className={styles.accent}>built to last.</span>
          </Reveal>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
          >
            {projects.length} projects shipped across web, mobile, and internal systems.
          </motion.p>
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
