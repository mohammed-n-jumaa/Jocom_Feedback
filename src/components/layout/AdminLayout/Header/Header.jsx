import React from 'react';
import styles from './Header.module.css';
import { MdMenu, MdDarkMode, MdLightMode } from 'react-icons/md';
import useThemeStore from '@/store/themeStore';

const Header = ({ onMenuClick, title }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <MdMenu />
        </button>
        {title && <h1 className={styles.title}>{title}</h1>}
      </div>

      <div className={styles.right}>
        <button 
          className={styles.themeToggle} 
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </header>
  );
};

export default Header;