'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import { FAQS } from '@/lib/faqs';
import styles from './page.module.css';

function PlusIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      aria-hidden
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </motion.svg>
  );
}

export default function FaqClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <motion.span
            className="label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <i />FAQ
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            Questions, <span className={styles.accent}>answered.</span>
          </motion.h1>
          <motion.p
            className={`body-lg ${styles.sub}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            Everything clients usually ask before working with us. Something missing?{' '}
            <a href="mailto:hello@goatscale.com" className={styles.inlineLink}>Email us</a> — we reply within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.list}>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.04, ease: EASE_OUT }}
                >
                  <button
                    type="button"
                    className={styles.question}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className={styles.qNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.qText}>{f.q}</span>
                    <span className={styles.qIcon}><PlusIcon open={isOpen} /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        className={styles.answerWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      >
                        <p className={styles.answer}>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className={styles.footerCta}>
            <p className={styles.footerCtaText}>Still weighing it up?</p>
            <Link href="/book-a-call" className="btn btn-primary">
              Book a discovery call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
