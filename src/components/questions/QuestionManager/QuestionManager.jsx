import React, { useState } from 'react';
import styles from './QuestionManager.module.css';
import Button from '@/components/common/Button/Button';
import { IoAdd, IoRefresh, IoTrash } from 'react-icons/io5';
import { EMOJIS, DEPARTMENTS, EMOJI_CONFIG } from '@/utils/constants';
import clsx from 'clsx';

const QuestionManager = ({ questions, onEdit, onDelete, onAdd }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('dissatisfied');

  // Group questions by emoji
  const groupedQuestions = {
    dissatisfied: questions.filter(q => q.emojis?.includes(EMOJIS.DISSATISFIED)),
    neutral: questions.filter(q => q.emojis?.includes(EMOJIS.NEUTRAL)),
    satisfied: questions.filter(q => q.emojis?.includes(EMOJIS.SATISFIED)),
  };

  const emojiTabs = [
    { key: 'dissatisfied', emoji: '😠', labelEn: 'Dissatisfied', labelAr: 'غير راضي', count: groupedQuestions.dissatisfied.length },
    { key: 'neutral', emoji: '😐', labelEn: 'Neutral', labelAr: 'محايد', count: groupedQuestions.neutral.length },
    { key: 'satisfied', emoji: '😊', labelEn: 'Satisfied', labelAr: 'راضي', count: groupedQuestions.satisfied.length },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Configure Questions for Each Rating Level</h3>
        <p className={styles.subtitle}>English: Dissatisfied, Neutral, Satisfied • Arabic: غير راضي, محايد, راضي</p>
        
        <div className={styles.actions}>
          <Button variant="outline" icon={<IoTrash />} size="small">
            Delete All
          </Button>
          <Button variant="outline" icon={<IoRefresh />} size="small">
            Refresh
          </Button>
        </div>
      </div>

      <div className={styles.emojiTabs}>
        {emojiTabs.map(tab => (
          <button
            key={tab.key}
            className={clsx(styles.emojiTab, selectedEmoji === tab.key && styles.active)}
            onClick={() => setSelectedEmoji(tab.key)}
          >
            <span className={styles.tabEmoji}>{tab.emoji}</span>
            <div className={styles.tabInfo}>
              <span className={styles.tabLabel}>{tab.labelEn}</span>
              <span className={styles.tabLabelAr}>{tab.labelAr}</span>
            </div>
            <span className={styles.tabBadge}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.questionsSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>
            Questions for {emojiTabs.find(t => t.key === selectedEmoji)?.labelEn}
            <span className={styles.sectionBadge}>
              English System • Rating Level: {selectedEmoji === 'satisfied' ? '1/5' : selectedEmoji === 'neutral' ? '3/5' : '1/5'}
            </span>
          </h4>
          <Button icon={<IoAdd />} onClick={onAdd}>
            Add Question
          </Button>
        </div>

        <div className={styles.questionsList}>
          {groupedQuestions[selectedEmoji]?.length > 0 ? (
            groupedQuestions[selectedEmoji].map(question => (
              <div key={question.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionType}>{question.question_type}</span>
                  <div className={styles.questionBadges}>
                    {question.is_required && (
                      <span className={styles.badge} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                        Required
                      </span>
                    )}
                    <span className={styles.badge} style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                      Order: {question.order}
                    </span>
                  </div>
                </div>

                <div className={styles.questionContent}>
                  <p className={styles.questionText}>{question.question_text.en}</p>
                  {question.question_text.ar && (
                    <p className={styles.questionTextAr}>{question.question_text.ar}</p>
                  )}
                </div>

                {question.options && question.options.length > 0 && (
                  <div className={styles.questionOptions}>
                    <span className={styles.optionsLabel}>Options:</span>
                    {question.options.map((opt, idx) => (
                      <span key={idx} className={styles.optionChip}>
                        {opt.en}
                      </span>
                    ))}
                  </div>
                )}

                <div className={styles.questionFooter}>
                  <div className={styles.questionDepartments}>
                    {question.departments?.map(dept => (
                      <span key={dept} className={styles.deptChip}>{dept}</span>
                    ))}
                  </div>
                  
                  <div className={styles.questionActions}>
                    <button className={styles.actionBtn} onClick={() => onEdit(question)}>
                      Edit
                    </button>
                    <button 
                      className={clsx(styles.actionBtn, styles.danger)} 
                      onClick={() => onDelete(question.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>No questions for this rating level</p>
              <Button onClick={onAdd}>Add First Question</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionManager;