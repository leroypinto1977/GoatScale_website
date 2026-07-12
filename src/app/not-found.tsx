'use client';

import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.inner}`}>
        <motion.span
          className="label"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <i />Error 404
        </motion.span>

        <motion.div
          className={styles.code}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
        >
          4<span className={styles.zero}>0</span>4
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
        >
          This page didn&apos;t <span className="bold">scale.</span>
        </motion.h1>

        <motion.p
          className={`body-lg ${styles.desc}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
        >
          The link is broken or the page has moved. Let&apos;s get you back to
          something that works.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
        >
          <MagneticButton href="/" className="btn btn-primary">
            Back Home
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/work" className="btn btn-outline">
            View Our Work
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
