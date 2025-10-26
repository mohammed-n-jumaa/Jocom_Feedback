import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;