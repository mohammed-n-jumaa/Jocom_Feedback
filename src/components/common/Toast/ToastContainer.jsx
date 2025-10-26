import React from 'react';
import { Toaster } from 'react-hot-toast';
import useThemeStore from '@/store/themeStore';

const ToastContainer = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: isDarkMode ? '#334155' : '#ffffff',
          color: isDarkMode ? '#f1f5f9' : '#0f172a',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#ffffff',
          },
          style: {
            border: '2px solid #22c55e',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
          style: {
            border: '2px solid #ef4444',
          },
        },
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
};

export default ToastContainer;