'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // Plain effect + gsap timeline (the proven pattern here). GSAP owns all
  // entrance visibility so there's no React/Framer opacity gating to fight.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // leave everything visible

    const lines = headlineRef.current?.querySelectorAll<HTMLElement>(':scope > span') ?? [];
    const fadeTargets = [labelRef.current, subRef.current, ctaRef.current, statsRef.current, mockupRef.current];

    const ctx = gsap.context(() => {
      gsap.set(fadeTargets, { autoAlpha: 0, y: 18 });
      gsap.set(mockupRef.current, { y: 0, scale: 0.94 });
      gsap.set(lines, { yPercent: 100, autoAlpha: 0 });

      // A short lead-in lets it read as a hand-off from the preloader on first
      // paint without coupling to it (decoupled = reliable).
      const w = window as unknown as Record<string, boolean>;
      const lead = w.__gsHeroPlayed ? 0.15 : 0.6;
      w.__gsHeroPlayed = true;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: lead });
      tl.to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(lines, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: 'power4.out' }, '-=0.3')
        .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.55')
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to(statsRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.55')
        .to(mockupRef.current, { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, '-=1.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll parallax.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // Mouse-driven 3D tilt.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.4 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 10);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section ref={containerRef} className={`section ${styles.hero}`} id="home">
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className="container">
        <div className={styles.content}>
          {/* Left — Copy */}
          <div className={styles.left}>
            <div ref={labelRef} className={styles.label}>
              <div className={styles.labelDot} />
              LAUNCH · OPERATE · TRANSFORM
            </div>

            <div className={styles.headline}>
              <h1
                ref={headlineRef}
                className="display"
                aria-label="We build the systems ambitious companies run on."
              >
                <span className={styles.headlineLine}>We build the</span>
                <span className={styles.headlineLine}>
                  <span className={styles.accentLine}>systems</span> ambitious
                </span>
                <span className={styles.headlineLine}>companies run on.</span>
              </h1>
            </div>

            <p ref={subRef} className={`body-lg ${styles.sub}`}>
              Websites, web apps, and mobile products — and the custom CRM,
              ERP, and operating systems underneath them. Designed, engineered,
              and shipped by one senior team.
            </p>

            <div ref={ctaRef} className={styles.ctas}>
              <MagneticButton className="btn btn-primary" href="/start-a-project">
                Start a Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <MagneticButton className="btn btn-outline" href="/work">
                See the Work
              </MagneticButton>
            </div>

            <div ref={statsRef} className={styles.stats}>
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

          {/* Right — Real product work */}
          <div className={styles.right} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div ref={mockupRef} className={styles.mockupOuter}>
              <motion.div className={styles.mockupWrapper} style={{ y: y1, rotateX, rotateY }}>
                {/* Main shot — GOAT ERP, browser-framed */}
                <div className={styles.browserFrame}>
                  <div className={styles.browserHeader}>
                    <div className={styles.macDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.browserUrl}>goat-erp · production</div>
                  </div>
                  <div className={styles.browserBody}>
                    <Image
                      src="/images/work/goaterp-dashboard.png"
                      alt="GOAT ERP — director dashboard, a business operating system built by GoatScale"
                      width={1440}
                      height={900}
                      priority
                      sizes="(max-width: 1024px) 92vw, 640px"
                      className={styles.browserShot}
                    />
                  </div>
                </div>

                {/* Floating secondary shot — Akshara storefront */}
                <motion.div className={styles.floatCard} style={{ y: y2 }}>
                  <Image
                    src="/images/work/akshara-home.png"
                    alt="Akshara — handloom e-commerce storefront built by GoatScale"
                    width={720}
                    height={450}
                    sizes="(max-width: 1024px) 50vw, 300px"
                    className={styles.floatShot}
                  />
                  <div className={styles.floatMeta}>
                    <span className={styles.statusDot} />
                    akshara — live
                  </div>
                </motion.div>
              </motion.div>
            </div>
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
