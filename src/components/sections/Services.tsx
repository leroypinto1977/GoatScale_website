'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';

const services = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Custom, fast, conversion-optimized websites for brands that mean business. Built to perform, engineered to last.',
    tags: ['Next.js', 'React', 'Performance', 'SEO'],
  },
  {
    number: '02',
    title: 'Web Applications',
    description: 'Full-stack platforms built for real scale and real users. From MVPs to enterprise-grade systems — we architect for growth.',
    tags: ['Full-Stack', 'APIs', 'Databases', 'Cloud'],
  },
  {
    number: '03',
    title: 'Mobile Applications',
    description: 'Cross-platform iOS and Android apps that feel native and ship fast. Built with the same precision as our web products.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    number: '04',
    title: 'Systems & Workflows',
    description: 'Internal tools, automations, and workflow systems that make your team operate 10x faster. This is our core USP.',
    tags: ['Automation', 'Internal Tools', 'Integrations', 'Scale'],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className={`section ${styles.services}`} id="services" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className={styles.header}>
          <span className="label">What We Build</span>
          <h2 className={`display ${styles.title}`}>
            Everything you need<br />
            to <span className={styles.accent}>move fast.</span>
          </h2>
        </div>

        {/* Services list */}
        <div className={styles.list}>
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className={`${styles.row} ${activeIndex === index ? styles.active : ''}`}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.rowInner}>
                {/* Number */}
                <span className={styles.number}>{service.number}</span>

                {/* Title */}
                <h3 className={styles.serviceName}>{service.title}</h3>

                {/* Description — visible on hover */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.p
                      className={styles.serviceDesc}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Arrow */}
                <motion.div
                  className={styles.arrow}
                  animate={{ x: activeIndex === index ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>

              {/* Tags */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className={styles.tags}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.divider} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
