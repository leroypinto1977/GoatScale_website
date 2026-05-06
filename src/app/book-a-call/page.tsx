'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function BookACallPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="square" />
            </svg>
            Back to Home
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label">Scheduler</span>
            <h1 className={styles.title}>Book a discovery call.</h1>
            <p className={styles.subtitle}>
              Pick a time that works for you. No sales pressure — just a conversation 
              about your goals and how we can help you scale.
            </p>
          </motion.div>
        </header>

        {/* Scheduler Section */}
        <section className={styles.schedulerSection}>
          <motion.div 
            className={styles.schedulerPlaceholder}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 
              Future Calendly Embed will go here.
              Example: <CalendlyEmbed url="YOUR_LINK_HERE" />
            */}
            <div className={styles.placeholderContent}>
              <div className={styles.placeholderIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3>Calendar Placeholder</h3>
              <p>Your Calendly or booking scheduler will be embedded here.</p>
            </div>
          </motion.div>
        </section>

        {/* Expectation Cards */}
        <section className={styles.expectations}>
          <div className={styles.expectationGrid}>
            <div className={styles.expectationCard}>
              <span className={styles.cardNumber}>01</span>
              <h4>Technical Review</h4>
              <p>We&apos;ll dive into your current tech stack and identify immediate bottlenecks.</p>
            </div>
            <div className={styles.expectationCard}>
              <span className={styles.cardNumber}>02</span>
              <h4>Strategic Roadmap</h4>
              <p>Get a high-level plan of how we would approach your specific scaling challenges.</p>
            </div>
            <div className={styles.expectationCard}>
              <span className={styles.cardNumber}>03</span>
              <h4>Direct Access</h4>
              <p>Talk directly with our lead engineers and designers. No gatekeepers.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
