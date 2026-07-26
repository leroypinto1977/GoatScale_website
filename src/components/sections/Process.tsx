'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import styles from './Process.module.css';

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

function ProcessStep({ step }: { step: typeof steps[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.58, 1, 1, 0.58]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
  const numberColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["rgba(69, 133, 172, 0.18)", "rgba(69, 133, 172, 1)", "rgba(69, 133, 172, 1)", "rgba(69, 133, 172, 0.18)"]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, position: 'relative' }}
      className={styles.step}
    >
      {/* Giant number */}
      <motion.div 
        style={{ color: numberColor }}
        className={styles.bigNumber}
      >
        {step.number}
      </motion.div>

      {/* Content */}
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDesc}>{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className={`section ${styles.process}`} id="process" ref={containerRef}>
      <div className="container">
        <div className={styles.layout}>
          {/* Sticky Header Left */}
          <div className={styles.header}>
            <span className="label"><i />How We Work</span>
            <Reveal as="h2" split="lines" className={`display ${styles.title}`}>
              A process built<br />for <span className={styles.boldAccent}>outcomes.</span>
            </Reveal>

            <div className={styles.headerExtra}>
              <p className={styles.headerDesc}>
                We don&apos;t just write code. We architect scalable infrastructure that gives your team the velocity they need to win.
              </p>
              <ul className={styles.principles}>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Zero Templates
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Custom Architecture
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Iterative Scaling
                </li>
              </ul>
            </div>
          </div>

          {/* Scrolling Steps Right */}
          <div className={styles.grid}>
            {/* Progress Line */}
            <div className={styles.progressLineBg}>
              <motion.div 
                className={styles.progressLineActive}
                style={{ scaleY, originY: 0 }}
              />
            </div>

            {steps.map((step) => (
              <ProcessStep key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
