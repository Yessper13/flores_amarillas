import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAppStore } from './store';
import { Navigation } from './components/Navigation';
import { Notification } from './components/Notification';

// Pages
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { GiftsPage } from './pages/GiftsPage';
import { FlowersPage } from './pages/FlowersPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-color-background text-color-text">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <HomePage />
                  {isAuthenticated && <Navigation />}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <>
                  <GalleryPage />
                  {isAuthenticated && <Navigation />}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <>
                  <QuestionsPage />
                  {isAuthenticated && <Navigation />}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/gifts"
            element={
              <ProtectedRoute>
                <>
                  <GiftsPage />
                  {isAuthenticated && <Navigation />}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/flowers"
            element={
              <ProtectedRoute>
                <>
                  <FlowersPage />
                  {isAuthenticated && <Navigation />}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <>
                  <SettingsPage />
                  {isAuthenticated && <Navigation />}
                </>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Notification */}
        <Notification />
      </div>
    </Router>
  );
}
