import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import StatsCard from '@/components/dashboard/StatsCard/StatsCard';
import RatingDistribution from '@/components/dashboard/Charts/RatingDistribution';
import DailyResponses from '@/components/dashboard/Charts/DailyResponses';
import SatisfactionTrend from '@/components/dashboard/Charts/SatisfactionTrend';
import Loader from '@/components/common/Loader/Loader';
import { useFeedback } from '@/hooks/useFeedback';
import { MdFeedback, MdStar, MdTrendingUp, MdPeople } from 'react-icons/md';

const Dashboard = () => {
  const navigate = useNavigate();
  const { useStats } = useFeedback();
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  const statsData = stats?.data || {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Analytics & Overview - 10-Level Rating System</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatsCard
          title="TOTAL FEEDBACKS"
          subtitle="This month"
          value={statsData.totalFeedbacks || 27}
          icon={<MdFeedback />}
          color="blue"
          trend="down"
          trendValue="34.1%"
          onClick={() => navigate('/admin/dashboard/details')}
        />
        
        <StatsCard
          title="AVERAGE RATING"
          subtitle="Mixed system"
          value={`${statsData.averageRating || '9.1'}/10`}
          icon={<MdStar />}
          color="orange"
          trend="down"
          trendValue="2.2%"
          onClick={() => navigate('/admin/dashboard/details')}
        />
        
        <StatsCard
          title="OVERALL NPS SCORE"
          subtitle="Net Promoter Score"
          value={statsData.npsScore || 63}
          icon={<MdTrendingUp />}
          color="green"
          trend="down"
          trendValue="11%"
          onClick={() => navigate('/admin/dashboard/details')}
        />
        
        <StatsCard
          title="RESPONSE RATE"
          subtitle="completion rate"
          value={`${statsData.responseRate || '2.7'}%`}
          icon={<MdPeople />}
          color="purple"
          trend="down"
          trendValue="34.1%"
          onClick={() => navigate('/admin/dashboard/details')}
        />
      </div>

      {/* Charts Grid */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <RatingDistribution 
            data={{
              satisfied: statsData.ratingDistribution?.satisfied || 70,
              neutral: statsData.ratingDistribution?.neutral || 15,
              dissatisfied: statsData.ratingDistribution?.dissatisfied || 15,
            }}
          />
        </div>

        <div className={styles.chartCard}>
          <DailyResponses data={statsData.dailyResponses || []} />
        </div>

        <div className={styles.chartCardFull}>
          <SatisfactionTrend data={statsData.satisfactionTrend || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;