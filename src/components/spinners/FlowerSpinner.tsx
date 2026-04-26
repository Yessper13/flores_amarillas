import React from 'react';
import { motion } from 'framer-motion';

interface FlowerSpinnerProps {
  size?: number;
  color?: string;
}

export const FlowerSpinner: React.FC<FlowerSpinnerProps> = ({
  size = 40,
  color = '#fbbf24',
}) => {
  const petalCount = 8;
  const radius = size / 2;

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Center circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 8}
          fill={color}
          opacity="0.8"
        />

        {/* Petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (i / petalCount) * Math.PI * 2;
          const petalDistance = radius * 0.6;
          const petalX = size / 2 + Math.cos(angle) * petalDistance;
          const petalY = size / 2 + Math.sin(angle) * petalDistance;

          return (
            <motion.ellipse
              key={i}
              cx={petalX}
              cy={petalY}
              rx={size / 6}
              ry={size / 8}
              fill={color}
              opacity="0.6"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                delay: (i / petalCount) * 0.2,
                repeat: Infinity,
              }}
              style={{
                transformOrigin: `${petalX}px ${petalY}px`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
