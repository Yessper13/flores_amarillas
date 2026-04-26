// Auth
export interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

// Gallery
export interface GalleryItem {
  id: string;
  imageUrl: string;
  uploadedAt: string;
  type: 'photo' | 'video';
}

// Questions
export interface Question {
  id: string;
  text: string;
  category: string;
}

export interface QuestionAnswer {
  id: string;
  questionId: string;
  userId: string;
  answer: string;
  answeredAt: string;
}

export interface AlarmSetting {
  id: string;
  time: string;
  enabled: boolean;
  frequency: 'daily' | 'custom';
}

// Gifts
export interface Gift {
  id: string;
  name: string;
  type: 'flower' | 'heart' | 'custom';
  imageUrl?: string;
  animation: string;
  color: string;
}

// Spinner
export type SpinnerType = 'flower' | 'heart' | 'dots' | 'ring' | 'custom';

export interface SpinnerConfig {
  type: SpinnerType;
  color?: string;
  imageUrl?: string;
}
