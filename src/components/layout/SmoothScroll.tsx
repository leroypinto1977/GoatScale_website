'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced-motion: leave native scrolling untouched.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1.0,
    });

    // Expose for anchor scrolling / debugging.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Keep ScrollTrigger in sync with Lenis.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so scroll + animation share a frame.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate trigger positions once everything is mounted.
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
