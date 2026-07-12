'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';
import styles from './Marquee.module.css';

const items = [
  'NEXT.JS',
  'GSAP',
  'SYSTEM DESIGN',
  'SCALING',
  'FULL-STACK',
  'ARCHITECTURE',
  'WEB APPS',
  'MOBILE APPS',
  'INTERNAL TOOLS',
];

/** Keep a value looping within [min, max). */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export default function Marquee() {
  // Triple the items so wrapping -33.33% loops seamlessly.
  const displayItems = [...items, ...items, ...items];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  // Skew the whole band with scroll velocity for a premium "drag" feel.
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [-7, 0, 7], { clamp: true });

  const x = useTransform(baseX, (v) => `${wrap(-33.333, 0, v)}%`);

  const directionFactor = useRef(1);
  const baseVelocity = 2.4; // % per second

  useAnimationFrame((_, delta) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={styles.marqueeWrapper} aria-hidden="true">
      <motion.div className={styles.track} style={{ x, skewX }}>
        {displayItems.map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.label}>{item}</span>
            <div className={styles.dot} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
