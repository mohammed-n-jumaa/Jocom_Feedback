import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '@/components/layout/UserLayout/UserLayout';
import AdminLayout from '@/components/layout/AdminLayout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { USER_ROLES } from '@/utils/constants';

// User Pages
import MaintenanceFeedback from '@/pages/user/Maintenance/MaintenanceFeedback';
import MarketingFeedback from '@/pages/user/Marketing/MarketingFeedback';
import DeliveryFeedback from '@/pages/user/Delivery/DeliveryFeedback';
import Login from '@/pages/user/Login/Login';

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import DashboardDetails from '@/pages/admin/DashboardDetails/DashboardDetails';
import Questions from '@/pages/admin/Questions/Questions';
import Feedbacks from '@/pages/admin/Feedbacks/Feedbacks';
import Users from '@/pages/admin/Users/Users';

const AppRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/maintenance" element={<MaintenanceFeedback />} />
        <Route path="/marketing" element={<MarketingFeedback />} />
        <Route path="/delivery" element={<DeliveryFeedback />} />
      </Route>

      {/* Login */}
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.USER]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="dashboard/details"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.USER]}>
              <DashboardDetails />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="questions"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <Questions />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="feedbacks"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.USER]}>
              <Feedbacks />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/maintenance" replace />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/maintenance" replace />} />
    </Routes>
  );
};

export default AppRoutes;