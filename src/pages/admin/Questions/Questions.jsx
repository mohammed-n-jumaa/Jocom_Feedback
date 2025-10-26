import React, { useState } from 'react';
import styles from './Questions.module.css';
import QuestionManager from '@/components/questions/QuestionManager/QuestionManager';
import AddQuestionModal from '@/components/questions/AddQuestionModal/AddQuestionModal';
import Loader from '@/components/common/Loader/Loader';
import { useQuestions } from '@/hooks/useQuestions';
import toast from 'react-hot-toast';

const Questions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const { questions, isLoading, createQuestion, updateQuestion, deleteQuestion } = useQuestions();

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(id);
    }
  };

  const handleSubmitQuestion = async (data) => {
    if (editingQuestion) {
      updateQuestion({ id: editingQuestion.id, data });
    } else {
      createQuestion(data);
    }
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  if (isLoading) {
    return <Loader fullScreen text="Loading questions..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Questions Manager</h1>
          <p className={styles.subtitle}>Customize feedback questions for each rating</p>
        </div>
      </div>

      <QuestionManager
        questions={questions?.data || []}
        onAdd={handleAddQuestion}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
      />

      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuestion(null);
        }}
        onSubmit={handleSubmitQuestion}
        editQuestion={editingQuestion}
      />
    </div>
  );
};

export default Questions;