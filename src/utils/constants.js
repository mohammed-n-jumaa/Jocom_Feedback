// Departments
export const DEPARTMENTS = {
  MAINTENANCE: 'maintenance',
  MARKETING: 'marketing',
  DELIVERY: 'delivery',
};

export const DEPARTMENT_LABELS = {
  [DEPARTMENTS.MAINTENANCE]: {
    en: 'Maintenance',
    ar: 'الصيانة',
  },
  [DEPARTMENTS.MARKETING]: {
    en: 'Marketing',
    ar: 'التسويق',
  },
  [DEPARTMENTS.DELIVERY]: {
    en: 'Delivery',
    ar: 'التوصيل',
  },
};

// Emojis & Ratings
export const EMOJIS = {
  DISSATISFIED: 'dissatisfied',
  NEUTRAL: 'neutral',
  SATISFIED: 'satisfied',
};

export const EMOJI_CONFIG = {
  en: {
    [EMOJIS.DISSATISFIED]: {
      emoji: '😞',
      label: 'Dissatisfied',
      rating: 1,
      color: '#ef4444',
    },
    [EMOJIS.NEUTRAL]: {
      emoji: '😐',
      label: 'Neutral',
      rating: 5,
      color: '#f59e0b',
    },
    [EMOJIS.SATISFIED]: {
      emoji: '😊',
      label: 'Satisfied',
      rating: 10,
      color: '#22c55e',
    },
  },
  ar: {
    [EMOJIS.DISSATISFIED]: {
      emoji: '😞',
      label: 'غير راضي',
      rating: 1,
      color: '#ef4444',
    },
    [EMOJIS.NEUTRAL]: {
      emoji: '😐',
      label: 'محايد',
      rating: 5,
      color: '#f59e0b',
    },
    [EMOJIS.SATISFIED]: {
      emoji: '😊',
      label: 'راضي',
      rating: 10,
      color: '#22c55e',
    },
  },
};

// Question Types
export const QUESTION_TYPES = {
  SINGLE_CHOICE: 'single_choice',
  MULTIPLE_CHOICE: 'multiple_choice',
  SHORT_TEXT: 'short_text',
  LONG_TEXT: 'long_text',
  RANGE_SLIDER: 'range_slider',
  EMAIL: 'email',
  PHONE: 'phone',
};

export const QUESTION_TYPE_LABELS = {
  [QUESTION_TYPES.SINGLE_CHOICE]: 'Single Choice (Radio)',
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 'Multiple Choice (Checkbox)',
  [QUESTION_TYPES.SHORT_TEXT]: 'Short Text',
  [QUESTION_TYPES.LONG_TEXT]: 'Long Text (Textarea)',
  [QUESTION_TYPES.RANGE_SLIDER]: 'Range Slider',
  [QUESTION_TYPES.EMAIL]: 'Email Address',
  [QUESTION_TYPES.PHONE]: 'Phone Number',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Languages
export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  FEEDBACKS: {
    LIST: '/feedbacks',
    CREATE: '/feedbacks',
    SHOW: (id) => `/feedbacks/${id}`,
    DELETE: (id) => `/feedbacks/${id}`,
    RESTORE: (id) => `/feedbacks/${id}/restore`,
    FORCE_DELETE: (id) => `/feedbacks/${id}/force`,
    EXPORT: '/feedbacks/export',
    STATS: '/feedbacks/stats',
  },
  QUESTIONS: {
    LIST: '/questions',
    CREATE: '/questions',
    SHOW: (id) => `/questions/${id}`,
    UPDATE: (id) => `/questions/${id}`,
    DELETE: (id) => `/questions/${id}`,
    BY_DEPARTMENT: (dept, emoji) => `/questions/${dept}/${emoji}`,
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    SHOW: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    CHARTS: '/dashboard/charts',
    DETAILED_STATS: '/dashboard/detailed-stats',
  },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [10, 25, 50, 100],
};

// Idle Timeout (1 minute)
export const IDLE_TIMEOUT = parseInt(import.meta.env.VITE_IDLE_TIMEOUT) || 60000;

// NPS Categories
export const NPS_CATEGORIES = {
  PROMOTERS: { min: 5, max: 10, label: 'Promoters', color: '#22c55e' },
  PASSIVES: { min: 4, max: 4.9, label: 'Passives', color: '#f59e0b' },
  DETRACTORS: { min: 1, max: 3.9, label: 'Detractors', color: '#ef4444' },
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    FEEDBACK_SUBMITTED: {
      en: 'Thank you for your feedback!',
      ar: 'شكراً لك على ملاحظاتك!',
    },
    QUESTION_CREATED: 'Question created successfully',
    QUESTION_UPDATED: 'Question updated successfully',
    QUESTION_DELETED: 'Question deleted successfully',
    USER_CREATED: 'User created successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DELETED: 'User deleted successfully',
    FEEDBACK_DELETED: 'Feedback deleted successfully',
    FEEDBACK_RESTORED: 'Feedback restored successfully',
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    VALIDATION: 'Please check your input and try again.',
  },
};