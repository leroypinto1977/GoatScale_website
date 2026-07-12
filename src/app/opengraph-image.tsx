import { ImageResponse } from 'next/og';

export const alt = 'Goat Scale — Launch. Operate. Transform.';
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
          background: '#0B0A07',
          color: '#F4EFE3',
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
              color: '#14100A',
              background: 'linear-gradient(135deg, #C9A45C, #9E7A36 60%, #6E5423)',
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
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            We build the systems
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#C9A45C',
            }}
          >
            that let you scale.
          </div>
        </div>

        <div style={{ fontSize: 26, color: 'rgba(244,239,227,0.7)' }}>
          Websites · Web & mobile apps · CRM & ERP · Digital transformation
        </div>
      </div>
    ),
    size,
  );
}
