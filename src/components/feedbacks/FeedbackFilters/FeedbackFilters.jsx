import React from 'react';
import styles from './FeedbackFilters.module.css';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { IoSearch, IoClose, IoFunnel } from 'react-icons/io5';
import { DEPARTMENTS, DEPARTMENT_LABELS, EMOJIS } from '@/utils/constants';

const FeedbackFilters = ({ filters, onFilterChange, onClearFilters, onApply }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <IoFunnel />
          <span>Filter & Search</span>
        </div>
        <Button variant="ghost" size="small" icon={<IoClose />} onClick={onClearFilters}>
          Clear
        </Button>
      </div>

      <div className={styles.filtersGrid}>
        {/* Search */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            <IoSearch />
            Search
          </label>
          <Input
            type="text"
            placeholder="Search by email, phone, or response content..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            fullWidth
          />
        </div>

        {/* Rating Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            ⭐ Rating
          </label>
          <select
            className={styles.select}
            value={filters.rating || ''}
            onChange={(e) => onFilterChange('rating', e.target.value)}
          >
            <option value="">All Ratings</option>
            {Object.values(EMOJIS).map(emoji => (
              <option key={emoji} value={emoji}>
                {emoji.charAt(0).toUpperCase() + emoji.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            🏢 Department
          </label>
          <select
            className={styles.select}
            value={filters.department || ''}
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            {Object.values(DEPARTMENTS).map(dept => (
              <option key={dept} value={dept}>
                {DEPARTMENT_LABELS[dept].en}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            📅 From Date
          </label>
          <input
            type="date"
            className={styles.dateInput}
            value={filters.fromDate || ''}
            onChange={(e) => onFilterChange('fromDate', e.target.value)}
          />
        </div>

        {/* To Date */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            📅 To Date
          </label>
          <input
            type="date"
            className={styles.dateInput}
            value={filters.toDate || ''}
            onChange={(e) => onFilterChange('toDate', e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            🔧 Actions
          </label>
          <Button fullWidth onClick={onApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFilters;