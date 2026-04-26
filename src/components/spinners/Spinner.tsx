import React from 'react';
import { SpinnerType } from '../../types';
import { FlowerSpinner } from './FlowerSpinner';
import { HeartSpinner } from './HeartSpinner';
import { DotsSpinner } from './DotsSpinner';
import { RingSpinner } from './RingSpinner';

interface SpinnerProps {
  type?: SpinnerType;
  size?: number;
  color?: string;
  imageUrl?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  type = 'flower',
  size = 40,
  color,
  imageUrl,
}) => {
  if (type === 'custom' && imageUrl) {
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'spin 1s linear infinite',
        }}
      />
    );
  }

  switch (type) {
    case 'flower':
      return <FlowerSpinner size={size} color={color || '#fbbf24'} />;
    case 'heart':
      return <HeartSpinner size={size} color={color || '#ec4899'} />;
    case 'dots':
      return <DotsSpinner size={size} color={color || '#fbbf24'} />;
    case 'ring':
      return <RingSpinner size={size} color={color || '#fbbf24'} />;
    default:
      return <FlowerSpinner size={size} color={color || '#fbbf24'} />;
  }
};
