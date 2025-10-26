import React from 'react';
import { motion } from 'framer-motion';
import styles from './EmojiSelector.module.css';
import { EMOJI_CONFIG } from '@/utils/constants';
import useThemeStore from '@/store/themeStore';

const EmojiSelector = ({ onSelect, department, isLoading = false }) => {
  const { language } = useThemeStore();
  const emojis = EMOJI_CONFIG[language];

  const handleSelect = (emojiType) => {
    if (isLoading) return;
    onSelect(emojiType);
  };

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {language === 'ar' ? 'كيف كانت تجربتك اليوم؟' : 'How Was Your Experience Today?'}
      </motion.h1>

      <div className={styles.emojiGrid}>
        {Object.entries(emojis).map(([key, config], index) => (
          <motion.button
            key={key}
            className={`${styles.emojiCard} ${isLoading ? styles.disabled : ''}`}
            onClick={() => handleSelect(key)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={!isLoading ? { 
              scale: 1.05,
              y: -10,
            } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            style={{ '--emoji-color': config.color }}
            disabled={isLoading}
          >
            <span className={styles.emojiIcon}>{config.emoji}</span>
            <span className={styles.emojiLabel}>{config.label}</span>
          </motion.button>
        ))}
      </div>

      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <span className={styles.loadingText}>
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </span>
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;