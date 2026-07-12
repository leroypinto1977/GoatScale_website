'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import styles from './Services.module.css';

const services = [
  {
    number: '01',
    slug: 'launch',
    kicker: 'Launch',
    title: 'Product Engineering',
    description:
      'Everything you need to get to market — designed, built, and shipped fast, with zero template DNA.',
    tags: ['Websites & Landing Pages', 'Web Applications', 'Mobile Apps · iOS & Android', 'MVP Builds'],
  },
  {
    number: '02',
    slug: 'operate',
    kicker: 'Operate',
    title: 'Business Operating Systems',
    description:
      'The CRM, ERP, and internal systems your company runs on — custom-built around how you actually work, not the other way around. This is our core.',
    tags: ['CRM Systems', 'ERP & Inventory', 'Internal Tools & Dashboards', 'Automations & Integrations'],
  },
  {
    number: '03',
    slug: 'transform',
    kicker: 'Transform',
    title: 'Digital Transformation',
    description:
      'We digitalise the way you operate — from spreadsheets and paper trails to a business that runs on rails, with a clear roadmap at every step.',
    tags: ['Transformation Audits', 'Process Digitalisation', 'Legacy Modernisation', 'Tech Strategy'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className={`section ${styles.services}`} id="services" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className={styles.header}>
          <span className="label"><i />What We Do</span>
          <Reveal as="h2" split="lines" className={`display ${styles.title}`}>
            From first launch to full<br />
            <span className={styles.accent}>operating system.</span>
          </Reveal>
        </div>

        {/* Services list */}
        <div className={styles.list}>
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className={styles.row}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/services/${service.slug}`} className={styles.rowInner}>
                {/* Number */}
                <span className={styles.number}>{service.number}</span>

                {/* Title */}
                <div>
                  <span className={styles.kicker}>{service.kicker}</span>
                  <h3 className={styles.serviceName}>{service.title}</h3>
                </div>

                <div className={styles.serviceDetails}>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <div className={styles.tags}>
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className={styles.arrow}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
