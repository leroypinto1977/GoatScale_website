'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TeamReveal.module.css';

const TEAM = [
  {
    id: 'vibisha',
    name: 'VIBISHA',
    role: 'Founder & Lead Engineer',
    desc: 'Turns complex problems into elegant systems. Focuses on architecture, scaling, and ensuring every product we ship is fundamentally sound from the ground up.',
    stats: [
      { label: 'Experience', value: '10+ Yrs' },
      { label: 'Code Shipped', value: '14k+' },
    ],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'arjun',
    name: 'ARJUN M.',
    role: 'Design Lead',
    desc: 'Makes software feel like it belongs in a museum. Obsessed with micro-interactions, typography, and ensuring the user experience is completely frictionless.',
    stats: [
      { label: 'Pixels Pushed', value: '1M+' },
      { label: 'Coffee/Day', value: '4 Cups' },
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function TeamReveal() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        
        {/* Left Side: Content */}
        <div className={styles.content}>
          <div className={styles.sectionLabel}>
            The People
          </div>

          <div className={styles.memberList}>
            {TEAM.map((member, idx) => (
              <div 
                key={member.id}
                className={`${styles.memberBlock} ${activeIndex === idx ? styles.active : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
              >
                <h3 className={styles.name}>{member.name}</h3>
                
                <div className={styles.details}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>The Role: {member.role}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <p className={styles.detailText}>{member.desc}</p>
                  </div>
                </div>

                <div className={styles.statsRow}>
                  {member.stats.map((stat, sIdx) => (
                    <div key={sIdx} className={styles.stat}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Reveal */}
        <div className={styles.visualWrap}>
          <AnimatePresence>
            <motion.img
              key={activeIndex}
              src={TEAM[activeIndex].image}
              alt={TEAM[activeIndex].name}
              className={styles.image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
