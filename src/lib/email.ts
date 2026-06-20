/**
 * Lightweight email delivery helper.
 *
 * Uses the Resend REST API (no SDK dependency) when RESEND_API_KEY is set.
 * If no provider is configured, the submission is logged server-side and
 * the call still resolves so local development works end-to-end. Wire your
 * own provider here (Resend, Postmark, SES, a CRM webhook, etc.).
 *
 * Required env to actually send mail:
 *   RESEND_API_KEY   — your Resend API key
 *   CONTACT_TO       — inbox that receives submissions (e.g. hello@goatscale.com)
 *   CONTACT_FROM     — verified sender (e.g. "Goat Scale <noreply@goatscale.com>")
 */

export type SendResult = { delivered: boolean; reason?: string };

export async function sendEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? 'hello@goatscale.com';
  const from = process.env.CONTACT_FROM ?? 'Goat Scale <onboarding@resend.dev>';

  if (!apiKey) {
    // No provider configured — don't lose the lead, surface it in the logs.
    console.warn(
      '[email] RESEND_API_KEY not set — submission logged but not emailed:\n',
      `subject: ${opts.subject}\n`,
      opts.text,
    );
    return { delivered: false, reason: 'no-provider' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: opts.subject,
      text: opts.text,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }

  return { delivered: true };
}

/** Minimal email-shape validation (server-side guard, not just type=email). */
export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
