'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './Preloader.module.css';

/** Fires the signal the hero waits on to begin its intro. Sets a flag too
 *  so a hero that mounts after this point can't miss the event. */
function fireReveal() {
  (window as unknown as { __gsRevealed?: boolean }).__gsRevealed = true;
  window.dispatchEvent(new Event('gs:reveal'));
}

const SESSION_KEY = 'gs:intro-played';

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // useGSAP runs in a layout effect (pre-paint), so deciding here avoids
  // both a hydration mismatch (sessionStorage during render) and any flash
  // of the curtain on repeat views.
  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const played = sessionStorage.getItem(SESSION_KEY);

    if (reduced || played) {
      gsap.set(rootRef.current, { display: 'none' });
      fireReveal();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => sessionStorage.setItem(SESSION_KEY, '1'),
    });

    tl.set(rootRef.current, { autoAlpha: 1 })
      .from(wordmarkRef.current, { yPercent: 120, duration: 0.5, ease: 'power4.out' })
      .to(
        counter,
        {
          v: 100,
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.v)).padStart(2, '0');
            }
          },
        },
        0.1,
      )
      // Reveal the page underneath as the curtain begins to lift.
      .add(fireReveal, '-=0.15')
      .to(wordmarkRef.current, { yPercent: -120, duration: 0.4, ease: 'power3.in' }, '-=0.05')
      .to(rootRef.current, { yPercent: -100, duration: 0.55, ease: 'power4.inOut' }, '-=0.2')
      .set(rootRef.current, { display: 'none' });
  });

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.inner}>
        <div className={styles.wordmarkMask}>
          <div ref={wordmarkRef} className={styles.wordmark}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand/goatscale-lockup.png" alt="Goat Scale" className={styles.wordmarkImg} />
          </div>
        </div>
        <div className={styles.meta}>
          <span className={styles.tag}>Launch · Operate · Transform</span>
          <span ref={countRef} className={styles.count}>
            00
          </span>
        </div>
      </div>
    </div>
  );
}
