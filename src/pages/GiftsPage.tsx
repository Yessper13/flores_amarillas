import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { Gift as GiftType } from '../types';
import { Spinner } from '../components/spinners/Spinner';
import { Plus, Trash2 } from 'lucide-react';

const GIFT_ANIMATIONS = [
  'bounce',
  'float',
  'spin',
  'pulse',
  'shake',
  'rainbow',
];

const GIFT_COLORS = [
  '#fbbf24', // yellow
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#ef4444', // red
  '#f97316', // orange
  '#06b6d4', // cyan
];

export const GiftsPage: React.FC = () => {
  const [gifts, setGifts] = useState<GiftType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'flower' as 'flower' | 'heart' | 'custom',
    animation: 'bounce',
    color: '#fbbf24',
  });

  const { addGift, removeGift, showNotification, spinnerConfig } = useAppStore();

  useEffect(() => {
    loadGifts();
  }, []);

  const loadGifts = async () => {
    try {
      setLoading(true);
      const data = await api.getGifts();
      if (Array.isArray(data)) {
        setGifts(data);
      }
    } catch (error) {
      showNotification('Error al cargar regalos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newGift: GiftType = {
        id: Math.random().toString(36),
        name: formData.name,
        type: formData.type,
        animation: formData.animation,
        color: formData.color,
      };
      const data = await api.createGift(newGift);
      const createdGift = data || newGift;
      setGifts([...gifts, createdGift]);
      addGift(createdGift);
      setFormData({
        name: '',
        type: 'flower',
        animation: 'bounce',
        color: '#fbbf24',
      });
      setShowForm(false);
      showNotification('Regalo creado', 'success');
    } catch (error) {
      showNotification('Error al crear regalo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteGift(id);
      setGifts(gifts.filter((g) => g.id !== id));
      removeGift(id);
      showNotification('Regalo eliminado', 'success');
    } catch (error) {
      showNotification('Error al eliminar regalo', 'error');
    }
  };

  const getGiftEmoji = (type: string) => {
    switch (type) {
      case 'flower':
        return '🌼';
      case 'heart':
        return '💛';
      default:
        return '🎁';
    }
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return 'animate-bounce';
      case 'float':
        return 'animate-pulse';
      case 'spin':
        return 'animate-spin';
      case 'pulse':
        return 'animate-pulse';
      default:
        return 'animate-bounce';
    }
  };

  return (
    <div className="min-h-screen bg-color-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-color-text mb-2">
              🎁 Mis Regalos
            </h1>
            <p className="text-color-text-muted">
              Crea regalos personalizados con animaciones especiales
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-color-primary hover:bg-color-primary-dark text-color-background font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nuevo Regalo
            </button>
          )}
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="bg-color-surface border border-color-border rounded-xl p-6 mb-8 space-y-4"
            >
              <div>
                <label className="block text-color-text font-bold mb-2">
                  Nombre del regalo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ej: Mi flor especial"
                  className="w-full px-4 py-2 bg-color-surface-light border border-color-border rounded-lg text-color-text placeholder-color-text-muted focus:outline-none focus:border-color-primary transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-color-text font-bold mb-2">
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 bg-color-surface-light border border-color-border rounded-lg text-color-text focus:outline-none focus:border-color-primary transition-colors"
                  >
                    <option value="flower">Flor</option>
                    <option value="heart">Corazón</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-color-text font-bold mb-2">
                    Animación
                  </label>
                  <select
                    value={formData.animation}
                    onChange={(e) =>
                      setFormData({ ...formData, animation: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-color-surface-light border border-color-border rounded-lg text-color-text focus:outline-none focus:border-color-primary transition-colors"
                  >
                    {GIFT_ANIMATIONS.map((anim) => (
                      <option key={anim} value={anim}>
                        {anim.charAt(0).toUpperCase() + anim.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-color-text font-bold mb-3">
                  Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {GIFT_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, color })
                      }
                      className={`h-10 rounded-lg border-2 transition-all ${
                        formData.color === color
                          ? 'border-white scale-110'
                          : 'border-color-border'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading || !formData.name}
                  className="flex-1 bg-color-primary hover:bg-color-primary-dark disabled:opacity-50 text-color-background font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  {loading ? 'Creando...' : 'Crear Regalo'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-color-surface-light hover:bg-color-border text-color-text font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Gifts Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner type={spinnerConfig.type} size={60} color={spinnerConfig.color} />
          </div>
        ) : gifts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-color-text-muted mb-4">
              No hay regalos aún. ¡Crea uno!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {gifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-color-surface border border-color-border rounded-xl p-6 text-center group hover:border-color-primary transition-colors"
                >
                  <div
                    className={`text-6xl mb-4 flex justify-center ${getAnimationClass(
                      gift.animation
                    )}`}
                  >
                    {getGiftEmoji(gift.type)}
                  </div>

                  <h3 className="text-color-text font-bold text-lg mb-2">
                    {gift.name}
                  </h3>

                  <p className="text-color-text-muted text-sm mb-4">
                    {gift.type === 'flower' && 'Flor'}
                    {gift.type === 'heart' && 'Corazón'}
                    {gift.type === 'custom' && 'Personalizado'}
                    {' • '}
                    {gift.animation}
                  </p>

                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-4"
                    style={{ backgroundColor: gift.color }}
                  />

                  <button
                    onClick={() => handleDelete(gift.id)}
                    className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-400 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 size={18} />
                    Eliminar
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
