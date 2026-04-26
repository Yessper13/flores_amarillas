import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { Spinner } from '../components/spinners/Spinner';
import { Flower2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthenticated, showNotification } = useAppStore();
  const correctCode = import.meta.env.VITE_SECRET_CODE || 'flores123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (code === correctCode) {
        setAuthenticated(true);
        showNotification('¡Bienvenido! 💛', 'success');
        navigate('/');
      } else {
        setError('Código secreto incorrecto');
        showNotification('Código incorrecto', 'error');
      }
    } catch (err) {
      setError('Error al verificar el código');
      showNotification('Error al verificar', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-color-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 flex justify-center"
          >
            <Flower2 size={64} className="text-color-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold text-color-text mb-2">
            Flores Amarillas
          </h1>
          <p className="text-color-text-muted">Mi regalo especial para ti</p>
        </div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-color-surface border border-color-border rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-color-text text-sm font-medium mb-2">
              Código secreto
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código"
              className="w-full px-4 py-3 bg-color-surface-light border border-color-border rounded-lg text-color-text placeholder-color-text-muted focus:outline-none focus:border-color-primary transition-colors"
              disabled={loading}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full bg-color-primary hover:bg-color-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-color-background font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner type="flower" size={20} color="#0f172a" />
                <span>Verificando...</span>
              </>
            ) : (
              <span>Entrar</span>
            )}
          </button>
        </motion.form>

        {/* Footer hint */}
        <p className="text-center text-color-text-muted text-sm mt-6">
          💛 Este es tu espacio especial
        </p>
      </motion.div>
    </div>
  );
};
