import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles from './assets/styles/GlobalStyles';
import ToastContainer from './components/common/Toast/ToastContainer';
import useThemeStore from './store/themeStore';
import useAuthStore from './store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const { initializeTheme } = useThemeStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    initializeTheme();
    checkAuth();
  }, [initializeTheme, checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;