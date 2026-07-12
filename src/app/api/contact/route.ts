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

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254);
  const message = cleanText(body.message, 5_000);

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
      subject: `New enquiry from ${name.replace(/[\r\n]+/g, ' ')}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (!result.delivered) {
      return NextResponse.json(
        { error: 'Message delivery is not configured. Please email hello@goatscale.com directly.' },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please email us directly.' },
      { status: 502 },
    );
  }
}
