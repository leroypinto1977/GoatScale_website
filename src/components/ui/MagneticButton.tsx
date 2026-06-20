'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const content = (
    <motion.span
      animate={{ x: x * 0.5, y: y * 0.5 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}
    >
      {children}
    </motion.span>
  );

  const animationProps = {
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x, y },
    transition: { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 }
  };

  if (href) {
    return (
      <Link href={href} style={{ display: 'inline-flex', textDecoration: 'none' }}>
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className={className}
          {...animationProps}
          style={{ cursor: 'pointer' }}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...animationProps}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {content}
    </motion.button>
  );
}
