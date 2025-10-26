import React, { useState } from 'react';
import styles from '../UserFeedback.module.css';
import EmojiSelector from '@/components/feedback/EmojiSelector/EmojiSelector';
import QuestionForm from '@/components/feedback/QuestionForm/QuestionForm';
import questionService from '@/services/questionService';
import feedbackService from '@/services/feedbackService';
import useThemeStore from '@/store/themeStore';
import { Modal } from '@/components/common/SuccessModal/SuccessModal';

const Marketing = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { language } = useThemeStore();

  const handleEmojiSelect = async (emojiType) => {
    setLoading(true);
    
    try {
      const response = await questionService.getAll();
      
      if (response.success && response.data) {
        const filteredQuestions = response.data.filter(
          q => q.is_active && q.rating_types?.includes(emojiType)
        );

        console.log('Questions for', emojiType, ':', filteredQuestions);

        if (filteredQuestions.length === 0) {
          await submitFeedbackWithoutQuestions(emojiType);
        } else {
          setQuestions(filteredQuestions);
          setSelectedEmoji(emojiType);
        }
      } else {
        await submitFeedbackWithoutQuestions(emojiType);
      }
    } catch (error) {
      console.error('Error checking questions:', error);
      await submitFeedbackWithoutQuestions(emojiType);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedbackWithoutQuestions = async (emojiType) => {
    try {
      const feedbackData = {
        rating_type: emojiType,
        rating_value: getRatingValue(emojiType),
        nps_score: getNPSScore(emojiType),
        department: 'Marketing',
        contact: { email: null, phone: null },
        answers: [],
        language: language
      };

      const response = await feedbackService.createFeedback(feedbackData);

      if (response.success) {
        Modal.success(
          language === 'ar' 
            ? 'تم إرسال تقييمك بنجاح. نحن نقدر وقتك ومساهمتك القيّمة' 
            : 'Your feedback has been submitted successfully. We appreciate your time and valuable input',
          {
            title: language === 'ar' ? 'شكراً لك!' : 'Thank You!',
            confirmText: language === 'ar' ? 'تم' : 'OK',
            duration: 3000
          }
        );

        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Modal.error(
        language === 'ar'
          ? 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى'
          : 'There was an error submitting your feedback. Please try again',
        {
          title: language === 'ar' ? 'خطأ!' : 'Error!',
          confirmText: language === 'ar' ? 'موافق' : 'OK',
          autoClose: false
        }
      );
    }
  };

  const getRatingValue = (emojiType) => {
    const values = { dissatisfied: 3, neutral: 7, satisfied: 10 };
    return values[emojiType] || 5;
  };

  const getNPSScore = (emojiType) => {
    const scores = { dissatisfied: 0, neutral: 50, satisfied: 100 };
    return scores[emojiType] || 50;
  };

  const handleBack = () => {
    setSelectedEmoji(null);
    setQuestions([]);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      const feedbackData = {
        rating_type: selectedEmoji,
        rating_value: getRatingValue(selectedEmoji),
        nps_score: getNPSScore(selectedEmoji),
        department: 'Marketing',
        contact: {
          email: formData.email || null,
          phone: formData.phone || null
        },
        answers: formData.answers || [],
        language: language
      };

      const response = await feedbackService.createFeedback(feedbackData);

      if (response.success) {
        Modal.success(
          language === 'ar' 
            ? 'تم إرسال تقييمك بنجاح. نحن نقدر وقتك ومساهمتك القيّمة' 
            : 'Your feedback has been submitted successfully. We appreciate your time and valuable input',
          {
            title: language === 'ar' ? 'شكراً لك!' : 'Thank You!',
            confirmText: language === 'ar' ? 'تم' : 'OK',
            duration: 3000
          }
        );

        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Modal.error(
        language === 'ar'
          ? 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى'
          : 'There was an error submitting your feedback. Please try again',
        {
          title: language === 'ar' ? 'خطأ!' : 'Error!',
          confirmText: language === 'ar' ? 'موافق' : 'OK',
          autoClose: false
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {!selectedEmoji ? (
        <EmojiSelector 
          onSelect={handleEmojiSelect} 
          isLoading={loading}
        />
      ) : (
        <QuestionForm
          questions={questions}
          emojiType={selectedEmoji}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default Marketing;