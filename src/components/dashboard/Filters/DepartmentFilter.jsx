import React from 'react';
import styles from './Filters.module.css';
import { DEPARTMENTS, DEPARTMENT_LABELS } from '@/utils/constants';

const DepartmentFilter = ({ value, onChange, language = 'en' }) => {
  return (
    <div className={styles.filterGroup}>
      <label className={styles.label}>Department</label>
      <select
        className={styles.select}
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">All Departments</option>
        {Object.values(DEPARTMENTS).map(dept => (
          <option key={dept} value={dept}>
            {DEPARTMENT_LABELS[dept][language]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;