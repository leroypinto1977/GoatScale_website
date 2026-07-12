'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

type Step = 1 | 2 | 3 | 4;

const BUDGET_OPTIONS = ['Under ₹50K','₹50K – ₹1L','₹1L – ₹5L','₹5L – ₹20L','₹20L+','Not sure yet'];
const TIMELINE_OPTIONS = ['ASAP','1–2 months','3–6 months','6+ months','Flexible'];
const HOW_OPTIONS = ['Google / Search','Referred by someone','LinkedIn','Instagram','Word of mouth','Other'];
const PROJECT_TYPES = [
  { id: 'website', label: 'Website / Landing Page' },
  { id: 'web', label: 'Web App' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'system', label: 'CRM / ERP System' },
  { id: 'automation', label: 'Internal Tools & Automation' },
  { id: 'transformation', label: 'Digital Transformation' },
];

const svg = (paths: React.ReactNode) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

const TYPE_ICONS: Record<string, React.ReactNode> = {
  web: svg(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>),
  mobile: svg(<><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>),
  website: svg(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>),
  system: svg(<><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></>),
  automation: svg(<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />),
  transformation: svg(<><path d="M4 17l5-5-5-5M12 19h8M12 5h8M12 12h4" /></>),
};

const slideV = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d < 0 ? 60 : -60, opacity: 0 }),
};

export default function StartAProjectPage() {
  const [step, setStep] = useState<Step>(1);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', projectType:'', budget:'', timeline:'', brief:'', how:'', companyWebsite:'' });

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));
  const goTo = (next: Step) => { setDir(next > step ? 1 : -1); setStep(next); };
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const submitBrief = async () => {
    setSending(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/project-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const firstError =
          data?.errors && typeof data.errors === 'object'
            ? Object.values(data.errors)[0]
            : data?.error;
        throw new Error((firstError as string) || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }} className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.successTitle}>We&apos;ve got your brief.</h1>
            <p className={styles.successSub}>We&apos;ll get back to you within <strong>24 hours</strong> at <strong>{form.email}</strong>.</p>
            <Link href="/" className="btn btn-primary">Back to Home →</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.formSide}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.formHeader}>
            <span className="label"><i />Let&apos;s Work Together</span>
            <h1 className={styles.pageTitle}>Let&apos;s build<br /><span className={styles.accent}>something great.</span></h1>
          </motion.div>

          <div className={styles.stepIndicator}>
            {([1,2,3,4] as Step[]).map(s => (
              <div key={s} className={`${styles.stepDot} ${step >= s ? styles.stepDotActive : ''}`}><span>{s}</span></div>
            ))}
            <div className={styles.stepTrack}><div className={styles.stepFill} style={{ width: `${((step-1)/3)*100}%` }} /></div>
          </div>

          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="sp-company-website">Company website</label>
              <input id="sp-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} />
            </div>
            <AnimatePresence mode="wait" custom={dir}>
              {step === 1 && (
                <motion.div key="s1" custom={dir} variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease:[0.16,1,0.3,1] }} className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>About you</h2>
                  <div className={styles.fieldGroup}>
                    <div className={styles.field}><label className={styles.label} htmlFor="sp-name">Your Name *</label><input id="sp-name" name="name" className={styles.input} type="text" placeholder="Alex Johnson" value={form.name} onChange={e => set('name', e.target.value)} maxLength={120} autoComplete="name" required /></div>
                    <div className={styles.field}><label className={styles.label} htmlFor="sp-company">Company</label><input id="sp-company" name="company" className={styles.input} type="text" placeholder="Acme Inc. (optional)" value={form.company} onChange={e => set('company', e.target.value)} maxLength={200} autoComplete="organization" /></div>
                    <div className={styles.field}><label className={styles.label} htmlFor="sp-email">Email *</label><input id="sp-email" name="email" className={styles.input} type="email" placeholder="alex@company.com" value={form.email} onChange={e => set('email', e.target.value)} maxLength={254} autoComplete="email" required /></div>
                    <div className={styles.field}><label className={styles.label} htmlFor="sp-phone">Phone (optional)</label><input id="sp-phone" name="phone" className={styles.input} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} maxLength={40} autoComplete="tel" /></div>
                  </div>
                  <button type="button" className="btn btn-primary" disabled={!form.name.trim() || !hasValidEmail} onClick={() => goTo(2)}>Next: Your Project →</button>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" custom={dir} variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease:[0.16,1,0.3,1] }} className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Your project</h2>
                  <div className={styles.field}>
                    <label className={styles.label}>What are we building?</label>
                    <div className={styles.typeGrid}>
                      {PROJECT_TYPES.map(t => (
                        <button key={t.id} type="button" aria-pressed={form.projectType === t.id} className={`${styles.typeCard} ${form.projectType === t.id ? styles.typeActive : ''}`} onClick={() => set('projectType', t.id)}>
                          <span className={styles.typeIcon} aria-hidden="true">{TYPE_ICONS[t.id]}</span><span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.twoCol}>
                    <div className={styles.field}><label className={styles.label} htmlFor="sp-budget">Budget</label><select id="sp-budget" name="budget" className={styles.select} value={form.budget} onChange={e => set('budget', e.target.value)}><option value="">Select budget</option>{BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                    <div className={styles.field}><label className={styles.label} htmlFor="sp-timeline">Timeline</label><select id="sp-timeline" name="timeline" className={styles.select} value={form.timeline} onChange={e => set('timeline', e.target.value)}><option value="">Select timeline</option>{TIMELINE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  </div>
                  <div className={styles.btnRow}>
                    <button type="button" className="btn btn-secondary" onClick={() => goTo(1)}>← Back</button>
                    <button type="button" className="btn btn-primary" disabled={!form.projectType} onClick={() => goTo(3)}>Next: Tell Us More →</button>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" custom={dir} variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease:[0.16,1,0.3,1] }} className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Tell us more</h2>
                  <div className={styles.field}><label className={styles.label} htmlFor="sp-brief">Describe your project *</label><textarea id="sp-brief" name="brief" className={styles.textarea} rows={5} placeholder="What problem are you solving? Who are your users? Any references you love?" value={form.brief} onChange={e => set('brief', e.target.value)} minLength={10} maxLength={8000} required /></div>
                  <div className={styles.field}><label className={styles.label} htmlFor="sp-how">How did you find us?</label><select id="sp-how" name="how" className={styles.select} value={form.how} onChange={e => set('how', e.target.value)}><option value="">Select one</option>{HOW_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
                  <div className={styles.btnRow}>
                    <button type="button" className="btn btn-secondary" onClick={() => goTo(2)}>← Back</button>
                    <button type="button" className="btn btn-primary" disabled={form.brief.trim().length < 10} onClick={() => goTo(4)}>Review & Send →</button>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div key="s4" custom={dir} variants={slideV} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease:[0.16,1,0.3,1] }} className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Confirm & send</h2>
                  <div className={styles.summary}>
                    {[
                      { k:'Name', v: form.name },
                      { k:'Company', v: form.company },
                      { k:'Email', v: form.email },
                      { k:'Project Type', v: PROJECT_TYPES.find(t=>t.id===form.projectType)?.label },
                      { k:'Budget', v: form.budget },
                      { k:'Timeline', v: form.timeline },
                      { k:'Brief', v: form.brief },
                    ].filter(r => r.v).map(r => (
                      <div key={r.k} className={styles.summaryRow}>
                        <span className={styles.summaryKey}>{r.k}</span>
                        <span className={styles.summaryVal}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.btnRow}>
                    <button type="button" className="btn btn-secondary" onClick={() => goTo(3)} disabled={sending}>← Edit</button>
                    <button type="button" className="btn btn-primary" onClick={submitBrief} disabled={sending}>
                      {sending ? 'Sending…' : 'Send Brief'}
                    </button>
                  </div>
                  {errorMsg && (
                    <p role="alert" className={styles.formError}>{errorMsg}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div className={styles.infoSide}>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className={styles.infoBox}>
            <h3 className={styles.infoTitle}>What happens next?</h3>
            <div className={styles.infoSteps}>
              {[
                { n:'01', l:'We review your brief', d:'Our team reads every submission — no auto-replies.' },
                { n:'02', l:'Discovery call', d:'30-min call to align on scope, goals, and fit.' },
                { n:'03', l:'Proposal & timeline', d:'A fixed-price scope of work with a clear timeline.' },
                { n:'04', l:'We start building', d:'Once agreed, we kick off in days — not weeks.' },
              ].map(i => (
                <div key={i.n} className={styles.infoStep}>
                  <span className={styles.infoStepNum}>{i.n}</span>
                  <div><p className={styles.infoStepLabel}>{i.l}</p><p className={styles.infoStepDesc}>{i.d}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.infoQuote}>
              <p className={styles.quoteText}>&ldquo;Goat Scale turned our chaotic ops into a system that runs itself.&rdquo;</p>
              <p className={styles.quoteAuthor}>— Ravi K., LogiTrack</p>
            </div>
            <div className={styles.infoMeta}>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
                Response within 24 hours
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                Brief stays confidential
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
