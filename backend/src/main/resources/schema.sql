-- Flores Amarillas Database Schema
-- MySQL 8.0+

-- Create database (run manually if needed)
-- CREATE DATABASE IF NOT EXISTS flores_amarillas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE flores_amarillas;

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    id VARCHAR(36) PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery items table
CREATE TABLE IF NOT EXISTS gallery_items (
    id VARCHAR(36) PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(36) PRIMARY KEY,
    text TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_daily BOOLEAN DEFAULT FALSE
);

-- Question answers table
CREATE TABLE IF NOT EXISTS question_answers (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    answer TEXT NOT NULL,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Alarm settings table
CREATE TABLE IF NOT EXISTS alarm_settings (
    id VARCHAR(36) PRIMARY KEY,
    time VARCHAR(5) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    frequency VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gifts table
CREATE TABLE IF NOT EXISTS gifts (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    animation VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_gallery_uploaded_at ON gallery_items(uploaded_at);
CREATE INDEX idx_questions_is_daily ON questions(is_daily);
CREATE INDEX idx_answers_question_id ON question_answers(question_id);
CREATE INDEX idx_alarms_enabled ON alarm_settings(enabled);
CREATE INDEX idx_gifts_created_at ON gifts(created_at);
