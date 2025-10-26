import React from 'react';
import styles from './QuestionTypes.module.css';
import clsx from 'clsx';

const SingleChoice = ({ options, value, onChange, error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.optionsGrid}>
        {options.map((option, index) => (
          <label
            key={index}
            className={clsx(styles.option, {
              [styles.selected]: value === option,
              [styles.error]: error,
            })}
          >
            <input
              type="radio"
              name="single-choice"
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.optionText}>{option}</span>
            <span className={styles.checkmark}></span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default SingleChoice;