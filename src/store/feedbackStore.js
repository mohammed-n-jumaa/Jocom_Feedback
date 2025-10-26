import { create } from 'zustand';

const useFeedbackStore = create((set, get) => ({
  currentDepartment: null,
  currentEmoji: null,
  currentLanguage: 'en',
  answers: [],
  contactInfo: {
    email: '',
    phone: '',
  },
  
  setDepartment: (department) => set({ currentDepartment: department }),
  
  setEmoji: (emoji) => set({ currentEmoji: emoji }),
  
  setLanguage: (language) => set({ currentLanguage: language }),
  
  addAnswer: (questionId, answer) => {
    const answers = get().answers;
    const existingIndex = answers.findIndex(a => a.question_id === questionId);
    
    if (existingIndex >= 0) {
      // Update existing answer
      const newAnswers = [...answers];
      newAnswers[existingIndex] = { question_id: questionId, answer };
      set({ answers: newAnswers });
    } else {
      // Add new answer
      set({ answers: [...answers, { question_id: questionId, answer }] });
    }
  },
  
  setContactInfo: (info) => {
    set({ contactInfo: { ...get().contactInfo, ...info } });
  },
  
  getFeedbackData: () => {
    const { currentDepartment, currentEmoji, currentLanguage, answers, contactInfo } = get();
    return {
      department: currentDepartment,
      rating_type: currentEmoji,
      language: currentLanguage,
      answers,
      contact: contactInfo,
    };
  },
  
  resetFeedback: () => {
    set({
      currentDepartment: null,
      currentEmoji: null,
      answers: [],
      contactInfo: { email: '', phone: '' },
    });
  },
}));

export default useFeedbackStore;