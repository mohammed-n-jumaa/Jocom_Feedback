import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import questionService from '@/services/questionService';
import toast from 'react-hot-toast';

export const useQuestions = (params = {}) => {
  const queryClient = useQueryClient();

  // Get all questions
  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['questions', params],
    queryFn: () => questionService.getQuestions(params),
  });

  // Get questions by department and emoji
  const useQuestionsByDepartment = (department, emoji, language = 'en') => {
    return useQuery({
      queryKey: ['questions', department, emoji, language],
      queryFn: () => questionService.getQuestionsByDepartmentEmoji(department, emoji, language),
      enabled: !!department && !!emoji,
    });
  };

  // Create question
  const createMutation = useMutation({
    mutationFn: questionService.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
      toast.success('Question created successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create question';
      toast.error(message);
    },
  });

  // Update question
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => questionService.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
      toast.success('Question updated successfully');
    },
    onError: () => {
      toast.error('Failed to update question');
    },
  });

  // Delete question
  const deleteMutation = useMutation({
    mutationFn: questionService.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
      toast.success('Question deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete question');
    },
  });

  return {
    questions,
    isLoading,
    error,
    refetch,
    createQuestion: createMutation.mutate,
    updateQuestion: updateMutation.mutate,
    deleteQuestion: deleteMutation.mutate,
    useQuestionsByDepartment,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};