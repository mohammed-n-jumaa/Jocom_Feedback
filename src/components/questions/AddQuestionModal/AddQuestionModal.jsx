import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@/components/common/Modal/Modal';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import styles from './AddQuestionModal.module.css';
import { questionSchema } from '@/utils/validators';
import { QUESTION_TYPES, QUESTION_TYPE_LABELS, DEPARTMENTS, EMOJIS } from '@/utils/constants';
import { IoAdd, IoClose } from 'react-icons/io5';

const AddQuestionModal = ({ isOpen, onClose, onSubmit, editQuestion = null }) => {
  const [options, setOptions] = useState(editQuestion?.options || [{ en: '', ar: '' }]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: editQuestion || {
      question_text: { en: '', ar: '' },
      question_type: QUESTION_TYPES.SINGLE_CHOICE,
      departments: [],
      emojis: [],
      is_required: false,
      order: 1,
      options: [],
      range_config: { min: 0, max: 10, step: 1 },
    },
  });

  const questionType = watch('question_type');
  const needsOptions = [QUESTION_TYPES.SINGLE_CHOICE, QUESTION_TYPES.MULTIPLE_CHOICE].includes(questionType);
  const needsRange = questionType === QUESTION_TYPES.RANGE_SLIDER;

  const handleAddOption = () => {
    setOptions([...options, { en: '', ar: '' }]);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, lang, value) => {
    const newOptions = [...options];
    newOptions[index][lang] = value;
    setOptions(newOptions);
  };

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      options: needsOptions ? options : null,
      range_config: needsRange ? data.range_config : null,
    };
    onSubmit(formattedData);
    reset();
    setOptions([{ en: '', ar: '' }]);
  };

  const handleClose = () => {
    reset();
    setOptions([{ en: '', ar: '' }]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editQuestion ? 'Edit Question' : 'Add New Question'}
      size="large"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
        {/* Question Type */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Question Type *</label>
          <select
            {...register('question_type')}
            className={styles.select}
          >
            {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.question_type && (
            <span className={styles.error}>{errors.question_type.message}</span>
          )}
        </div>

        {/* Question Text - English */}
        <Input
          {...register('question_text.en')}
          label="Question Text (English) *"
          error={errors.question_text?.en?.message}
          placeholder="Enter your question in English"
          fullWidth
        />

        {/* Question Text - Arabic */}
        <Input
          {...register('question_text.ar')}
          label="Question Text (Arabic) *"
          error={errors.question_text?.ar?.message}
          placeholder="أدخل سؤالك بالعربية"
          fullWidth
        />

        {/* Departments */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Departments *</label>
          <div className={styles.checkboxGroup}>
            {Object.values(DEPARTMENTS).map(dept => (
              <label key={dept} className={styles.checkbox}>
                <input
                  type="checkbox"
                  {...register('departments')}
                  value={dept}
                />
                <span>{dept}</span>
              </label>
            ))}
          </div>
          {errors.departments && (
            <span className={styles.error}>{errors.departments.message}</span>
          )}
        </div>

        {/* Emojis */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Rating Levels (Emojis) *</label>
          <div className={styles.checkboxGroup}>
            {Object.values(EMOJIS).map(emoji => (
              <label key={emoji} className={styles.checkbox}>
                <input
                  type="checkbox"
                  {...register('emojis')}
                  value={emoji}
                />
                <span>{emoji}</span>
              </label>
            ))}
          </div>
          {errors.emojis && (
            <span className={styles.error}>{errors.emojis.message}</span>
          )}
        </div>

        {/* Options - for Single/Multiple Choice */}
        {needsOptions && (
          <div className={styles.formGroup}>
            <div className={styles.optionsHeader}>
              <label className={styles.label}>Options *</label>
              <Button
                type="button"
                variant="outline"
                size="small"
                icon={<IoAdd />}
                onClick={handleAddOption}
              >
                Add Option
              </Button>
            </div>
            
            {options.map((option, index) => (
              <div key={index} className={styles.optionRow}>
                <Input
                  value={option.en}
                  onChange={(e) => handleOptionChange(index, 'en', e.target.value)}
                  placeholder="Option in English"
                />
                <Input
                  value={option.ar}
                  onChange={(e) => handleOptionChange(index, 'ar', e.target.value)}
                  placeholder="الخيار بالعربية"
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => handleRemoveOption(index)}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Range Config - for Range Slider */}
        {needsRange && (
          <div className={styles.rangeConfig}>
            <Input
              {...register('range_config.min')}
              type="number"
              label="Minimum Value"
              error={errors.range_config?.min?.message}
            />
            <Input
              {...register('range_config.max')}
              type="number"
              label="Maximum Value"
              error={errors.range_config?.max?.message}
            />
            <Input
              {...register('range_config.step')}
              type="number"
              label="Step"
              error={errors.range_config?.step?.message}
            />
          </div>
        )}

        {/* Required & Order */}
        <div className={styles.row}>
          <label className={styles.checkbox}>
            <input type="checkbox" {...register('is_required')} />
            <span>Required Question</span>
          </label>

          <Input
            {...register('order')}
            type="number"
            label="Order"
            error={errors.order?.message}
            placeholder="1"
          />
        </div>

        {/* Submit Buttons */}
        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {editQuestion ? 'Update Question' : 'Add Question'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddQuestionModal;