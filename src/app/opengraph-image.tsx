import { ImageResponse } from 'next/og';

export const alt = 'GoatScale — We build the systems ambitious companies run on.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(80% 60% at 70% 0%, rgba(94,124,255,0.22), transparent 60%), #060709',
          color: '#F2F5FB',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '0.04em' }}>
            GOAT
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #8FA6FF, #5E7CFF 60%, #3D55D6)',
              borderRadius: 8,
              padding: '8px 12px',
            }}
          >
            SCALE
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            We build the systems
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#8FA6FF',
            }}
          >
            ambitious companies run on.
          </div>
        </div>

        <div style={{ fontSize: 26, color: 'rgba(242,245,251,0.7)' }}>
          Websites · Web & mobile apps · CRM & ERP · Digital transformation
        </div>
      </div>
    ),
    size,
  );
}
