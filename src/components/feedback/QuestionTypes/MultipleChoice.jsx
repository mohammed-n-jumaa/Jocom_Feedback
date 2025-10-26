import React from 'react';
import styles from './QuestionTypes.module.css';
import clsx from 'clsx';

const MultipleChoice = ({ options, value = [], onChange, error }) => {
  const handleChange = (option) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsGrid}>
        {options.map((option, index) => (
          <label
            key={index}
            className={clsx(styles.option, {
              [styles.selected]: value.includes(option),
              [styles.error]: error,
            })}
          >
            <input
              type="checkbox"
              value={option}
              checked={value.includes(option)}
              onChange={() => handleChange(option)}
              className={styles.checkboxInput}
            />
            <span className={styles.optionText}>{option}</span>
            <span className={styles.checkmarkBox}></span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default MultipleChoice;