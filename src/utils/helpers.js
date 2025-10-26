import { format } from 'date-fns';
import { DATE_FORMATS, NPS_CATEGORIES } from './constants';

/**
 * Format date using date-fns
 */
export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  return format(new Date(date), formatStr);
};

/**
 * Calculate NPS Score
 */
export const calculateNPS = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  
  const promoters = ratings.filter(r => r >= 9).length;
  const detractors = ratings.filter(r => r <= 6).length;
  const total = ratings.length;
  
  return Math.round(((promoters - detractors) / total) * 100);
};

/**
 * Get NPS Category
 */
export const getNPSCategory = (rating) => {
  if (rating >= NPS_CATEGORIES.PROMOTERS.min) return 'promoters';
  if (rating >= NPS_CATEGORIES.PASSIVES.min) return 'passives';
  return 'detractors';
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

/**
 * Get percentage change
 */
export const getPercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone (Jordanian format)
 */
export const isValidPhone = (phone) => {
  // Jordanian phone: 07XXXXXXXX or +9627XXXXXXXX
  const phoneRegex = /^(07\d{8}|\+9627\d{8})$/;
  return phoneRegex.test(phone);
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as 07XX XXX XXX
  if (cleaned.length === 10 && cleaned.startsWith('07')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * Get color by rating
 */
export const getColorByRating = (rating) => {
  if (rating >= 8) return '#22c55e'; // Green
  if (rating >= 5) return '#f59e0b'; // Yellow
  return '#ef4444'; // Red
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Group array by key
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Generate random ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Convert rating to 10-level scale
 */
export const convertToTenLevel = (rating, emojiType) => {
  // Already returns: satisfied=10, neutral=5, dissatisfied=1
  return rating;
};