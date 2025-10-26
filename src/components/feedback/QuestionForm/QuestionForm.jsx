import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './QuestionForm.module.css';
import Button from '@/components/common/Button/Button';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import SingleChoice from '../QuestionTypes/SingleChoice';
import MultipleChoice from '../QuestionTypes/MultipleChoice';
import ShortText from '../QuestionTypes/ShortText';
import LongText from '../QuestionTypes/LongText';
import RangeSlider from '../QuestionTypes/RangeSlider';
import EmailInput from '../QuestionTypes/EmailInput';
import PhoneInput from '../QuestionTypes/PhoneInput';
import { QUESTION_TYPES } from '@/utils/constants';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import useThemeStore from '@/store/themeStore';

const QuestionForm = ({ questions, onSubmit, onBack }) => {
  const { language } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [showContact, setShowContact] = useState(false);
  const [errors, setErrors] = useState({});

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const totalSteps = questions.length + 1; // +1 for contact info

  useEffect(() => {
    // Scroll to top on question change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
    // Clear error for this question
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[questionId];
      return newErrors;
    });
  };

  const validateCurrentQuestion = () => {
    if (showContact) {
      // Validate contact info (optional fields)
      return true;
    }

    if (!currentQuestion.is_required) {
      return true;
    }

    const answer = answers[currentQuestion.id];
    
    if (!answer || (Array.isArray(answer) && answer.length === 0) || answer === '') {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.id]: language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required',
      }));
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    if (isLastQuestion) {
      setShowContact(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (showContact) {
      setShowContact(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Prepare submission data
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      question_id: parseInt(questionId),
      answer,
    }));

    onSubmit({
      answers: formattedAnswers,
      contact: contactInfo,
    });
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionText = currentQuestion.question_text[language] || currentQuestion.question_text.en;
    const error = errors[currentQuestion.id];
    const answer = answers[currentQuestion.id];

    const commonProps = {
      value: answer,
      onChange: (value) => handleAnswerChange(currentQuestion.id, value),
      error,
    };

    switch (currentQuestion.question_type) {
      case QUESTION_TYPES.SINGLE_CHOICE:
        return (
          <SingleChoice
            {...commonProps}
            options={currentQuestion.options.map(opt => opt[language] || opt.en)}
          />
        );
      
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            {...commonProps}
            options={currentQuestion.options.map(opt => opt[language] || opt.en)}
          />
        );
      
      case QUESTION_TYPES.SHORT_TEXT:
        return <ShortText {...commonProps} />;
      
      case QUESTION_TYPES.LONG_TEXT:
        return <LongText {...commonProps} />;
      
      case QUESTION_TYPES.RANGE_SLIDER:
        return (
          <RangeSlider
            {...commonProps}
            min={currentQuestion.range_config.min}
            max={currentQuestion.range_config.max}
            step={currentQuestion.range_config.step}
          />
        );
      
      case QUESTION_TYPES.EMAIL:
        return <EmailInput {...commonProps} />;
      
      case QUESTION_TYPES.PHONE:
        return <PhoneInput {...commonProps} />;
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            {language === 'ar' ? <IoArrowForward /> : <IoArrowBack />}
            {language === 'ar' ? 'رجوع' : 'Back'}
          </button>
          
          <ProgressBar
            current={showContact ? totalSteps : currentIndex + 1}
            total={totalSteps}
            showLabel={true}
          />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!showContact ? (
            <motion.div
              key={currentIndex}
              className={styles.questionContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>
                  {language === 'ar' ? `سؤال ${currentIndex + 1}` : `Question ${currentIndex + 1}`}
                </span>
                {currentQuestion?.is_required && (
                  <span className={styles.required}>
                    {language === 'ar' ? 'مطلوب' : 'Required'}
                  </span>
                )}
              </div>

              <h2 className={styles.questionText}>
                {currentQuestion?.question_text[language] || currentQuestion?.question_text.en}
              </h2>

              <div className={styles.answerSection}>
                {renderQuestion()}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              className={styles.contactContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.contactHeader}>
                <h2 className={styles.contactTitle}>
                  {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                </h2>
                <p className={styles.contactSubtitle}>
                  {language === 'ar' 
                    ? 'يرجى تقديم تفاصيل الاتصال الخاصة بك للمتابعة' 
                    : 'Please provide your contact details for follow-up'}
                </p>
              </div>

              <div className={styles.contactFields}>
                <EmailInput
                  value={contactInfo.email}
                  onChange={(value) => setContactInfo(prev => ({ ...prev, email: value }))}
                  label={language === 'ar' ? 'عنوان البريد الإلكتروني' : 'Email Address'}
                />
                
                <PhoneInput
                  value={contactInfo.phone}
                  onChange={(value) => setContactInfo(prev => ({ ...prev, phone: value }))}
                  label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                />
              </div>

              <div className={styles.privacyNote}>
                <p>
                  {language === 'ar' 
                    ? '🔒 معلوماتك آمنة معنا وسيتم استخدامها فقط لأغراض المتابعة' 
                    : '🔒 Your information is safe with us and will only be used for follow-up purposes'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className={styles.navigation}>
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0 && !showContact}
          >
            {language === 'ar' ? 'السابق' : 'Previous'}
          </Button>

          {!showContact ? (
            <Button onClick={handleNext}>
              {isLastQuestion 
                ? (language === 'ar' ? 'التالي' : 'Next')
                : (language === 'ar' ? 'التالي' : 'Next')
              }
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              {language === 'ar' ? 'إرسال' : 'Submit'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;