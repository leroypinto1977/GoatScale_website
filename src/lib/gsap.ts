/**
 * Single source of truth for GSAP + plugins.
 * GSAP 3.13+ ships every plugin free, so SplitText / ScrollTrigger are
 * registered once here and re-exported. registerPlugin is idempotent.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
