'use client';

import Link from 'next/link';

/* Formerly a magnetic (cursor-following) button — the motion was removed
   July 2026 at the client's request. The component name and API are kept
   so existing call sites don't change. */

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  href,
  disabled = false,
}: MagneticProps) {
  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
      {children}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {content}
    </button>
  );
}
