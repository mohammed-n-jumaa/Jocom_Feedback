import React from 'react';
import styles from './QuestionTypes.module.css';
import clsx from 'clsx';

const LongText = ({ value, onChange, error }) => {
  return (
    <div className={styles.container}>
      <textarea
        className={clsx(styles.textarea, { [styles.textareaError]: error })}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your detailed answer here..."
        rows={6}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default LongText;