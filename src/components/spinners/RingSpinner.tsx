import React from 'react';
import { motion } from 'framer-motion';

interface RingSpinnerProps {
  size?: number;
  color?: string;
}

export const RingSpinner: React.FC<RingSpinnerProps> = ({
  size = 40,
  color = '#fbbf24',
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 3}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 3}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={`${(size / 2 - 3) * Math.PI * 0.5} ${(size / 2 - 3) * Math.PI * 2}`}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};
