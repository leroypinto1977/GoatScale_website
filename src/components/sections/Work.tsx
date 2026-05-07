'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Work.module.css';

const projects = [
  {
    id: 1,
    title: 'FlowDesk CRM',
    category: 'Web Application',
    description: 'A full-stack CRM system built for a logistics company, replacing 6 manual spreadsheet workflows with one unified platform.',
    image: '/images/projects/flowdesk-thumb.png',
    tags: ['Next.js', 'PostgreSQL', 'System Design'],
    featured: true,
  },
  {
    id: 2,
    title: 'Pulse Mobile',
    category: 'Mobile App',
    description: 'Cross-platform fitness tracking app with real-time data sync and AI-powered coaching.',
    image: '/images/projects/pulse-thumb.png',
    tags: ['React Native', 'Node.js'],
    featured: false,
  },
  {
    id: 3,
    title: 'Meridian Studios',
    category: 'Web Development',
    description: 'Brand website for a premium creative studio. Zero-bloat, 100 Lighthouse score, fully animated.',
    image: '/images/projects/meridian-thumb.png',
    tags: ['Next.js', 'GSAP', 'CMS'],
    featured: false,
  },
  {
    id: 4,
    title: 'WarehouseOS',
    category: 'Internal System',
    description: 'End-to-end warehouse management system with live inventory tracking and automated reorder workflows.',
    image: '/images/projects/warehouse-thumb.png',
    tags: ['React', 'Python', 'Automation'],
    featured: true,
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <motion.img
          src={project.image}
          alt={project.title}
          className={styles.actualImage}
          loading="lazy"
          style={{ y, scale: 1.2 }} /* Over-scale slightly to provide padding for parallax */
        />
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.category}>{project.category}</span>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
      </div>
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
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label">Selected Work</span>
          <div className={styles.headerRow}>
            <h2 className={`display ${styles.title}`}>
              Work that<br />
              <span className={styles.accent}>speaks for itself.</span>
            </h2>
            <p className={`body-base ${styles.headerDesc}`}>
              A few of the systems, platforms, and products
              we&apos;ve shipped for clients across industries.
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className={styles.grid}>
          <div className={styles.col1}>
            <ProjectCard project={projects[0]} featured delay={0} />
            <ProjectCard project={projects[2]} delay={0.1} />
          </div>
          <motion.div className={styles.col2} style={{ y: y2 }}>
            <ProjectCard project={projects[1]} delay={0.15} />
            <ProjectCard project={projects[3]} featured delay={0.05} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
