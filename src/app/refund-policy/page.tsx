import type { Metadata } from 'next';
import LegalPage from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Goat Scale',
  description: 'How payments, cancellations, and refunds work for Goat Scale engagements.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicy() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="July 2026"
      intro="We work on fixed-price, milestone-based engagements, so you always know what you are paying for and what you receive at each step. This policy explains how cancellations and refunds are handled."
      sections={[
        {
          heading: 'Milestone-based payments',
          body: [
            'Projects are split into milestones defined in the statement of work. Each milestone has a clear deliverable and a corresponding payment. An advance confirms the engagement and reserves the build slot; subsequent payments fall due as milestones are delivered and approved.',
          ],
        },
        {
          heading: 'Cancelling an engagement',
          body: [
            'You may cancel a project at any time with written notice. Work completed up to the cancellation date — including approved milestones and work in progress on the current milestone — is billable. Everything built and paid for up to that point is handed over to you in full.',
          ],
        },
        {
          heading: 'Refunds',
          body: [
            'Payments for milestones that have been delivered and approved are non-refundable. If we have not yet started work on a paid milestone at the time of cancellation, that payment is refunded in full within 14 business days.',
            'If we fail to deliver a milestone as specified in the statement of work and cannot remedy it within a reasonable cure period, you are entitled to a refund of that milestone payment.',
          ],
        },
        {
          heading: 'Retainers & support plans',
          body: [
            'Monthly retainers and support plans can be cancelled with 30 days written notice. The current billing period remains payable; no further periods are charged after the notice period ends.',
          ],
        },
        {
          heading: 'How to request a refund',
          body: [
            'Email hello@goatscale.com with your project name and invoice reference. We acknowledge requests within 2 business days and process approved refunds to the original payment method within 14 business days.',
          ],
        },
      ]}
    />
  );
}
