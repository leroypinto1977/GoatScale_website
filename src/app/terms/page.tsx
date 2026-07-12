import type { Metadata } from 'next';
import LegalPage from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service — Goat Scale',
  description: 'The terms that govern your use of the Goat Scale website and services.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 2026"
      intro="These terms cover your use of this website and the engagement of Goat Scale's services. By using the site, you agree to them."
      sections={[
        {
          heading: 'Use of this site',
          body: [
            'You may browse and use this website for lawful purposes. You agree not to misuse the site, attempt to disrupt it, or access it in any way that breaches applicable laws.',
          ],
        },
        {
          heading: 'Engagements & proposals',
          body: [
            'Information on this site is for general guidance and does not constitute a binding offer. Any engagement begins only once a written agreement or statement of work is signed by both parties.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'All content on this site — including copy, design, and code — is owned by Goat Scale unless otherwise stated. Ownership of work delivered to clients is governed by the relevant statement of work.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'This website is provided “as is”. To the fullest extent permitted by law, Goat Scale is not liable for any indirect or consequential loss arising from use of the site.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'Questions about these terms? Email hello@goatscale.com and we will be glad to help.',
          ],
        },
      ]}
    />
  );
}
