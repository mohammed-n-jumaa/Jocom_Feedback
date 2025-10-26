import api from './api';
import { API_ENDPOINTS } from '@/utils/constants';

// Mock users للتجربة بدون Backend
const MOCK_USERS = {
  'admin@jocom.jo': {
    email: 'admin@jocom.jo',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  'user@jocom.jo': {
    email: 'user@jocom.jo',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
  },
};

const authService = {
  /**
   * Login user
   */
  login: async (credentials) => {
    // Mock authentication - احذف هذا الكود عند الربط مع Laravel
    const user = MOCK_USERS[credentials.email];
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }
    
    return {
      user: {
        id: 1,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: 'mock-token-' + Date.now(),
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    // return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    // Mock logout
    return { message: 'Logged out successfully' };
    
    // استخدم هذا عند الربط مع Laravel
    // const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    // return response.data;
  },

  /**
   * Get current user
   */
  me: async () => {
    // Mock current user
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      return { user: JSON.parse(userStr) };
    }
    
    throw new Error('Not authenticated');
    
    // استخدم هذا عند الربط مع Laravel
    // const response = await api.get(API_ENDPOINTS.AUTH.ME);
    // return response.data;
  },
};

export default authService;