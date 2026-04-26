import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { AlarmSetting, Question } from '../types';
import { Spinner } from '../components/spinners/Spinner';
import { AlarmNotification } from '../components/AlarmNotification';
import { Clock, Plus, Trash2 } from 'lucide-react';

export const QuestionsPage: React.FC = () => {
  const [alarms, setAlarms] = useState<AlarmSetting[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState('09:00');
  const [showAlarmNotification, setShowAlarmNotification] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<AlarmSetting | null>(null);

  const { showNotification, spinnerConfig } = useAppStore();

  useEffect(() => {
    loadQuestion();
    loadAlarms();
    setupAlarmChecks();
  }, []);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const data = await api.getDailyQuestion();
      setCurrentQuestion(data);
    } catch (error) {
      showNotification('Error al cargar la pregunta', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadAlarms = async () => {
    try {
      const data = await api.getAlarmSettings();
      if (Array.isArray(data)) {
        setAlarms(data);
      }
    } catch (error) {
      showNotification('Error al cargar alarmas', 'error');
    }
  };

  const setupAlarmChecks = () => {
    // Check alarms every minute
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      alarms.forEach((alarm) => {
        if (alarm.enabled && alarm.time === currentTime) {
          if (currentQuestion) {
            setActiveAlarm(alarm);
            setShowAlarmNotification(true);
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || !answer.trim()) return;

    try {
      setLoading(true);
      await api.submitQuestionAnswer(currentQuestion.id, answer);
      showNotification('Respuesta guardada', 'success');
      setAnswer('');
      // Load next question
      loadQuestion();
    } catch (error) {
      showNotification('Error al guardar respuesta', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAlarm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newAlarm: AlarmSetting = {
        id: Math.random().toString(36),
        time: newAlarmTime,
        enabled: true,
        frequency: 'daily',
      };
      const data = await api.updateAlarmSetting(newAlarm.id, newAlarm);
      setAlarms([...alarms, data || newAlarm]);
      setNewAlarmTime('09:00');
      showNotification('Alarma añadida', 'success');
    } catch (error) {
      showNotification('Error al añadir alarma', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAlarm = async (id: string) => {
    try {
      const alarm = alarms.find((a) => a.id === id);
      if (alarm) {
        const updated = { ...alarm, enabled: !alarm.enabled };
        await api.updateAlarmSetting(id, updated);
        setAlarms(alarms.map((a) => (a.id === id ? updated : a)));
      }
    } catch (error) {
      showNotification('Error al actualizar alarma', 'error');
    }
  };

  const handleDeleteAlarm = async (id: string) => {
    try {
      await api.updateAlarmSetting(id, { enabled: false });
      setAlarms(alarms.filter((a) => a.id !== id));
      showNotification('Alarma eliminada', 'success');
    } catch (error) {
      showNotification('Error al eliminar alarma', 'error');
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
            💬 Preguntas del Día
          </h1>
          <p className="text-color-text-muted">Conectemos más cada día</p>
        </motion.div>

        {/* Current Question */}
        {loading && !currentQuestion ? (
          <div className="flex justify-center py-12">
            <Spinner type={spinnerConfig.type} size={60} color={spinnerConfig.color} />
          </div>
        ) : currentQuestion ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-color-surface border border-color-border rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-color-text mb-6">
              {currentQuestion.text}
            </h2>

            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Tu respuesta..."
                rows={4}
                className="w-full px-4 py-3 bg-color-surface-light border border-color-border rounded-lg text-color-text placeholder-color-text-muted focus:outline-none focus:border-color-primary transition-colors resize-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !answer.trim()}
                className="w-full bg-color-secondary hover:bg-color-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Respuesta'}
              </button>
            </form>
          </motion.div>
        ) : null}

        {/* Alarms Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-color-surface border border-color-border rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold text-color-text mb-6">
            ⏰ Alarmas de Preguntas
          </h3>

          {/* Add Alarm Form */}
          <form onSubmit={handleAddAlarm} className="mb-6 p-4 bg-color-surface-light rounded-lg flex gap-2">
            <input
              type="time"
              value={newAlarmTime}
              onChange={(e) => setNewAlarmTime(e.target.value)}
              className="flex-1 px-3 py-2 bg-color-background border border-color-border rounded text-color-text focus:outline-none focus:border-color-primary"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-color-primary hover:bg-color-primary-dark disabled:opacity-50 text-color-background font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Añadir
            </button>
          </form>

          {/* Alarms List */}
          {alarms.length === 0 ? (
            <p className="text-color-text-muted text-center py-8">
              No hay alarmas configuradas. ¡Añade una!
            </p>
          ) : (
            <AnimatePresence>
              {alarms.map((alarm, index) => (
                <motion.div
                  key={alarm.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-color-background rounded-lg mb-2 border border-color-border"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="text-color-primary" size={20} />
                    <div>
                      <p className="text-color-text font-bold">{alarm.time}</p>
                      <p className="text-color-text-muted text-sm">
                        {alarm.frequency === 'daily' ? 'Todos los días' : 'Personalizado'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleAlarm(alarm.id)}
                      className={`px-4 py-2 rounded transition-colors ${
                        alarm.enabled
                          ? 'bg-color-primary text-color-background'
                          : 'bg-color-surface-light text-color-text-muted'
                      }`}
                    >
                      {alarm.enabled ? 'Activa' : 'Inactiva'}
                    </button>
                    <button
                      onClick={() => handleDeleteAlarm(alarm.id)}
                      className="bg-red-900/20 hover:bg-red-900/40 text-red-400 p-2 rounded transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Alarm Notification */}
      <AnimatePresence>
        {showAlarmNotification && currentQuestion && (
          <AlarmNotification
            question={currentQuestion.text}
            onDismiss={() => setShowAlarmNotification(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
