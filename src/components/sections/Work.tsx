'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { EASE_OUT, viewportOnce } from '@/lib/motion';
import { projects, type Project } from '@/lib/projects';
import styles from './Work.module.css';

/* Featured on the homepage — the four strongest, in display order. */
const FEATURED_SLUGS = ['goat-erp', 'akshara', 'alpio', 'evherfit'];
const featuredProjects = FEATURED_SLUGS.map(
  (slug) => projects.find((p) => p.slug === slug)!
).filter(Boolean);

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  delay?: number;
}

function ProjectCard({ project, featured, delay = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      style={{ position: 'relative' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.slug}`} className={styles.cardLink}>
        {/* Image — clip-path wipe reveal + parallax */}
        <motion.div
          className={styles.imageWrap}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_OUT, delay: delay + 0.1 }}
        >
          <motion.img
            src={project.thumbnail}
            alt={`${project.title} — ${project.summary}`}
            className={styles.actualImage}
            loading="lazy"
            style={{ y, scale: 1.2 }} /* Over-scale slightly to provide padding for parallax */
          />
        </motion.div>

        {/* Content */}
        <div className={styles.cardContent}>
          <div className={styles.cardMeta}>
            <span className={styles.category}>{project.category}</span>
            <div className={styles.tags}>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDesc}>{project.summary}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax the second column up slightly as you scroll
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={`section ${styles.work}`} id="work">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <motion.span
            className="label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <i />Selected Work
          </motion.span>
          <div className={styles.headerRow}>
            <Reveal as="h2" split="lines" className={`display ${styles.title}`}>
              Real systems,<br />
              <span className={styles.accent}>running real businesses.</span>
            </Reveal>
            <motion.p
              className={`body-base ${styles.headerDesc}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            >
              ERPs, storefronts, client portals, and franchise platforms —
              shipped for real clients, shown as they run in production.
            </motion.p>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className={styles.grid}>
          <div className={styles.col1}>
            <ProjectCard project={featuredProjects[0]} featured delay={0} />
            <ProjectCard project={featuredProjects[2]} delay={0.1} />
          </div>
          <motion.div className={styles.col2} style={{ y: y2 }}>
            <ProjectCard project={featuredProjects[1]} delay={0.15} />
            <ProjectCard project={featuredProjects[3]} featured delay={0.05} />
          </motion.div>
        </div>

        {/* All-work CTA */}
        <motion.div
          className={styles.allWork}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        >
          <Link href="/work" className="btn btn-outline">
            All {projects.length} case studies
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
