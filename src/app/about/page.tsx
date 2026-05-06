'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';




const STATS = [
  { value: '12+', label: 'Projects delivered' },
  { value: '3', label: 'Industries served' },
  { value: '100%', label: 'On-time delivery' },
  { value: '24h', label: 'Average response time' },
];

const TEAM = [
  {
    name: 'KENNET ALPHY',
    title: 'FOUNDER & LEAD ENGINEER',
    tagline: 'Built on the belief that code should be as elegant as it is powerful. Kennet leads the technical vision at Goat Scale.',
    image: '/images/kennet_hq.jpg',
    eye: '/images/kennet_collage.png', // Silhouette edit
    abstract: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', // Architecture
  },
  {
    name: 'ALFRED JOSHUA',
    title: 'DESIGN LEAD',
    tagline: 'Obsessed with the intersection of architecture and interaction. Alfred ensures every pixel serves a purpose.',
    image: '/images/alfred_main.png',
    abstract: '/images/alfred_grey.jpg', // Standing detail edit
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
};

export default function AboutPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="label">Who We Are</span>
            <h1 className={styles.heroTitle}>
              We are<br />
              <span className={styles.accent}>Goat Scale.</span>
            </h1>
            <p className={styles.heroSub}>
              A small, sharp dev agency that builds the websites, apps, and internal systems
              that help ambitious companies move faster than they thought possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Gallery */}
      <section className={styles.bentoGallery}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className={styles.bentoGrid}>
            
            {/* Large Left */}
            <div className={`${styles.bentoItem} ${styles.bentoLarge}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" alt="Team collaborating" />
            </div>

            {/* Top Right Wide */}
            <div className={`${styles.bentoItem} ${styles.bentoWide}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Whiteboard session" />
            </div>

            {/* Bottom Right Small 1 */}
            <div className={`${styles.bentoItem} ${styles.bentoSmall}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80" alt="Desk setup" />
            </div>

            {/* Bottom Right Small 2 */}
            <div className={`${styles.bentoItem} ${styles.bentoSmall}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="Office space" />
            </div>

          </motion.div>
        </div>
      </section>

      {/* Editorial Story */}
      <section className={styles.storyTextSection}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.storyArticle}>
            <span className="label">Our Story</span>
            <h2 className={`heading-lg ${styles.storyTitle}`}>Built from a belief that good software changes everything.</h2>
            <div className={styles.storyParagraphs}>
              <p className="body-lg">
                Goat Scale started with a simple observation: most businesses are drowning in tools that don&apos;t talk to each other, processes that create more work than they save, and websites that look generic because they were built from a template.
              </p>
              <p className="body-lg">
                We started building differently — with intention, with system-level thinking, and with a relentless focus on what actually matters: outcomes for our clients and their users.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Marquee Ticker */}
      <section className={styles.statsTicker}>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerInner}>
            {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
              <span key={`b1-${i}`} className={styles.tickerItem}>
                <span className={styles.tickerValue}>{s.value}</span>
                <span className={styles.tickerLabel}>{s.label}</span>
                <span className={styles.tickerDot}>·</span>
              </span>
            ))}
          </div>
          <div className={styles.tickerInner}>
            {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
              <span key={`b2-${i}`} className={styles.tickerItem}>
                <span className={styles.tickerValue}>{s.value}</span>
                <span className={styles.tickerLabel}>{s.label}</span>
                <span className={styles.tickerDot}>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine People Section */}
      <section className={styles.magazineSection}>
        <div className={styles.magazineHeader}>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={styles.magazineTitle}
          >
            GOAT SCALE MINDS
          </motion.h2>
        </div>

        <div className="container">
          <div className={styles.magazineGridTwoCol}>
            
            {/* Column 1: KENNET ALPHY */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.memberColumn}
            >
              <div className={styles.mainPortraitWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEAM[0].image} alt={TEAM[0].name} className={styles.mainPortrait} />
              </div>

              <div className={styles.editorialRow}>
                <div className={styles.detailShotWrap}>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={TEAM[0].eye} alt="Collage detail" className={styles.detailShot} />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{TEAM[0].name}</h3>
                  <div className={styles.memberRole}>{TEAM[0].title}</div>
                  <p className={styles.memberTagline}>{TEAM[0].tagline}</p>
                </div>
              </div>
            </motion.div>

            {/* Column 2: ALFRED JOSHUA */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.memberColumn}
            >
              <div className={styles.mainPortraitWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEAM[1].image} alt={TEAM[1].name} className={styles.mainPortrait} />
              </div>

              <div className={styles.editorialRow}>
                <div className={styles.detailShotWrap}>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={TEAM[1].abstract} alt="Standing detail" className={styles.detailShot} />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{TEAM[1].name}</h3>
                  <div className={styles.memberRole}>{TEAM[1].title}</div>
                  <p className={styles.memberTagline}>{TEAM[1].tagline}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Work with people who care.</h2>
              <p className={styles.ctaSub}>We&apos;re selective about what we take on — because we give everything to what we do.</p>
            </div>
            <Link href="/start-a-project" className="btn btn-primary">Start a Project →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
