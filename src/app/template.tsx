'use client';

import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

/**
 * App Router re-mounts this on every navigation, so it drives the
 * page-enter transition. Kept to opacity + a small rise + clip so it
 * reads as intentional without trapping fixed-position descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, clipPath: 'inset(0 0 6% 0 round 0)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 0)' }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
