import React from 'react';
import Modal from '@/components/common/Modal/Modal';
import styles from './FeedbackDetails.module.css';
import Button from '@/components/common/Button/Button';
import { IoDownload, IoClose } from 'react-icons/io5';
import { formatDate } from '@/utils/helpers';
import { DATE_FORMATS } from '@/utils/constants';
import { exportDetailedFeedback } from '@/utils/exportToExcel';

const FeedbackDetails = ({ feedback, isOpen, onClose }) => {
  if (!feedback) return null;

  const handleExport = () => {
    exportDetailedFeedback(feedback);
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
    <Modal isOpen={isOpen} onClose={onClose} title="Feedback Details" size="large">
      <div className={styles.container}>
        {/* Header Info */}
        <div className={styles.header}>
          <div className={styles.ratingSection}>
            <span className={styles.emoji}>{getRatingEmoji(feedback.rating_type)}</span>
            <div className={styles.ratingInfo}>
              <span className={styles.ratingValue}>{feedback.rating_value}/10</span>
              <span 
                className={styles.ratingType}
                style={{ color: getRatingColor(feedback.rating_type) }}
              >
                {feedback.rating_type}
              </span>
            </div>
          </div>

          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Department:</span>
              <span className={styles.metaValue}>{feedback.department}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Date:</span>
              <span className={styles.metaValue}>
                {formatDate(feedback.created_at, DATE_FORMATS.DISPLAY_WITH_TIME)}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Language:</span>
              <span className={styles.metaValue}>
                {feedback.language === 'ar' ? 'Arabic (6-10)' : 'English (1-5)'}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>NPS Score:</span>
              <span className={styles.metaValue} style={{ color: '#22c55e', fontWeight: 700 }}>
                {feedback.nps_score}/10
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        {(feedback.contact?.email || feedback.contact?.phone) && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <div className={styles.contactGrid}>
              {feedback.contact?.email && (
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <div>
                    <div className={styles.contactLabel}>Email</div>
                    <div className={styles.contactValue}>{feedback.contact.email}</div>
                  </div>
                </div>
              )}
              {feedback.contact?.phone && (
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📱</span>
                  <div>
                    <div className={styles.contactLabel}>Phone</div>
                    <div className={styles.contactValue}>{feedback.contact.phone}</div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.privacyNote}>
              🔒 This information is confidential and should only be used for follow-up purposes
            </div>
          </div>
        )}

        {/* Answers */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Responses ({feedback.answers?.length || 0} questions)
          </h3>
          
          {feedback.answers && feedback.answers.length > 0 ? (
            <div className={styles.answersList}>
              {feedback.answers.map((answer, index) => (
                <div key={index} className={styles.answerCard}>
                  <div className={styles.questionNumber}>Question {index + 1}</div>
                  <div className={styles.questionText}>{answer.question_text}</div>
                  <div className={styles.answerContent}>
                    {Array.isArray(answer.answer) ? (
                      <ul className={styles.answerList}>
                        {answer.answer.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.answerText}>{answer.answer}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>No responses available</div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose} icon={<IoClose />}>
            Close
          </Button>
          <Button onClick={handleExport} icon={<IoDownload />}>
            Export to Excel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackDetails;