-- Sample Questions for the App
-- Run this after schema.sql to populate sample data

INSERT IGNORE INTO questions (id, text, category, is_daily) VALUES
('q1', '¿Qué es lo que más te gusta de nuestra relación?', 'love', true),
('q2', '¿Cuál ha sido tu momento favorito juntos?', 'memories', false),
('q3', '¿Qué canción te recuerda a mí?', 'music', false),
('q4', '¿Cuál es tu lugar favorito para estar conmigo?', 'places', false),
('q5', '¿Qué es lo primero que pensaste cuando me viste?', 'memories', false),
('q6', '¿Cuál es tu comida favorita para compartir conmigo?', 'food', false),
('q7', '¿Qué sueño te gustaría cumplir conmigo?', 'dreams', false),
('q8', '¿Qué película podríamos ver juntos mil veces?', 'movies', false),
('q9', '¿Cuál es tu recuerdo más gracioso de nosotros?', 'memories', false),
('q10', '¿Qué tres palabras describen nuestra relación?', 'love', false),
('q11', '¿Qué es lo que más extrañas cuando no estamos juntos?', 'love', false),
('q12', '¿Cuál es tu fecha especial favorita de nosotros?', 'dates', false),
('q13', '¿Qué aventura te gustaría vivir conmigo?', 'adventures', false),
('q14', '¿Qué es lo más romántico que hemos hecho?', 'romance', false),
('q15', '¿Cuál es nuestro inside joke favorito?', 'humor', false),
('q16', '¿Qué es lo que más admiras de mí?', 'love', false),
('q17', '¿Dónde te gustaría viajar conmigo?', 'travel', false),
('q18', '¿Cuál es tu manera favorita de pasar tiempo juntos?', 'quality-time', false),
('q19', '¿Qué te hace sentir más amado/a?', 'love-language', false),
('q20', '¿Cuál fue nuestro primer "te quiero"?', 'memories', false);

-- Default settings
INSERT IGNORE INTO settings (id, setting_key, value) VALUES
('s1', 'spinnerType', 'flower'),
('s2', 'spinnerColor', '#fbbf24');

-- Sample alarm (9:00 AM daily)
INSERT IGNORE INTO alarm_settings (id, time, enabled, frequency) VALUES
('a1', '09:00', true, 'daily');
