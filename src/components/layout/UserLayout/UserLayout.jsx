import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './UserLayout.module.css';
import useThemeStore from '@/store/themeStore';

const UserLayout = () => {
  const { language, setLanguage } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  const handleLogoClick = () => {
    navigate('/admin/login');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <button 
            onClick={handleLogoClick}
            className={styles.headerBrand}
            aria-label="Go to Admin Login"
          >
            <img 
              src="/logo.png" 
              alt="JoCom Logo" 
              className={styles.logoImg}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </button>

          <div className={styles.headerCenter}>
            <div className={styles.headerTitle}>
              <h4>{language === 'ar' ? 'تقييم العملاء' : 'Customer Feedback'}</h4>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.languageToggle} onClick={toggleLanguage}>
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>© 2025 JoCom Feedback. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</p>
      </footer>
    </div>
  );
};

export default UserLayout;