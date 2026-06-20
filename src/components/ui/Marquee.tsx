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
  // Triple the items so the CSS keyframe (translateX -33.33%) loops seamlessly.
  // The scroll is driven entirely by CSS animation, which is paused under
  // `prefers-reduced-motion` via the global rule in globals.css.
  const displayItems = [...items, ...items, ...items];

  return (
    <div className={styles.marqueeWrapper} aria-hidden="true">
      <div className={styles.track}>
        {displayItems.map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.label}>{item}</span>
            <div className={styles.dot} />
          </div>
        ))}
      </div>
    </div>
  );
}
