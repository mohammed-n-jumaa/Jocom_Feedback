import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import authService from '@/services/authService';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAuth, logout: logoutStore, user, isAuthenticated } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    },
    onError: () => {
      // Even if API call fails, clear local data
      logoutStore();
      queryClient.clear();
      navigate('/admin/login');
    },
  });

  // Get current user
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.me,
    enabled: isAuthenticated,
    retry: false,
    onError: () => {
      logoutStore();
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    currentUser,
  };
};