'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import styles from './Manifesto.module.css';

const metrics = [
  { value: 50, suffix: '+', label: 'Systems Deployed' },
  { value: 10, suffix: 'x', label: 'Faster Operations' },
  { value: 3, suffix: '+', label: 'Years of Experience' },
  { value: 100, suffix: '%', label: 'Custom-Built Solutions' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrame: number;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1800;
          const step = (timestamp: number, startTime: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              animationFrame = requestAnimationFrame((t) => step(t, startTime));
            }
          };
          animationFrame = requestAnimationFrame((t) => step(t, t));
        } else {
          // Reset count when scrolled out of view so it can count up again
          setCount(0);
          if (animationFrame) cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const lines = [
  { text: 'Most agencies build you a website', muted: true },
  { text: 'and walk away.', muted: true },
  { text: '', muted: true },
  { text: 'We build the systems underneath it —', muted: false },
  { text: 'the workflows, the automations,', muted: false },
  { text: 'the infrastructure —', muted: false },
  { text: 'so your team moves 10x faster.', accent: true, muted: false },
];

function AnimatedLine({ line }: { line: typeof lines[0] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  
  // Track this specific line's position in the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'center center'], // Start fading in when 80% down, fully visible at exact center
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  
  return (
    <motion.p
      ref={ref}
      className={`${styles.line} ${line.muted ? styles.muted : ''} ${line.accent ? styles.accentLine : ''}`}
      style={{ opacity }}
    >
      {line.text}
    </motion.p>
  );
}

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className={`section ${styles.manifesto}`} id="why">
      <div className="container">
        <div className={styles.inner}>
          {/* Label */}
          <span className="label">
            Why Goat Scale
          </span>

          {/* Editorial statement - Scroll Driven */}
          <div className={styles.statement}>
            {lines.map((line, i) => (
              <AnimatedLine 
                key={i} 
                line={line} 
              />
            ))}
          </div>

          {/* Attribution */}
          <motion.p
            className={styles.attribution}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            — That&apos;s the Goat Scale difference.
          </motion.p>

          {/* Metrics strip */}
          <div className={styles.metricsStrip}>
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className={styles.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={styles.metricValue}>
                  <CountUp target={metric.value} suffix={metric.suffix} />
                </div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
