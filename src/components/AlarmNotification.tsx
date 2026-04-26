import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

interface AlarmNotificationProps {
  question: string;
  onDismiss: () => void;
}

export const AlarmNotification: React.FC<AlarmNotificationProps> = ({
  question,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, 30000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsVisible(false)} />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="relative bg-color-surface border-2 border-color-primary rounded-2xl p-6 max-w-md shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bell className="text-color-primary" size={32} />
                </motion.div>
              </div>
              <div className="flex-1">
                <h3 className="text-color-primary text-lg font-bold mb-2">
                  Pregunta del día
                </h3>
                <p className="text-color-text mb-4">{question}</p>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    onDismiss();
                  }}
                  className="w-full bg-color-primary hover:bg-color-primary-dark text-color-background font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Responder
                </button>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-color-text-muted hover:text-color-text"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
