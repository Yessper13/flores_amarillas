import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ImageIcon,
  MessageSquare,
  Gift,
  Flower2,
  Settings,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/gallery', icon: ImageIcon, label: 'Galería' },
    { to: '/questions', icon: MessageSquare, label: 'Preguntas' },
    { to: '/gifts', icon: Gift, label: 'Regalos' },
    { to: '/flowers', icon: Flower2, label: 'Flores' },
    { to: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-color-border bg-color-surface z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto px-4">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center h-full px-3 transition-colors ${
                isActive
                  ? 'text-color-primary'
                  : 'text-color-text-muted hover:text-color-text'
              }`}
              title={label}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 hidden sm:block">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
