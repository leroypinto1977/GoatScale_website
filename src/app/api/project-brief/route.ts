import { NextResponse } from 'next/server';
import { sendEmail, isValidEmail } from '@/lib/email';
import { cleanText, validatePublicFormRequest } from '@/lib/request-security';

export async function POST(request: Request) {
  const requestCheck = validatePublicFormRequest(request);
  if (!requestCheck.ok) {
    return NextResponse.json(
      { error: requestCheck.error },
      { status: requestCheck.status },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (cleanText(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max = 500) => cleanText(v, max);
  const name = str(body.name, 120);
  const email = str(body.email, 254);
  const brief = str(body.brief, 8_000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!isValidEmail(email)) errors.email = 'A valid email is required.';
  if (!brief || brief.length < 10) errors.brief = 'Please describe your project.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const lines = [
    `Name: ${name}`,
    `Company: ${str(body.company) || '—'}`,
    `Email: ${email}`,
    `Phone: ${str(body.phone) || '—'}`,
    `Project type: ${str(body.projectType) || '—'}`,
    `Budget: ${str(body.budget) || '—'}`,
    `Timeline: ${str(body.timeline) || '—'}`,
    `How they found us: ${str(body.how) || '—'}`,
    '',
    'Brief:',
    brief,
  ];

  try {
    const result = await sendEmail({
      subject: `New project brief from ${name.replace(/[\r\n]+/g, ' ')}`,
      replyTo: email,
      text: lines.join('\n'),
    });
    if (!result.delivered) {
      return NextResponse.json(
        { error: 'Brief delivery is not configured. Please email hello@goatscale.com directly.' },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/project-brief] send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your brief. Please email us directly.' },
      { status: 502 },
    );
  }
}
