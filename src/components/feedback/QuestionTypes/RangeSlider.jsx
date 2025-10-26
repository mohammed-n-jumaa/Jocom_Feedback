import React from 'react';
import styles from './QuestionTypes.module.css';

const RangeSlider = ({ min = 0, max = 10, step = 1, value, onChange, error }) => {
  const currentValue = value || min;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.rangeContainer}>
        <div className={styles.rangeValue}>{currentValue}</div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.rangeInput}
          style={{
            background: `linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) ${percentage}%, var(--light-bg-tertiary) ${percentage}%, var(--light-bg-tertiary) 100%)`
          }}
        />
        
        <div className={styles.rangeLabels}>
          <span className={styles.rangeLabel}>
            <span className={styles.labelValue}>{min}</span>
            <span className={styles.labelText}>Minimum</span>
          </span>
          <span className={styles.rangeLabel}>
            <span className={styles.labelValue}>{Math.floor((min + max) / 2)}</span>
            <span className={styles.labelText}>Average</span>
          </span>
          <span className={styles.rangeLabel}>
            <span className={styles.labelValue}>{max}</span>
            <span className={styles.labelText}>Maximum</span>
          </span>
        </div>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default RangeSlider;