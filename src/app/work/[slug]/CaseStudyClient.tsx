'use client';

import Link from 'next/link';
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

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className={styles.page}>
      
      {/* 1. Layered Editorial Hero */}
      <section className={styles.editorialHero}>
        {/* Massive Background Typography — KILLS THE EMPTY FEELING */}
        <div className={styles.heroBgText}>
          {project.title.split(' ')[0]}
        </div>

        <div className={styles.heroLayout}>
          {/* Left: Branding & Narrative Layer */}
          <div className={styles.heroLeft}>
            <Link href="/work" className={styles.backLink}>
              <span className={styles.backArrow}>←</span> BACK TO ARCHIVE
            </Link>
            
            <div className={styles.heroMainContent}>
              <motion.div 
                className={styles.titleWrap}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.categoryLabel}>
                  <span className={styles.statusDot} /> {project.category} · {project.year}
                </div>
                <h1 className={styles.mainTitle}>{project.title}</h1>
                <div className={styles.clientLabel}>Built for {project.client}</div>
              </motion.div>

              <motion.div 
                className={styles.heroQuickSpecs}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className={styles.specBox}>
                  <span className={styles.specLabel}>KEY OUTCOME</span>
                  <div className={styles.specValue}>{project.results[0].value}</div>
                </div>
                <div className={styles.specBox}>
                  <span className={styles.specLabel}>TECHNOLOGY</span>
                  <div className={styles.specValue}>{project.tags[0]}</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Framed Cinematic Visual */}
          <motion.div 
            className={styles.heroRight}
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className={styles.visualFrame}>
              <div className={styles.frameHeader}>
                <div className={styles.frameCoord}>REF_ID: GS-{(Math.random() * 1000).toFixed(0)}</div>
                <div className={styles.frameCoord}>40.7128° N, 74.0060° W</div>
              </div>
              <div className={styles.heroImgContainer}>
                <img src={project.heroImage} alt={project.title} className={styles.heroImg} />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.frameFooter}>
                <div className={styles.frameStatus}>
                  PROJECT_LOG // {project.year}
                </div>
                <div className={styles.frameDate}>SECURED_DATA_STREAM</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Blueprint Overview */}
      <section className={styles.blueprintOverview}>
        <div className="container">
          <div className={styles.overviewLayout}>
            <div className={styles.overviewMain}>
              <span className={styles.sectionLabel}>The Thesis</span>
              <p className={styles.summaryText}>{project.summary}</p>
            </div>
            
            <div className={styles.metadataGrid}>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>{project.client}</span>
              </div>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>{project.year}</span>
              </div>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>Domain</span>
                <span className={styles.metaValue}>{project.category}</span>
              </div>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>System Stack</span>
                <div className={styles.stackWrap}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.stackTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Narrative Sections */}
      <section className={styles.narrative}>
        <div className="container">
          <div className={styles.narrativeGrid}>
            <div className={styles.narrativeBlock}>
              <span className={styles.sectionLabel}>Challenge</span>
              <p className={styles.narrativeText}>{project.challenge}</p>
            </div>
            <div className={styles.narrativeBlock}>
              <span className={styles.sectionLabel}>Execution</span>
              <p className={styles.narrativeText}>{project.approach}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Technical Results (Diagnostics style) */}
      <section className={styles.diagnostics}>
        <div className="container">
          <div className={styles.diagnosticsHeader}>
            <span className={styles.sectionLabel}>Performance Data</span>
            <h2 className={styles.diagnosticsTitle}>Quantifiable Impact</h2>
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
    </div>
  );
}
