import Reveal from '@/components/ui/Reveal';
import styles from './LegalPage.module.css';

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <article className={`section ${styles.page}`}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <span className="label"><i />Legal</span>
          <Reveal as="h1" split="lines" className={styles.title}>
            {title}
          </Reveal>
          <p className={styles.updated}>Last updated · {updated}</p>
          <p className={`body-lg ${styles.intro}`}>{intro}</p>
        </header>

        <div className={styles.body}>
          {sections.map((s, i) => (
            <section key={s.heading} className={styles.block}>
              <h2 className={styles.blockHeading}>
                <span className={styles.blockNum}>{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className={styles.para}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
