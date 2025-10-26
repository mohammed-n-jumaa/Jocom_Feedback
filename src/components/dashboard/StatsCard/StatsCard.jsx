import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatsCard.module.css';
import clsx from 'clsx';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'blue',
  trend,
  trendValue,
  subtitle,
  onClick 
}) => {
  const hasTrend = trend && trendValue;
  const isPositive = trend === 'up';

  return (
    <motion.div
      className={clsx(styles.card, onClick && styles.clickable)}
      onClick={onClick}
      whileHover={onClick ? { y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.info}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <div className={clsx(styles.iconWrapper, styles[color])}>
            {icon}
          </div>
        </div>

        <div className={styles.value}>{value}</div>

        {hasTrend && (
          <div className={styles.trend}>
            <span className={clsx(styles.trendBadge, isPositive ? styles.up : styles.down)}>
              {isPositive ? <MdTrendingUp /> : <MdTrendingDown />}
              {trendValue}
            </span>
            <span className={styles.trendText}>vs last period</span>
          </div>
        )}
      </div>

      <div className={clsx(styles.progressBar, styles[color])}></div>
    </motion.div>
  );
};

export default StatsCard;