import { create } from 'zustand';

const useQuestionStore = create((set, get) => ({
  questions: [],
  selectedQuestion: null,
  filters: {
    department: null,
    emoji: null,
    type: null,
  },
  
  setQuestions: (questions) => set({ questions }),
  
  addQuestion: (question) => {
    set({ questions: [...get().questions, question] });
  },
  
  updateQuestion: (id, updatedQuestion) => {
    const questions = get().questions.map(q => 
      q.id === id ? { ...q, ...updatedQuestion } : q
    );
    set({ questions });
  },
  
  deleteQuestion: (id) => {
    const questions = get().questions.filter(q => q.id !== id);
    set({ questions });
  },
  
  setSelectedQuestion: (question) => set({ selectedQuestion: question }),
  
  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
  },
  
  getFilteredQuestions: () => {
    const { questions, filters } = get();
    
    return questions.filter(q => {
      if (filters.department && !q.departments.includes(filters.department)) {
        return false;
      }
      if (filters.emoji && !q.emojis.includes(filters.emoji)) {
        return false;
      }
      if (filters.type && q.question_type !== filters.type) {
        return false;
      }
      return true;
    });
  },
  
  resetFilters: () => {
    set({ filters: { department: null, emoji: null, type: null } });
  },
}));

export default useQuestionStore;