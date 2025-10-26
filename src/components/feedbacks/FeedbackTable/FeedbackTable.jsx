import React, { useState } from 'react';
import styles from './FeedbackTable.module.css';
import Button from '@/components/common/Button/Button';
import { IoEye, IoDownload, IoTrash, IoRefresh } from 'react-icons/io5';
import { formatDate } from '@/utils/helpers';
import { DATE_FORMATS } from '@/utils/constants';
import { PAGINATION } from '@/utils/constants';

const FeedbackTable = ({ 
  feedbacks = [], 
  onView, 
  onDelete, 
  onRestore,
  onExport,
  pagination,
  onPageChange,
  onPerPageChange 
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(feedbacks.map(f => f.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getRatingColor = (ratingType) => {
    const colors = {
      satisfied: '#22c55e',
      neutral: '#f59e0b',
      dissatisfied: '#ef4444',
    };
    return colors[ratingType] || '#64748b';
  };

  const getRatingEmoji = (ratingType) => {
    const emojis = {
      satisfied: '😊',
      neutral: '😐',
      dissatisfied: '😠',
    };
    return emojis[ratingType] || '❓';
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedIds.length === feedbacks.length && feedbacks.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>RATING (UNIFIED 10-LEVEL)</th>
              <th>CONTACT</th>
              <th>NPS SCORE</th>
              <th>RESPONSES</th>
              <th>SUBMITTED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(feedback.id)}
                      onChange={() => handleSelectOne(feedback.id)}
                    />
                  </td>
                  <td>
                    <div className={styles.ratingCell}>
                      <span className={styles.ratingEmoji}>
                        {getRatingEmoji(feedback.rating_type)}
                      </span>
                      <div className={styles.ratingInfo}>
                        <span className={styles.ratingValue}>
                          {feedback.rating_value}/10
                        </span>
                        <span className={styles.ratingType} style={{ color: getRatingColor(feedback.rating_type) }}>
                          {feedback.rating_type}
                        </span>
                      </div>
                      <span className={styles.languageBadge}>
                        {feedback.language === 'ar' ? 'Arabic (10/10)' : 'English (1-5)'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contactCell}>
                      {feedback.contact?.email ? (
                        <>
                          <span className={styles.contactIcon}>📧</span>
                          <span>{feedback.contact.email}</span>
                        </>
                      ) : (
                        <span className={styles.noContact}>No email</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.npsCell}>
                      <span className={styles.npsValue}>{feedback.nps_score}/10</span>
                      <span className={styles.npsLabel}>
                        {feedback.nps_score >= 9 ? 'Promoter' : feedback.nps_score >= 7 ? 'Passive' : 'Detractor'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.responseBadge}>
                      {feedback.answers?.length || 0} responses
                    </span>
                    <span className={styles.department}>{feedback.department}</span>
                  </td>
                  <td>
                    <div className={styles.dateCell}>
                      <span className={styles.date}>
                        {formatDate(feedback.created_at, DATE_FORMATS.DISPLAY)}
                      </span>
                      <span className={styles.time}>
                        {formatDate(feedback.created_at, 'HH:mm')}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => onView(feedback.id)}
                        title="View details"
                      >
                        <IoEye />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => onExport(feedback.id)}
                        title="Download"
                      >
                        <IoDownload />
                      </button>
                      {feedback.deleted_at ? (
                        <button
                          className={styles.actionBtn}
                          onClick={() => onRestore(feedback.id)}
                          title="Restore"
                        >
                          <IoRefresh />
                        </button>
                      ) : (
                        <button
                          className={styles.actionBtnDanger}
                          onClick={() => onDelete(feedback.id)}
                          title="Delete"
                        >
                          <IoTrash />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.emptyState}>
                  No feedbacks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.total > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {pagination.from} to {pagination.to} of {pagination.total} entries
          </div>

          <div className={styles.paginationControls}>
            <select
              className={styles.perPageSelect}
              value={pagination.per_page}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
            >
              {PAGINATION.PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>{option} per page</option>
              ))}
            </select>

            <div className={styles.paginationButtons}>
              <button
                className={styles.paginationBtn}
                onClick={() => onPageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                Previous
              </button>

              {[...Array(pagination.last_page)].map((_, index) => {
                const page = index + 1;
                // Show first, last, current, and adjacent pages
                if (
                  page === 1 ||
                  page === pagination.last_page ||
                  (page >= pagination.current_page - 1 && page <= pagination.current_page + 1)
                ) {
                  return (
                    <button
                      key={page}
                      className={`${styles.paginationBtn} ${
                        page === pagination.current_page ? styles.active : ''
                      }`}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === pagination.current_page - 2 ||
                  page === pagination.current_page + 2
                ) {
                  return <span key={page} className={styles.ellipsis}>...</span>;
                }
                return null;
              })}

              <button
                className={styles.paginationBtn}
                onClick={() => onPageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;