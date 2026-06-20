'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Hero.module.css';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // The headline is two line spans (direct children of the h1). Reveal
    // them with a staggered clip — the previous `.word` selector matched
    // nothing, so this both fixes the dead animation and clears the
    // "GSAP target not found" warning.
    const lines = headlineRef.current?.querySelectorAll(':scope > span') ?? [];

    if (lines.length) {
      tl.fromTo(
        lines,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.0, stagger: 0.1, ease: 'power4.out' }
      );
    }

    tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );

  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, 15]);

  return (
    <section ref={containerRef} className={`section ${styles.hero}`} id="home">
      <div className="container">
        <div className={styles.content}>
          {/* Left Side — Copy */}
          <div className={styles.left}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.label}
            >
              <div className={styles.labelDot} />
              DEV AGENCY · SYSTEMS · SCALE
            </motion.div>

            {/* Headline */}
            <div className={styles.headline}>
              <h1 ref={headlineRef} className="display">
                <span className={styles.headlineLine}>
                  We build the <span className={styles.accentLine}>systems</span>
                </span>
                <span className={styles.headlineLine}>
                  that let you <span className={styles.accentLine}>scale.</span>
                </span>
              </h1>
            </div>

            {/* Sub-copy */}
            <p
              ref={subRef}
              className={`body-lg ${styles.sub}`}
              style={{ opacity: 0 }}
            >
              We design and build websites, web apps, and mobile applications —
              and the internal workflows that help your company move fast.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className={styles.ctas} style={{ opacity: 0 }}>
              <MagneticButton className="btn btn-primary" href="/work">
                See Our Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <MagneticButton className="btn btn-outline" href="/book-a-call">
                Book a Call
              </MagneticButton>
            </div>

            {/* Quick Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>50+</span>
                <span className={styles.statLabel}>Systems Built</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>10x</span>
                <span className={styles.statLabel}>Faster Operations</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>3+</span>
                <span className={styles.statLabel}>Years Building</span>
              </div>
            </div>
          </div>

          {/* Right Side — Visual Reveal */}
          <div className={styles.right}>
            <motion.div 
              className={styles.mockupWrapper}
              style={{ y: y1, rotateX }}
            >
              <div className={styles.codeWindow}>
                <div className={styles.windowHeader}>
                  <div className={styles.macDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.windowTitle}>system_core.ts</div>
                </div>
                <div className={styles.windowBody}>
                  <div className={styles.lineNumbers}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <pre className={styles.codeBlock}>
                    <code>
                      <div><span className={styles.keyword}>export class</span> <span className={styles.class}>ScaleEngine</span> {'{'}</div>
                      <div>&nbsp;&nbsp;<span className={styles.keyword}>private</span> architecture: <span className={styles.type}>System[]</span>;</div>
                      <br />
                      <div>&nbsp;&nbsp;<span className={styles.keyword}>constructor</span>(config: <span className={styles.type}>Config</span>) {'{'}</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.keyword}>this</span>.architecture = <span className={styles.function}>buildScalableCore</span>(config);</div>
                      <div>&nbsp;&nbsp;{'}'}</div>
                      <br />
                      <div>&nbsp;&nbsp;<span className={styles.keyword}>public</span> <span className={styles.function}>deploy</span>() {'{'}</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.keyword}>return this</span>.architecture.<span className={styles.function}>launch</span>();</div>
                      <div>&nbsp;&nbsp;{'}'}</div>
                      <div>{'}'}</div>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Floating Widget */}
              <motion.div 
                className={styles.widget}
                style={{ y: y2 }}
              >
                <div className={styles.widgetHeader}>
                  <div className={styles.statusDot} />
                  Global Edge Network
                </div>
                <div className={styles.widgetBody}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Latency</span>
                    <span className={styles.metricValue}>12ms</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Uptime</span>
                    <span className={styles.metricValue}>99.99%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
