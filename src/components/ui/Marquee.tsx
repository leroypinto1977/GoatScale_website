'use client';

import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
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

export default function Marquee() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [1, 5], {
    clamp: false
  });

  // Triple the items for a smooth infinite scroll
  const displayItems = [...items, ...items, ...items];

  return (
    <div className={styles.marqueeWrapper}>
      <motion.div 
        className={styles.track}
        style={{ x: useTransform(velocityFactor, (v) => `${-v * 5}%`) }}
      >
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
