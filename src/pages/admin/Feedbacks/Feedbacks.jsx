import React, { useState } from 'react';
import styles from './Feedbacks.module.css';
import FeedbackFilters from '@/components/feedbacks/FeedbackFilters/FeedbackFilters';
import FeedbackTable from '@/components/feedbacks/FeedbackTable/FeedbackTable';
import FeedbackDetails from '@/components/feedbacks/FeedbackDetails/FeedbackDetails';
import Button from '@/components/common/Button/Button';
import Loader from '@/components/common/Loader/Loader';
import { useFeedback } from '@/hooks/useFeedback';
import { exportFeedbacksToExcel, exportDetailedFeedback } from '@/utils/exportToExcel';
import { IoDownload } from 'react-icons/io5';
import toast from 'react-hot-toast';

const Feedbacks = () => {
  const [filters, setFilters] = useState({
    search: '',
    rating: '',
    department: '',
    fromDate: '',
    toDate: '',
    page: 1,
    per_page: 10,
  });

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { 
    feedbacks, 
    isLoading, 
    deleteFeedback, 
    restoreFeedback,
    useFeedbackDetails 
  } = useFeedback(filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      rating: '',
      department: '',
      fromDate: '',
      toDate: '',
      page: 1,
      per_page: 10,
    });
  };

  const handleApplyFilters = () => {
    // Filters are already applied via state
    toast.success('Filters applied');
  };

  const handleViewFeedback = (id) => {
    const feedback = feedbacks?.data?.find(f => f.id === id);
    if (feedback) {
      setSelectedFeedback(feedback);
      setIsDetailsOpen(true);
    }
  };

  const handleExportSingle = (id) => {
    const feedback = feedbacks?.data?.find(f => f.id === id);
    if (feedback) {
      exportDetailedFeedback(feedback);
      toast.success('Feedback exported successfully');
    }
  };

  const handleExportAll = () => {
    if (feedbacks?.data && feedbacks.data.length > 0) {
      exportFeedbacksToExcel(feedbacks.data);
      toast.success('All feedbacks exported successfully');
    } else {
      toast.error('No feedbacks to export');
    }
  };

  const handleDeleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id);
    }
  };

  const handleRestoreFeedback = (id) => {
    restoreFeedback(id);
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handlePerPageChange = (perPage) => {
    setFilters(prev => ({ ...prev, per_page: perPage, page: 1 }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Feedback Responses</h1>
          <p className={styles.subtitle}>View and manage all feedback responses</p>
        </div>
        <Button icon={<IoDownload />} onClick={handleExportAll}>
          Export All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💬</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{feedbacks?.total || 68}</div>
            <div className={styles.statLabel}>Total Responses</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>0</div>
            <div className={styles.statLabel}>Selected</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📄</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>10</div>
            <div className={styles.statLabel}>This Page</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FeedbackFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onApply={handleApplyFilters}
      />

      {/* Table */}
      {isLoading ? (
        <Loader text="Loading feedbacks..." />
      ) : (
        <FeedbackTable
          feedbacks={feedbacks?.data || []}
          onView={handleViewFeedback}
          onDelete={handleDeleteFeedback}
          onRestore={handleRestoreFeedback}
          onExport={handleExportSingle}
          pagination={feedbacks?.meta}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}

      {/* Details Modal */}
      <FeedbackDetails
        feedback={selectedFeedback}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedFeedback(null);
        }}
      />
    </div>
  );
};

export default Feedbacks;