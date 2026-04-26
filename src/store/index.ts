import { create } from 'zustand';
import { AuthState, GalleryItem, AlarmSetting, Gift, SpinnerConfig } from '../types';

interface AppStore extends AuthState {
  galleryItems: GalleryItem[];
  setGalleryItems: (items: GalleryItem[]) => void;
  addGalleryItem: (item: GalleryItem) => void;

  alarmSettings: AlarmSetting[];
  setAlarmSettings: (alarms: AlarmSetting[]) => void;
  updateAlarmSetting: (id: string, setting: Partial<AlarmSetting>) => void;

  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  addGift: (gift: Gift) => void;
  removeGift: (id: string) => void;

  spinnerConfig: SpinnerConfig;
  setSpinnerConfig: (config: SpinnerConfig) => void;

  showNotification: (message: string, type: 'success' | 'info' | 'error') => void;
  notificationMessage: string | null;
  notificationType: 'success' | 'info' | 'error' | null;
  clearNotification: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),

  galleryItems: [],
  setGalleryItems: (items) => set({ galleryItems: items }),
  addGalleryItem: (item) =>
    set((state) => ({ galleryItems: [item, ...state.galleryItems] })),

  alarmSettings: [],
  setAlarmSettings: (alarms) => set({ alarmSettings: alarms }),
  updateAlarmSetting: (id, setting) =>
    set((state) => ({
      alarmSettings: state.alarmSettings.map((alarm) =>
        alarm.id === id ? { ...alarm, ...setting } : alarm
      ),
    })),

  gifts: [],
  setGifts: (gifts) => set({ gifts }),
  addGift: (gift) => set((state) => ({ gifts: [...state.gifts, gift] })),
  removeGift: (id) =>
    set((state) => ({
      gifts: state.gifts.filter((gift) => gift.id !== id),
    })),

  spinnerConfig: { type: 'flower' },
  setSpinnerConfig: (config) => set({ spinnerConfig: config }),

  notificationMessage: null,
  notificationType: null,
  showNotification: (message, type) =>
    set({ notificationMessage: message, notificationType: type }),
  clearNotification: () =>
    set({ notificationMessage: null, notificationType: null }),
}));
