const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16_000;

type RateEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateEntry>();

function clientAddress(request: Request) {
  const vercelAddress = request.headers.get('x-vercel-forwarded-for');
  const forwardedAddress = request.headers.get('x-forwarded-for');
  return (vercelAddress ?? forwardedAddress ?? 'unknown').split(',')[0].trim();
}

export function validatePublicFormRequest(request: Request):
  | { ok: true }
  | { ok: false; status: number; error: string } {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return { ok: false, status: 415, error: 'Content-Type must be application/json.' };
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: 'Request body is too large.' };
  }

  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') {
    return { ok: false, status: 403, error: 'Cross-site submissions are not allowed.' };
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return { ok: false, status: 403, error: 'Invalid request origin.' };
      }
    } catch {
      return { ok: false, status: 403, error: 'Invalid request origin.' };
    }
  }

  const now = Date.now();
  const key = clientAddress(request);
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else if (current.count >= MAX_REQUESTS) {
    return { ok: false, status: 429, error: 'Too many submissions. Please try again later.' };
  } else {
    current.count += 1;
  }

  if (rateLimitStore.size > 1_000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
    }
  }

  return { ok: true };
}

export function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}
