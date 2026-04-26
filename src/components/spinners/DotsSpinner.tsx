import React from 'react';
import { motion } from 'framer-motion';

interface DotsSpinnerProps {
  size?: number;
  color?: string;
}

export const DotsSpinner: React.FC<DotsSpinnerProps> = ({
  size = 40,
  color = '#fbbf24',
}) => {
  const dotCount = 3;
  const dotSize = size / 8;

  return (
    <div
      style={{
        width: size,
        height: dotSize * 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: dotSize / 2,
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            repeat: Infinity,
          }}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};
