'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/lib/projects';
import styles from './Navbar.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 } as const;

type PanelKey = 'services' | 'work';

type NavItem = {
  key: string;
  label: string;
  href: string;
  /** Hash link (resolved relative to `/` on the homepage). */
  isAnchor?: boolean;
  /** Mega-panel to reveal on hover/focus. */
  panel?: PanelKey;
  /** Section id used for scroll-spy on the homepage. */
  spy?: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'services', label: 'Services', href: '/#services', isAnchor: true, panel: 'services', spy: 'services' },
  { key: 'work', label: 'Work', href: '/work', panel: 'work' },
  { key: 'process', label: 'Process', href: '/#process', isAnchor: true, spy: 'process' },
  { key: 'about', label: 'About', href: '/about' },
];

const SERVICES = [
  { number: '01', slug: 'launch', title: 'Launch — Product Engineering', blurb: 'Websites, landing pages, web apps & mobile apps.' },
  { number: '02', slug: 'operate', title: 'Operate — Business Systems', blurb: 'Custom CRM, ERP, internal tools & automations.' },
  { number: '03', slug: 'transform', title: 'Transform — Digitalisation', blurb: 'Audits, process digitalisation & modernisation.' },
];

function ChevronIcon() {
  return (
    <svg className={styles.chevron} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3.5 5 6.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<PanelKey | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSpy, setActiveSpy] = useState<string | null>(null);

  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Resolve a hash link: bare `#id` on the homepage, full path elsewhere.
  const anchorHref = useCallback(
    (href: string) => (isHome ? href.replace('/#', '#') : href),
    [isHome],
  );

  /* ── Scroll: condense + hide-on-down / reveal-on-up ─────────── */
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > 160 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y < 160) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll-spy for anchor nav items (homepage only) ────────── */
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_ITEMS.filter((i) => i.spy).map((i) => i.spy as string);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSpy(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  /* ── Keyboard handling for panels and the modal mobile menu ─── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPanel(null);
        setMenuOpen(false);
        window.requestAnimationFrame(() => hamburgerRef.current?.focus());
        return;
      }

      if (e.key !== 'Tab' || !menuOpen || !mobileRef.current) return;
      const focusable = [
        hamburgerRef.current,
        ...mobileRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ].filter((element): element is HTMLElement => Boolean(element));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  /* ── Lock scroll (incl. Lenis) while the mobile menu is open ── */
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { start: () => void; stop: () => void } }).lenis;
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* ── Which nav item should the route mark active ────────────── */
  const activeKey =
    NAV_ITEMS.find((i) => {
      if (i.spy && isHome && activeSpy === i.spy) return true;
      if (!i.isAnchor && i.href !== '/' && pathname.startsWith(i.href)) return true;
      return false;
    })?.key ?? null;

  // The link the sliding indicator sits under (hover wins over active).
  const lit = hovered ?? activeKey;

  /* ── Panel open/close with a small close delay to bridge gaps ─ */
  const requestPanel = (panel: PanelKey | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenPanel(panel);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenPanel(null);
      setHovered(null);
    }, 120);
  };

  return (
    <>
      <motion.nav
        className={styles.nav}
        initial={false}
        animate={{ y: hidden && !openPanel && !menuOpen ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        <div className="container">
          <div
            className={styles.bar}
            onMouseLeave={scheduleClose}
          >
            {/* Logo */}
            <Link href="/" className={styles.logo} aria-label="Goat Scale — home">
              <span className={styles.logoMark} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/brand/goatscale-mark.png" alt="" />
              </span>
              <span className={styles.logoText}>
                GOAT<span className={styles.logoAccent}>SCALE</span>
              </span>
            </Link>

            {/* Center nav */}
            <LayoutGroup>
              <ul className={styles.links}>
                {NAV_ITEMS.map((item) => {
                  const isLit = lit === item.key;
                  const isActive = activeKey === item.key;
                  const hasPanel = Boolean(item.panel);
                  const commonProps = {
                    className: `${styles.link} ${isActive ? styles.active : ''}`,
                    onMouseEnter: () => {
                      setHovered(item.key);
                      requestPanel(item.panel ?? null);
                    },
                    onFocus: () => {
                      setHovered(item.key);
                      requestPanel(item.panel ?? null);
                    },
                    'aria-haspopup': hasPanel ? ('true' as const) : undefined,
                    'aria-expanded': hasPanel ? (openPanel === item.panel) : undefined,
                  };
                  return (
                    <li key={item.key} className={styles.linkItem}>
                      {isLit && (
                        <motion.span
                          layoutId="nav-indicator"
                          className={styles.indicator}
                          transition={SPRING}
                        />
                      )}
                      {item.isAnchor ? (
                        <a href={anchorHref(item.href)} {...commonProps}>
                          <span>{item.label}</span>
                          {hasPanel && <ChevronIcon />}
                        </a>
                      ) : (
                        <Link href={item.href} {...commonProps}>
                          <span>{item.label}</span>
                          {hasPanel && <ChevronIcon />}
                        </Link>
                      )}
                      {item.panel && (
                        <div
                          className={styles.panelWrap}
                          onMouseEnter={() => requestPanel(item.panel ?? null)}
                          onMouseLeave={scheduleClose}
                        >
                          {item.panel === 'services' ? (
                            <div className={`${styles.panel} ${styles.panelServices}`}>
                              <div className={styles.panelGrid}>
                                {SERVICES.map((s) => (
                                  <Link key={s.number} href={`/services/${s.slug}`} className={styles.serviceCard}>
                                    <span className={styles.serviceNum}>{s.number}</span>
                                    <span className={styles.serviceTitle}>{s.title}</span>
                                    <span className={styles.serviceBlurb}>{s.blurb}</span>
                                  </Link>
                                ))}
                              </div>
                              <Link href="/start-a-project" className={styles.panelFooter}>
                                <span>Have a project in mind?</span>
                                <span className={styles.panelFooterCta}>
                                  Start a project <ArrowIcon />
                                </span>
                              </Link>
                            </div>
                          ) : (
                            <div className={`${styles.panel} ${styles.panelWork}`}>
                              <div className={styles.panelHead}>
                                <span className="label"><i />Selected Work</span>
                              </div>
                              <ul className={styles.workList}>
                                {projects.slice(0, 4).map((p) => (
                                  <li key={p.slug}>
                                    <Link href={`/work/${p.slug}`} className={styles.workRow}>
                                      <span className={styles.workTitle}>{p.title}</span>
                                      <span className={styles.workMeta}>
                                        {p.client} · {p.year}
                                      </span>
                                      <span className={styles.workCat}>{p.category}</span>
                                      <span className={styles.workArrow}>
                                        <ArrowIcon />
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link href="/work" className={styles.panelFooter}>
                                <span>Every case study</span>
                                <span className={styles.panelFooterCta}>
                                  View all work <ArrowIcon />
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>

            {/* Right actions */}
            <div className={styles.actions}>
              <Link href="/book-a-call" className={styles.ghostLink}>
                Book a call
              </Link>
              <MagneticButton href="/start-a-project" className={`btn btn-primary ${styles.cta}`}>
                Start a Project
                <ArrowIcon />
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ───────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileRef}
            id="mobile-menu"
            className={styles.mobile}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <motion.div
              className={styles.mobileInner}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
              }}
            >
              <nav className={styles.mobileLinks}>
                {NAV_ITEMS.map((item, i) =>
                  item.isAnchor ? (
                    <motion.a
                      key={item.key}
                      href={anchorHref(item.href)}
                      className={styles.mobileLink}
                      onClick={() => setMenuOpen(false)}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                    >
                      <span className={styles.mobileIndex}>0{i + 1}</span>
                      {item.label}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={item.key}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={styles.mobileLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className={styles.mobileIndex}>0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  ),
                )}
              </nav>

              <motion.div
                className={styles.mobileFooter}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <Link
                  href="/start-a-project"
                  className={`btn btn-primary ${styles.mobileCta}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                  <ArrowIcon />
                </Link>
                <div className={styles.mobileMeta}>
                  <a href="mailto:hello@goatscale.com" className={styles.mobileEmail}>
                    hello@goatscale.com
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
