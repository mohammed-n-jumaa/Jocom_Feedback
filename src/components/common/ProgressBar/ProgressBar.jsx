import React from 'react';
import styles from './ProgressBar.module.css';
import clsx from 'clsx';

const ProgressBar = ({ current, total, showLabel = true, className }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={clsx(styles.container, className)}>
      {showLabel && (
        <div className={styles.label}>
          <span className={styles.text}>
            {current}/{total} questions completed
          </span>
          <span className={styles.percentage}>{percentage}%</span>
        </div>
      )}
      
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;