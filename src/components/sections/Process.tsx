'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We audit your business, your systems, your gaps. No templates. No assumptions. Just a clear picture of where you are and where you need to go.',
  },
  {
    number: '02',
    title: 'Architect',
    description:
      'We design the exact system blueprint your company needs. Every decision is intentional — the tech stack, the workflows, the data flows.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Precision development. Clean code. Shipped on schedule. We move fast without cutting corners — because your clients are watching.',
  },
  {
    number: '04',
    title: 'Scale',
    description:
      "We don't hand off and disappear. We stay, iterate, and grow with you. When you're ready to scale, the system is already ready.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Leaving empty or removing gsap if not needed.
    // We removed the connector lines, so no GSAP animation is needed here anymore.
  }, []);

  return (
    <section className={`section ${styles.process}`} id="process" ref={sectionRef}>
      <div className="container">
        <div className={styles.layout}>
          {/* Sticky Header Left */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label">How We Work</span>
            <h2 className={`heading-xl ${styles.title}`}>
              A process built<br />for <span className={styles.accent}>outcomes.</span>
            </h2>

            <div className={styles.headerExtra}>
              <p className={styles.headerDesc}>
                We don&apos;t just write code. We architect scalable infrastructure that gives your team the velocity they need to win. Everything is custom.
              </p>
              <ul className={styles.principles}>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Zero Templates
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Custom Architecture
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Iterative Scaling
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Scrolling Steps Right */}
          <div className={styles.grid}>
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={styles.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Giant number */}
                <div className={styles.bigNumber}>{step.number}</div>

                {/* Content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
