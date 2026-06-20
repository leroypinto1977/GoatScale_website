import { NextResponse } from 'next/server';
import { sendEmail, isValidEmail } from '@/lib/email';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!isValidEmail(email)) errors.email = 'A valid email is required.';
  if (!message || message.length < 10)
    errors.message = 'Please add a little more detail (10+ characters).';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    const result = await sendEmail({
      subject: `New enquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (err) {
    console.error('[api/contact] send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please email us directly.' },
      { status: 502 },
    );
  }
}
