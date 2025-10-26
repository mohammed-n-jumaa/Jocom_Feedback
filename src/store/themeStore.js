import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDarkMode: false,
      language: 'en',
      direction: 'ltr',
      
      toggleDarkMode: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        applyTheme(newMode, get().language);
      },
      
      setDarkMode: (value) => {
        set({ isDarkMode: value });
        applyTheme(value, get().language);
      },
      
      setLanguage: (lang) => {
        const direction = lang === 'ar' ? 'ltr' : 'ltr';
        set({ language: lang, direction });
        
        // Update document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = direction;
        document.body.dir = direction;
        
        // Store in localStorage
        localStorage.setItem('language', lang);
        
        // Reapply theme
        applyTheme(get().isDarkMode, lang);
      },
      
      initializeTheme: () => {
        const { isDarkMode, language } = get();
        applyTheme(isDarkMode, language);
        
        // Apply language
        const direction = language === 'ar' ? 'ltr' : 'ltr';
        document.documentElement.lang = language;
        document.documentElement.dir = direction;
        document.body.dir = direction;
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Helper function to apply theme
function applyTheme(isDarkMode, language) {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    document.body.style.color = '#f1f5f9';
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#1e293b';
  }
  
  // Store theme
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

export default useThemeStore;