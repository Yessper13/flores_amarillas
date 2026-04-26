import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FlowersPage.css';

export const FlowersPage: React.FC = () => {
  const [flowerCount, setFlowerCount] = useState(5);

  const createFlowers = () => {
    return Array.from({ length: flowerCount }).map((_, i) => (
      <div
        key={i}
        className="flower"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 2}s`,
        } as any}
      >
        <div className="petal" />
        <div className="petal" style={{ '--rotate': '72deg' } as any} />
        <div className="petal" style={{ '--rotate': '144deg' } as any} />
        <div className="petal" style={{ '--rotate': '216deg' } as any} />
        <div className="petal" style={{ '--rotate': '288deg' } as any} />
        <div className="center" />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-color-background pb-24 overflow-hidden">
      {/* Animated Background */}
      <div className="flowers-container absolute inset-0">
        {createFlowers()}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-color-text mb-4">
            🌼 Flores Amarillas
          </h1>
          <p className="text-color-text-muted text-lg mb-8">
            Una animación especial para ti
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-color-surface/80 backdrop-blur-sm border border-color-border rounded-xl p-6 space-y-4 max-w-md mx-auto"
        >
          <div>
            <label className="block text-color-text font-bold mb-2">
              Cantidad de flores: {flowerCount}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={flowerCount}
              onChange={(e) => setFlowerCount(parseInt(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>

          <div className="text-center text-color-text-muted text-sm">
            <p>Cada flor tiene su propia animación única</p>
            <p className="mt-2">Hecho con ❤️ para ti</p>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-color-text text-xl font-medium mb-2">
            Eres más hermosa que estas flores
          </p>
          <p className="text-color-text-muted">
            Y cada día lo eres más 💛
          </p>
        </motion.div>
      </div>
    </div>
  );
};
