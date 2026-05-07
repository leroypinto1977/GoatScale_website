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
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  type = 'button', 
  href 
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
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
          ref={ref as any}
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
      ref={ref as any}
      type={type}
      onClick={onClick}
      className={className}
      {...animationProps}
      style={{ cursor: 'pointer' }}
    >
      {content}
    </motion.button>
  );
}
