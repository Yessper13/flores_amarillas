const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = {
  // Auth
  verifyCode: async (code: string) => {
    const response = await fetch(`${API_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    return response.json();
  },

  // Gallery
  getGalleryItems: async () => {
    const response = await fetch(`${API_URL}/api/gallery`);
    return response.json();
  },

  uploadGalleryItem: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/api/gallery/upload`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  deleteGalleryItem: async (id: string) => {
    const response = await fetch(`${API_URL}/api/gallery/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Questions
  getDailyQuestion: async () => {
    const response = await fetch(`${API_URL}/api/questions/daily`);
    return response.json();
  },

  submitQuestionAnswer: async (questionId: string, answer: string) => {
    const response = await fetch(`${API_URL}/api/questions/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, answer }),
    });
    return response.json();
  },

  // Alarms
  getAlarmSettings: async () => {
    const response = await fetch(`${API_URL}/api/alarms`);
    return response.json();
  },

  updateAlarmSetting: async (id: string, setting: any) => {
    const response = await fetch(`${API_URL}/api/alarms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(setting),
    });
    return response.json();
  },

  // Gifts
  getGifts: async () => {
    const response = await fetch(`${API_URL}/api/gifts`);
    return response.json();
  },

  createGift: async (gift: any) => {
    const response = await fetch(`${API_URL}/api/gifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gift),
    });
    return response.json();
  },

  deleteGift: async (id: string) => {
    const response = await fetch(`${API_URL}/api/gifts/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Settings
  getSettings: async () => {
    const response = await fetch(`${API_URL}/api/settings`);
    return response.json();
  },

  updateSpinnerConfig: async (config: any) => {
    const response = await fetch(`${API_URL}/api/settings/spinner`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return response.json();
  },
};
