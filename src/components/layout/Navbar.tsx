'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scroll progress bar
      const progress = document.getElementById('scroll-progress');
      if (progress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${(scrollTop / docHeight) * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <div id="scroll-progress" />
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>▲</span>
            Goat Scale
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className={`btn btn-primary ${styles.cta}`}>
            Let&apos;s Talk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.mobileLink} onClick={handleNavClick}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className={`btn btn-primary ${styles.mobileCta}`} onClick={handleNavClick}>
                Let&apos;s Talk →
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
