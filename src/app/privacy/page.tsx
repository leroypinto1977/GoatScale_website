import type { Metadata } from 'next';
import LegalPage from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Goat Scale',
  description: 'How Goat Scale collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      intro="We keep this simple: we collect only what we need to work with you, we never sell your data, and we tell you exactly how it's used."
      sections={[
        {
          heading: 'Information we collect',
          body: [
            'When you contact us or submit a project brief, we collect the details you choose to share — typically your name, email, company, and a description of your project.',
            'We also collect basic, anonymized analytics about how the site is used so we can improve it.',
          ],
        },
        {
          heading: 'How we use it',
          body: [
            'Your information is used solely to respond to your enquiry, scope potential work, and stay in touch about your project. We do not use it for unrelated marketing without your consent.',
          ],
        },
        {
          heading: 'Sharing & third parties',
          body: [
            'We never sell your data. We share information only with the trusted services we use to operate (such as our email provider), and only to the extent required to deliver our service.',
          ],
        },
        {
          heading: 'Data retention',
          body: [
            'We retain project enquiries for as long as needed to evaluate and act on them. You can request deletion of your data at any time by emailing hello@goatscale.com.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You may request access to, correction of, or deletion of your personal data. Reach us at hello@goatscale.com and we will respond promptly.',
          ],
        },
      ]}
    />
  );
}
