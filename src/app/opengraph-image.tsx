import { ImageResponse } from 'next/og';

export const alt = 'Goat Scale — Build Systems. Scale Fast.';
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
          background: '#060906',
          color: '#EAE4D6',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#B7E7A1',
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em' }}>
            Goat Scale
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
              color: '#B7E7A1',
            }}
          >
            that let you scale.
          </div>
        </div>

        <div style={{ fontSize: 26, color: 'rgba(234,228,214,0.7)' }}>
          Websites · Web apps · Mobile · Internal systems
        </div>
      </div>
    ),
    size,
  );
}
