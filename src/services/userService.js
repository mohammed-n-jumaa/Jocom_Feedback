import api from './api';
import { API_ENDPOINTS } from '@/utils/constants';

const userService = {
  /**
   * Get all users
   */
  getUsers: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.USERS.LIST, { params });
    return response.data;
  },

  /**
   * Create new user
   */
  createUser: async (data) => {
    const response = await api.post(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  /**
   * Get single user
   */
  getUser: async (id) => {
    const response = await api.get(API_ENDPOINTS.USERS.SHOW(id));
    return response.data;
  },

  /**
   * Update user
   */
  updateUser: async (id, data) => {
    const response = await api.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (id) => {
    const response = await api.delete(API_ENDPOINTS.USERS.DELETE(id));
    return response.data;
  },
};

export default userService;