'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={styles.cursor}
      style={{
        x: springX,
        y: springY,
      }}
      aria-hidden="true"
      animate={{
        scale: isHovered ? 2.5 : 1,
        // Use a fully-transparent rgba (not the keyword "transparent") so
        // Framer Motion can interpolate the color instead of warning.
        backgroundColor: isHovered ? 'rgba(183, 231, 161, 0.15)' : 'rgba(183, 231, 161, 0)',
        borderColor: isHovered ? 'rgba(183, 231, 161, 0.5)' : 'rgba(183, 231, 161, 0.3)',
      }}
    >
      <div className={styles.dot} />
    </motion.div>
  );
}
