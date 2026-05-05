'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger so it can sync with Lenis
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for momentum scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Controls the smoothing amount (lower is softer)
      wheelMultiplier: 1.0, // Scroll speed multiplier
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to run Lenis's requestAnimationFrame
    // This ensures animations and scroll updates run in the exact same frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from lagging behind the scroll on heavy loads
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup on unmount to prevent memory leaks
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
