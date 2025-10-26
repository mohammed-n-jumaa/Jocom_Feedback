import api from './api';
import { API_ENDPOINTS } from '@/utils/constants';

// Mock feedbacks data للتجربة
const MOCK_FEEDBACKS = [
  {
    id: 1,
    department: 'IT Support',
    rating_type: 'satisfied',
    rating_value: 10,
    nps_score: 100,
    contact: { email: 'customer1@example.com', phone: '+962791234567' },
    answers: [
      { question_id: 1, question_text: 'How would you rate our service?', answer: 'Excellent service' }
    ],
    language: 'en',
    created_at: '2025-01-15T10:30:00Z'
  },
  {
    id: 2,
    department: 'Customer Service',
    rating_type: 'neutral',
    rating_value: 7,
    nps_score: 50,
    contact: { email: 'customer2@example.com', phone: '+962797654321' },
    answers: [
      { question_id: 1, question_text: 'How would you rate our service?', answer: 'Service was okay' }
    ],
    language: 'en',
    created_at: '2025-01-14T14:20:00Z'
  }
];

let mockFeedbacksData = [...MOCK_FEEDBACKS];

const feedbackService = {
  /**
   * Get all feedbacks with pagination and filters
   */
  getFeedbacks: async (params = {}) => {
    // Mock implementation
    let filteredFeedbacks = [...mockFeedbacksData];

    if (params.department && params.department !== 'all') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.department === params.department);
    }

    if (params.rating_type && params.rating_type !== 'all') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.rating_type === params.rating_type);
    }

    return {
      success: true,
      data: filteredFeedbacks,
      total: filteredFeedbacks.length,
      page: 1,
      per_page: 10
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.get(API_ENDPOINTS.FEEDBACKS.LIST, { params });
    // return response.data;
  },

  /**
   * Create new feedback - Mock version
   */
  createFeedback: async (data) => {
    // Mock implementation
    const newFeedback = {
      id: Math.max(...mockFeedbacksData.map(f => f.id), 0) + 1,
      ...data,
      created_at: new Date().toISOString()
    };

    mockFeedbacksData.push(newFeedback);

    console.log('✅ Mock feedback created:', newFeedback);

    return {
      success: true,
      data: newFeedback,
      message: 'Feedback submitted successfully'
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.post(API_ENDPOINTS.FEEDBACKS.CREATE, data);
    // return response.data;
  },

  /**
   * Alias for createFeedback (للتوافق مع الكود القديم)
   */
  create: async (feedbackData) => {
    return await feedbackService.createFeedback(feedbackData);
  },

  /**
   * Get single feedback
   */
  getFeedback: async (id) => {
    // Mock implementation
    const feedback = mockFeedbacksData.find(f => f.id === parseInt(id));
    
    if (!feedback) {
      throw new Error('Feedback not found');
    }

    return {
      success: true,
      data: feedback
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.get(API_ENDPOINTS.FEEDBACKS.SHOW(id));
    // return response.data;
  },

  /**
   * Get all feedbacks (alias)
   */
  getAll: async (filters = {}) => {
    return await feedbackService.getFeedbacks(filters);
  },

  /**
   * Get by ID (alias)
   */
  getById: async (id) => {
    return await feedbackService.getFeedback(id);
  },

  /**
   * Soft delete feedback
   */
  deleteFeedback: async (id) => {
    // Mock implementation
    mockFeedbacksData = mockFeedbacksData.filter(f => f.id !== parseInt(id));

    return {
      success: true,
      message: 'Feedback deleted successfully'
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.delete(API_ENDPOINTS.FEEDBACKS.DELETE(id));
    // return response.data;
  },

  /**
   * Delete (alias)
   */
  delete: async (id) => {
    return await feedbackService.deleteFeedback(id);
  },

  /**
   * Restore soft deleted feedback
   */
  restoreFeedback: async (id) => {
    // Mock implementation
    return {
      success: true,
      message: 'Feedback restored successfully'
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.post(API_ENDPOINTS.FEEDBACKS.RESTORE(id));
    // return response.data;
  },

  /**
   * Force delete feedback
   */
  forceDeleteFeedback: async (id) => {
    // Mock implementation
    mockFeedbacksData = mockFeedbacksData.filter(f => f.id !== parseInt(id));

    return {
      success: true,
      message: 'Feedback permanently deleted'
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.delete(API_ENDPOINTS.FEEDBACKS.FORCE_DELETE(id));
    // return response.data;
  },

  /**
   * Export feedbacks to Excel
   */
  exportFeedbacks: async (params = {}) => {
    // Mock implementation
    console.log('Export feedbacks with params:', params);
    return new Blob(['Mock Excel Data'], { type: 'application/vnd.ms-excel' });

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.get(API_ENDPOINTS.FEEDBACKS.EXPORT, {
    //   params,
    //   responseType: 'blob',
    // });
    // return response.data;
  },

  /**
   * Get feedback statistics
   */
  getStats: async (params = {}) => {
    // Mock implementation
    const feedbacks = mockFeedbacksData;
    const satisfied = feedbacks.filter(f => f.rating_type === 'satisfied').length;
    const neutral = feedbacks.filter(f => f.rating_type === 'neutral').length;
    const dissatisfied = feedbacks.filter(f => f.rating_type === 'dissatisfied').length;
    const total = feedbacks.length || 1;

    const avgRating = feedbacks.reduce((sum, f) => sum + f.rating_value, 0) / total;
    const avgNPS = feedbacks.reduce((sum, f) => sum + f.nps_score, 0) / total;

    return {
      success: true,
      total_feedbacks: total,
      satisfied_count: satisfied,
      neutral_count: neutral,
      dissatisfied_count: dissatisfied,
      average_rating: avgRating.toFixed(1),
      nps_score: Math.round(avgNPS),
      response_rate: 2.7,
      satisfaction_percentage: ((satisfied / total) * 100).toFixed(1),
      ratings_distribution: {
        1: feedbacks.filter(f => f.rating_value === 1).length,
        2: feedbacks.filter(f => f.rating_value === 2).length,
        3: feedbacks.filter(f => f.rating_value === 3).length,
        4: feedbacks.filter(f => f.rating_value === 4).length,
        5: feedbacks.filter(f => f.rating_value === 5).length,
        6: feedbacks.filter(f => f.rating_value === 6).length,
        7: feedbacks.filter(f => f.rating_value === 7).length,
        8: feedbacks.filter(f => f.rating_value === 8).length,
        9: feedbacks.filter(f => f.rating_value === 9).length,
        10: feedbacks.filter(f => f.rating_value === 10).length,
      }
    };

    // استخدم هذا عند الربط مع Laravel
    // const response = await api.get(API_ENDPOINTS.FEEDBACKS.STATS, { params });
    // return response.data;
  },

  /**
   * Get statistics (alias)
   */
  getStatistics: async (filters = {}) => {
    return await feedbackService.getStats(filters);
  },
};

export default feedbackService;