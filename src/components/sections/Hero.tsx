'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Hero.module.css';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const words = headlineRef.current?.querySelectorAll('.word') || [];

    tl.fromTo(
      words,
      { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.0, stagger: 0.1, ease: 'power4.out' }
    )
    .fromTo(
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

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.content}`}>
        <div className={styles.left}>
          {/* Label */}
          <div className={styles.label}>
            <span className={styles.labelDot} />
            Dev Agency · Systems · Scale
          </div>

          {/* Headline */}
          <div className={styles.headline}>
            <h1 ref={headlineRef}>
              <span className="word" style={{ display: 'inline-block' }}>We</span>{' '}
              <span className="word" style={{ display: 'inline-block' }}>build</span>{' '}
              <span className="word" style={{ display: 'inline-block' }}>the</span>
              <br />
              <span className={`${styles.accentLine} word`} style={{ display: 'inline-block' }}>systems</span>{' '}
              <span className="word" style={{ display: 'inline-block' }}>that</span>
              <br />
              <span className="word" style={{ display: 'inline-block' }}>let</span>{' '}
              <span className="word" style={{ display: 'inline-block' }}>you</span>{' '}
              <span className="word" style={{ display: 'inline-block' }}>scale.</span>
            </h1>
          </div>

          {/* Sub-copy */}
          <p
            ref={subRef}
            className={`body-lg ${styles.sub}`}
            style={{ opacity: 0 }}
          >
            We design and build websites, web apps, and mobile applications —
            and the internal workflows that help your company move 10x faster.
          </p>

          {/* CTAs */}
          <div className={styles.ctas} ref={ctaRef} style={{ opacity: 0 }}>
            <MagneticButton className={`btn btn-primary`}>
              See Our Work
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" />
              </svg>
            </MagneticButton>
            <MagneticButton className={`btn btn-outline`}>
              Start a Project
            </MagneticButton>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { value: '50+', label: 'Systems Built' },
              { value: '10x', label: 'Faster Operations' },
              { value: '3+', label: 'Years Building' },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual panel */}
        <div className={styles.right}>
          <motion.div
            className={styles.mockupWrapper}
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Code Window */}
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
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                </div>
                <pre className={styles.codeBlock}>
                  <code>
                    <span className={styles.keyword}>export class</span> <span className={styles.class}>ScaleEngine</span> {'{'}
                    {'\n'}  <span className={styles.keyword}>private</span> architecture: <span className={styles.type}>System[]</span>;
                    {'\n'}
                    {'\n'}  <span className={styles.keyword}>constructor</span>(config: <span className={styles.type}>Config</span>) {'{'}
                    {'\n'}    <span className={styles.keyword}>this</span>.architecture = <span className={styles.function}>buildScalableCore</span>(config);
                    {'\n'}  {'}'}
                    {'\n'}
                    {'\n'}  <span className={styles.keyword}>public</span> <span className={styles.function}>deploy</span>() {'{'}
                    {'\n'}    <span className={styles.keyword}>return this</span>.architecture.<span className={styles.function}>launch</span>();
                    {'\n'}  {'}'}
                    {'\n'}{'}'}
                  </code>
                </pre>
              </div>
            </div>

            {/* Overlapping Performance Widget */}
            <motion.div 
              className={styles.widget}
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <div className={styles.widgetHeader}>
                <span className={styles.statusDot}></span>
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

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
