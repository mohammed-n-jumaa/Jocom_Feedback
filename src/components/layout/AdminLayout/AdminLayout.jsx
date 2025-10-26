import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import useThemeStore from '@/store/themeStore';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // Desktop: مفتوحة افتراضياً
      } else {
        setSidebarOpen(false); // Mobile: مغلقة افتراضياً
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
        isMobile={isMobile}
      />
      
      <div className={`${styles.mainContent} ${!sidebarOpen && !isMobile ? styles.sidebarClosed : ''}`}>
        <Header onMenuClick={toggleSidebar} />
        
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;