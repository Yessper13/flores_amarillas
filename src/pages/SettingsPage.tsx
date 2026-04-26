import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { SpinnerType } from '../types';
import { Spinner } from '../components/spinners/Spinner';
import { LogOut, Settings as SettingsIcon } from 'lucide-react';
import { FlowerSpinner } from '../components/spinners/FlowerSpinner';
import { HeartSpinner } from '../components/spinners/HeartSpinner';
import { DotsSpinner } from '../components/spinners/DotsSpinner';
import { RingSpinner } from '../components/spinners/RingSpinner';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    setAuthenticated,
    spinnerConfig,
    setSpinnerConfig,
    showNotification,
  } = useAppStore();
  const [selectedSpinner, setSelectedSpinner] = useState<SpinnerType>(
    spinnerConfig.type
  );
  const [selectedColor, setSelectedColor] = useState(
    spinnerConfig.color || '#fbbf24'
  );

  const spinnerTypes: { type: SpinnerType; label: string }[] = [
    { type: 'flower', label: 'Flor' },
    { type: 'heart', label: 'Corazón' },
    { type: 'dots', label: 'Puntos' },
    { type: 'ring', label: 'Anillo' },
  ];

  const colors = [
    { value: '#fbbf24', label: 'Amarillo' },
    { value: '#ec4899', label: 'Rosa' },
    { value: '#8b5cf6', label: 'Morado' },
    { value: '#ef4444', label: 'Rojo' },
    { value: '#f97316', label: 'Naranja' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#10b981', label: 'Verde' },
  ];

  const handleSpinnerChange = (type: SpinnerType) => {
    setSelectedSpinner(type);
    setSpinnerConfig({
      type,
      color: selectedColor,
    });
    showNotification('Spinner actualizado', 'success');
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSpinnerConfig({
      type: selectedSpinner,
      color,
    });
    showNotification('Color actualizado', 'success');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    showNotification('Sesión cerrada', 'success');
    navigate('/login');
  };

  const getSpinnerPreview = (type: SpinnerType, color: string) => {
    switch (type) {
      case 'flower':
        return <FlowerSpinner size={50} color={color} />;
      case 'heart':
        return <HeartSpinner size={50} color={color} />;
      case 'dots':
        return <DotsSpinner size={50} color={color} />;
      case 'ring':
        return <RingSpinner size={50} color={color} />;
      default:
        return <FlowerSpinner size={50} color={color} />;
    }
  };

  return (
    <div className="min-h-screen bg-color-background pb-24">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-color-text mb-2">
            <SettingsIcon className="inline-block mr-2 text-color-primary" />
            Ajustes
          </h1>
          <p className="text-color-text-muted">
            Personaliza tu experiencia
          </p>
        </motion.div>

        {/* Spinner Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-color-surface border border-color-border rounded-xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-color-text mb-6">
            ⏳ Personalizador de Spinners
          </h2>

          {/* Spinner Type Selection */}
          <div className="mb-8">
            <h3 className="text-color-text font-bold mb-4">Tipo de Spinner</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {spinnerTypes.map(({ type, label }) => (
                <motion.button
                  key={type}
                  onClick={() => handleSpinnerChange(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    selectedSpinner === type
                      ? 'border-color-primary bg-color-primary/10'
                      : 'border-color-border hover:border-color-primary/50'
                  }`}
                >
                  <div className="mb-2">
                    {getSpinnerPreview(type, selectedColor)}
                  </div>
                  <span className="text-color-text text-sm font-medium">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-color-text font-bold mb-4">Color del Spinner</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {colors.map(({ value, label }) => (
                <motion.button
                  key={value}
                  onClick={() => handleColorChange(value)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    selectedColor === value
                      ? 'border-white scale-105'
                      : 'border-color-border'
                  }`}
                  style={{ backgroundColor: `${value}20` }}
                >
                  <div
                    className="w-8 h-8 rounded-full mb-2"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-color-text text-xs font-medium text-center">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Live Preview */}
            <div className="bg-color-surface-light rounded-lg p-6 text-center">
              <p className="text-color-text-muted mb-4">Vista previa en vivo</p>
              <div className="flex justify-center">
                {getSpinnerPreview(selectedSpinner, selectedColor)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-color-surface border border-color-border rounded-xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-color-text mb-4">
            ℹ️ Información
          </h2>
          <div className="space-y-3 text-color-text-muted">
            <div className="flex justify-between items-center">
              <span>Versión de la app</span>
              <span className="text-color-text font-bold">2.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API URL</span>
              <span className="text-color-text font-bold text-sm break-all">
                {import.meta.env.VITE_API_URL}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Última actualización</span>
              <span className="text-color-text font-bold">
                {new Date().toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-900/20 hover:bg-red-900/40 border border-red-800 text-red-400 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </motion.button>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-color-text-muted"
        >
          <p>Hecho con ❤️ para ti</p>
        </motion.div>
      </div>
    </div>
  );
};
