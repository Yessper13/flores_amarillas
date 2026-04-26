import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { GalleryItem } from '../types';
import { Spinner } from '../components/spinners/Spinner';
import { Heart, MessageSquare, Gift } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const { galleryItems: storeGallery, spinnerConfig } = useAppStore();

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        // Try to load from API first
        try {
          const data = await api.getGalleryItems();
          if (data && Array.isArray(data)) {
            setGalleryItems(data);
          }
        } catch (apiError) {
          // Fall back to store
          setGalleryItems(storeGallery);
        }
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [storeGallery]);

  // Set random background image from gallery
  useEffect(() => {
    const items = galleryItems.length > 0 ? galleryItems : storeGallery;
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setBackgroundImage(items[randomIndex].imageUrl);
    }
  }, [galleryItems, storeGallery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className="min-h-screen pb-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-color-text mb-2">
            💛 Flores Amarillas
          </h1>
          <p className="text-color-text-muted text-lg">
            Mi regalo especial para ti
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <a
            href="/gallery"
            className="bg-color-surface/80 backdrop-blur-sm border border-color-border rounded-xl p-6 text-center hover:border-color-primary transition-colors group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              📷
            </div>
            <h3 className="text-color-text font-bold">Galería</h3>
            <p className="text-color-text-muted text-sm">
              {galleryItems.length} fotos
            </p>
          </a>

          <a
            href="/questions"
            className="bg-color-surface/80 backdrop-blur-sm border border-color-border rounded-xl p-6 text-center hover:border-color-secondary transition-colors group"
          >
            <MessageSquare className="mx-auto mb-2 text-color-secondary group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-color-text font-bold">Preguntas</h3>
            <p className="text-color-text-muted text-sm">Diarias</p>
          </a>

          <a
            href="/gifts"
            className="bg-color-surface/80 backdrop-blur-sm border border-color-border rounded-xl p-6 text-center hover:border-color-accent transition-colors group"
          >
            <Gift className="mx-auto mb-2 text-color-accent group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-color-text font-bold">Regalos</h3>
            <p className="text-color-text-muted text-sm">Personalizados</p>
          </a>

          <a
            href="/flowers"
            className="bg-color-surface/80 backdrop-blur-sm border border-color-border rounded-xl p-6 text-center hover:border-color-primary transition-colors group"
          >
            <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
              🌼
            </span>
            <h3 className="text-color-text font-bold">Animación</h3>
            <p className="text-color-text-muted text-sm">Especial</p>
          </a>
        </motion.div>

        {/* Message */}
        <motion.div
          variants={itemVariants}
          className="bg-color-surface/80 backdrop-blur-sm border border-color-primary rounded-xl p-6 text-center"
        >
          <Heart className="mx-auto mb-4 text-color-secondary" size={40} />
          <p className="text-color-text text-lg font-medium">
            Espero que disfrutes este regalo tanto como yo disfruto de ti
          </p>
          <p className="text-color-text-muted mt-4">
            Hecho con amor 💛
          </p>
        </motion.div>
      </motion.div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Spinner type={spinnerConfig.type} size={60} color={spinnerConfig.color} />
        </div>
      )}
    </div>
  );
};
