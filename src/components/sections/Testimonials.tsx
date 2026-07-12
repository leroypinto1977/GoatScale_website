'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, viewportOnce } from '@/lib/motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote:
      'Goat Scale turned our chaotic ops into a system that runs itself. What used to take a team a full day now happens before we walk in.',
    name: 'Ravi K.',
    role: 'COO, LogiTrack',
    featured: true,
  },
  {
    quote:
      'They didn’t just ship a website — they architected the engine behind our whole sales motion. Fast, sharp, and zero hand-holding.',
    name: 'Dana M.',
    role: 'Founder, Brightline',
  },
  {
    quote:
      'The most senior team we’ve worked with. Every decision had a reason, and the result scaled exactly like they said it would.',
    name: 'Sam O.',
    role: 'VP Eng, Northwind',
  },
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonials}`} id="testimonials">
      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <span className="label"><i />What clients say</span>
          <h2 className={`display ${styles.title}`}>
            Built once. <span className="bold">Trusted again.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              className={`${styles.card} ${t.featured ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT }}
            >
              <div className={styles.quoteMark} aria-hidden="true">
                &ldquo;
              </div>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
