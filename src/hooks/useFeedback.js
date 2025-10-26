import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import feedbackService from '@/services/feedbackService';
import toast from 'react-hot-toast';

export const useFeedback = (params = {}) => {
  const queryClient = useQueryClient();

  // Get feedbacks
  const {
    data: feedbacks,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['feedbacks', params],
    queryFn: () => feedbackService.getFeedbacks(params),
    keepPreviousData: true,
  });

  // Get single feedback
  const useFeedbackDetails = (id) => {
    return useQuery({
      queryKey: ['feedback', id],
      queryFn: () => feedbackService.getFeedback(id),
      enabled: !!id,
    });
  };

  // Create feedback
  const createMutation = useMutation({
    mutationFn: feedbackService.createFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks']);
      toast.success('Thank you for your feedback!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to submit feedback';
      toast.error(message);
    },
  });

  // Delete feedback
  const deleteMutation = useMutation({
    mutationFn: feedbackService.deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks']);
      toast.success('Feedback deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete feedback');
    },
  });

  // Restore feedback
  const restoreMutation = useMutation({
    mutationFn: feedbackService.restoreFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks']);
      toast.success('Feedback restored successfully');
    },
    onError: () => {
      toast.error('Failed to restore feedback');
    },
  });

  // Force delete feedback
  const forceDeleteMutation = useMutation({
    mutationFn: feedbackService.forceDeleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks']);
      toast.success('Feedback permanently deleted');
    },
    onError: () => {
      toast.error('Failed to delete feedback');
    },
  });

  // Get stats
  const useStats = (statsParams = {}) => {
    return useQuery({
      queryKey: ['feedback-stats', statsParams],
      queryFn: () => feedbackService.getStats(statsParams),
    });
  };

  return {
    feedbacks,
    isLoading,
    error,
    refetch,
    createFeedback: createMutation.mutate,
    deleteFeedback: deleteMutation.mutate,
    restoreFeedback: restoreMutation.mutate,
    forceDeleteFeedback: forceDeleteMutation.mutate,
    useFeedbackDetails,
    useStats,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};