import api from './api';
import { API_ENDPOINTS } from '@/utils/constants';

const questionService = {
  /**
   * Get all questions
   */
  getQuestions: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.QUESTIONS.LIST, { params });
    return response.data;
  },

  /**
   * Get questions by department and emoji
   */
  getQuestionsByDepartmentEmoji: async (department, emoji, language = 'en') => {
    const response = await api.get(
      API_ENDPOINTS.QUESTIONS.BY_DEPARTMENT(department, emoji),
      { params: { language } }
    );
    return response.data;
  },

  /**
   * Create new question
   */
  createQuestion: async (data) => {
    const response = await api.post(API_ENDPOINTS.QUESTIONS.CREATE, data);
    return response.data;
  },

  /**
   * Get single question
   */
  getQuestion: async (id) => {
    const response = await api.get(API_ENDPOINTS.QUESTIONS.SHOW(id));
    return response.data;
  },

  /**
   * Update question
   */
  updateQuestion: async (id, data) => {
    const response = await api.put(API_ENDPOINTS.QUESTIONS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete question
   */
  deleteQuestion: async (id) => {
    const response = await api.delete(API_ENDPOINTS.QUESTIONS.DELETE(id));
    return response.data;
  },
};

export default questionService;