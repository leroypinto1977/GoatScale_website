'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText } from '@/lib/gsap';

type SplitKind = 'lines' | 'words' | 'chars';

interface RevealProps {
  children: ReactNode;
  /** Rendered wrapper element. Use the matching heading tag for headings. */
  as?: ElementType;
  /** When set, splits the text and reveals it piece by piece. */
  split?: SplitKind;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
  once?: boolean;
}

/**
 * The site's signature reveal.
 * - `split="lines"` → editorial line-by-line mask reveal (headings).
 * - `split="words" | "chars"` → staggered rise.
 * - no split → element fade + rise.
 * Honors prefers-reduced-motion. Uses the proven plain-effect + gsap.context
 * pattern (auto-reverts on unmount, survives StrictMode remounts).
 */
export default function Reveal({
  children,
  as,
  split,
  className,
  y = 28,
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
  start = 'top 85%',
  once = true,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (split) {
        // autoSplit re-runs onSplit on font load + resize so line breaks
        // stay correct without manual fonts.ready handling.
        SplitText.create(el, {
          type: split,
          mask: split === 'lines' ? 'lines' : undefined,
          autoSplit: true,
          onSplit: (self) => {
            const targets = self[split];
            if (split === 'lines') {
              return gsap.from(targets, {
                yPercent: 115,
                duration,
                ease: 'power4.out',
                stagger,
                delay,
                scrollTrigger: { trigger: el, start, once },
              });
            }
            return gsap.from(targets, {
              opacity: 0,
              y,
              duration: duration * 0.7,
              ease: 'power3.out',
              stagger,
              delay,
              scrollTrigger: { trigger: el, start, once },
            });
          },
        });
        return;
      }

      gsap.set(el, { autoAlpha: 0, y });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once },
      });
    }, ref);

    return () => ctx.revert();
  }, [split, y, delay, stagger, duration, start, once]);

  return (
    <Tag ref={ref} className={className} data-reveal data-split={split || undefined}>
      {children}
    </Tag>
  );
}
