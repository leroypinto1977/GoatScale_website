import { NextResponse } from 'next/server';
import { sendEmail, isValidEmail } from '@/lib/email';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body.name);
  const email = str(body.email);
  const brief = str(body.brief);

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
      subject: `New project brief from ${name}`,
      replyTo: email,
      text: lines.join('\n'),
    });
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (err) {
    console.error('[api/project-brief] send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your brief. Please email us directly.' },
      { status: 502 },
    );
  }
}
