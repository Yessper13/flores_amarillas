import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { CheckCircle, AlertCircle, InfoIcon, X } from 'lucide-react';

export const Notification: React.FC = () => {
  const { notificationMessage, notificationType, clearNotification } =
    useAppStore();

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(clearNotification, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage, clearNotification]);

  const icons = {
    success: <CheckCircle size={20} className="text-green-400" />,
    error: <AlertCircle size={20} className="text-red-400" />,
    info: <InfoIcon size={20} className="text-blue-400" />,
  };

  const bgColors = {
    success: 'bg-green-900/20 border-green-800',
    error: 'bg-red-900/20 border-red-800',
    info: 'bg-blue-900/20 border-blue-800',
  };

  return (
    <AnimatePresence>
      {notificationMessage && notificationType && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 flex items-center gap-3 p-4 rounded-lg border ${bgColors[notificationType]} backdrop-blur-sm`}
        >
          {icons[notificationType]}
          <span className="flex-1 text-color-text text-sm">
            {notificationMessage}
          </span>
          <button
            onClick={clearNotification}
            className="text-color-text-muted hover:text-color-text transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
