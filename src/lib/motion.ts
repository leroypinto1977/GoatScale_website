/**
 * Shared Framer Motion rhythm so every component animates on the same
 * easing + timing as the GSAP layer (mirrors the CSS custom props).
 */
import type { Variants } from 'framer-motion';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const;

/** Once-per-element viewport trigger used across whileInView reveals. */
export const viewportOnce = { once: true, margin: '-80px' } as const;

/** Fade + rise. Pass a custom index to `custom` for staggering. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

/** Container that staggers its direct children's reveals. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Used by children inside a `stagger` container. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};
