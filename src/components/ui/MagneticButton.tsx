'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({ children, className = '', onClick, type = 'button' }: MagneticProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      style={{ cursor: 'pointer', zIndex: 10, display: 'inline-flex' }}
    >
      <motion.span
        animate={{ x: x * 0.5, y: y * 0.5 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
