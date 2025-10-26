import React from 'react';
import styles from './Filters.module.css';

const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className={styles.filterGroup}>
      <label className={styles.label}>Date Range</label>
      <div className={styles.dateRange}>
        <input
          type="date"
          className={styles.dateInput}
          value={startDate || ''}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
        <span className={styles.dateSeparator}>to</span>
        <input
          type="date"
          className={styles.dateInput}
          value={endDate || ''}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;