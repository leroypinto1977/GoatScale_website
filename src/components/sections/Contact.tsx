'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    companyWebsite: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const firstError =
          data?.errors && typeof data.errors === 'object'
            ? Object.values(data.errors)[0]
            : data?.error;
        throw new Error(
          (firstError as string) || 'Something went wrong. Please try again.',
        );
      }
      setSubmitted(true);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.inner}>
          {/* Left — Statement */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label"><i />Get In Touch</span>
            <h2 className={`${styles.headline} display`}>
              Ready to<br />
              <span className={styles.accent}>Scale?</span>
            </h2>
            <p className={`body-lg ${styles.desc}`}>
              Whether you need a website, a web app, a mobile app — or the
              internal systems that tie it all together — let&apos;s talk.
            </p>

            <a
              href="mailto:hello@goatscale.com"
              className={styles.emailLink}
            >
              hello@goatscale.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className={styles.directBooking}>
              <p className={styles.directBookingLabel}>Prefer to book directly?</p>
              <MagneticButton className="btn btn-outline" href="/book-a-call">
                Book a discovery call
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
            </div>

          </motion.div>

          {/* Right — Form */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {!submitted ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="company-website">Company website</label>
                  <input
                    id="company-website"
                    name="companyWebsite"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={120}
                    autoComplete="name"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    autoComplete="email"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">What are you building?</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell us about your project, your team, and what you're trying to achieve..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={5000}
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === 'sending'}
                  className={`btn btn-primary ${styles.submit}`}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                  {status !== 'sending' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </MagneticButton>

                {status === 'error' && (
                  <p role="alert" className={styles.formError}>
                    {errorMsg}
                  </p>
                )}
              </form>
            ) : (
              <motion.div
                className={styles.successState}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Message Sent</h3>
                <p className={styles.successDesc}>
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
