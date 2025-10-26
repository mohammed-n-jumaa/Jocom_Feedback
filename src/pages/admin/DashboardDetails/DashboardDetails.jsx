import React, { useState } from 'react';
import styles from './DashboardDetails.module.css';
import DepartmentFilter from '@/components/dashboard/Filters/DepartmentFilter';
import DateRangeFilter from '@/components/dashboard/Filters/DateRangeFilter';
import Button from '@/components/common/Button/Button';
import RatingDistribution from '@/components/dashboard/Charts/RatingDistribution';
import DailyResponses from '@/components/dashboard/Charts/DailyResponses';
import SatisfactionTrend from '@/components/dashboard/Charts/SatisfactionTrend';
import { useFeedback } from '@/hooks/useFeedback';
import Loader from '@/components/common/Loader/Loader';
import { IoClose, IoFunnel } from 'react-icons/io5';

const DashboardDetails = () => {
  const [filters, setFilters] = useState({
    department: null,
    startDate: null,
    endDate: null,
  });

  const { useStats } = useFeedback();
  const { data: stats, isLoading } = useStats(filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      department: null,
      startDate: null,
      endDate: null,
    });
  };

  const statsData = stats?.data || {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Details</h1>
          <p className={styles.subtitle}>Detailed analytics with filters</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersHeader}>
          <div className={styles.filtersTitle}>
            <IoFunnel />
            <span>Filters</span>
          </div>
          <Button variant="ghost" size="small" onClick={handleClearFilters}>
            <IoClose />
            Clear Filters
          </Button>
        </div>

        <div className={styles.filtersGrid}>
          <DepartmentFilter
            value={filters.department}
            onChange={(value) => handleFilterChange('department', value)}
          />

          <DateRangeFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartDateChange={(value) => handleFilterChange('startDate', value)}
            onEndDateChange={(value) => handleFilterChange('endDate', value)}
          />
        </div>
      </div>

      {isLoading ? (
        <Loader text="Loading detailed stats..." />
      ) : (
        <>
          {/* 10-Level Rating Breakdown */}
          <div className={styles.ratingBreakdown}>
            <h2 className={styles.sectionTitle}>
              <span>⭐</span> 10-Level Rating Breakdown
            </h2>
            
            <div className={styles.breakdownGrid}>
              <div className={styles.breakdownCard}>
                <div className={styles.breakdownEmoji}>😊</div>
                <div className={styles.breakdownLabel}>Satisfied</div>
                <div className={styles.breakdownRating}>5/10</div>
                <div className={styles.breakdownLanguage}>English</div>
                <div className={styles.breakdownCount}>3</div>
                <div className={styles.breakdownBar}>
                  <div className={styles.breakdownFill} style={{ width: '11.1%', backgroundColor: '#22c55e' }}></div>
                </div>
                <div className={styles.breakdownPercentage}>11.1%</div>
              </div>

              <div className={styles.breakdownCard}>
                <div className={styles.breakdownEmoji}>😠</div>
                <div className={styles.breakdownLabel}>غير راضي جداً</div>
                <div className={styles.breakdownRating}>6/10</div>
                <div className={styles.breakdownLanguage}>Arabic</div>
                <div className={styles.breakdownCount}>1</div>
                <div className={styles.breakdownBar}>
                  <div className={styles.breakdownFill} style={{ width: '3.7%', backgroundColor: '#ef4444' }}></div>
                </div>
                <div className={styles.breakdownPercentage}>3.7%</div>
              </div>

              <div className={styles.breakdownCard}>
                <div className={styles.breakdownEmoji}>😐</div>
                <div className={styles.breakdownLabel}>محايد</div>
                <div className={styles.breakdownRating}>8/10</div>
                <div className={styles.breakdownLanguage}>Arabic</div>
                <div className={styles.breakdownCount}>4</div>
                <div className={styles.breakdownBar}>
                  <div className={styles.breakdownFill} style={{ width: '14.8%', backgroundColor: '#f59e0b' }}></div>
                </div>
                <div className={styles.breakdownPercentage}>14.8%</div>
              </div>
            </div>

            {/* Language Distribution */}
            <div className={styles.languageDistribution}>
              <h3 className={styles.subsectionTitle}>Language Distribution</h3>
              <div className={styles.languageStats}>
                <div className={styles.languageItem}>
                  <div className={styles.languageEmoji}>😊</div>
                  <div className={styles.languageLabel}>راضي</div>
                  <div className={styles.languageRating}>10/10</div>
                  <div className={styles.languageLang}>Arabic</div>
                  <div className={styles.languageCount}>19</div>
                  <div className={styles.languageBar}>
                    <div className={styles.languageFill} style={{ width: '70.4%', backgroundColor: '#22c55e' }}></div>
                  </div>
                  <div className={styles.languagePercentage}>70.4%</div>
                </div>

                <div className={styles.languageSummary}>
                  <span className={styles.summaryLabel}>Total:</span>
                  <span className={styles.summaryValue}>3</span>
                  <span className={styles.summaryDivider}>/</span>
                  <span className={styles.summaryLabel}>English (1-5):</span>
                  <span className={styles.summaryValue}>3 - 11.1%</span>
                  <span className={styles.summaryDivider}>/</span>
                  <span className={styles.summaryLabel}>Arabic (6-10):</span>
                  <span className={styles.summaryValue}>24 - 88.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Stats & NPS */}
          <div className={styles.systemStats}>
            <h2 className={styles.sectionTitle}>
              <span>🚀</span> System Stats & NPS Breakdown
            </h2>

            <div className={styles.systemGrid}>
              <div className={styles.systemCard}>
                <div className={styles.systemLabel}>10-LEVEL</div>
                <div className={styles.systemSubLabel}>RATING SYSTEM</div>
              </div>

              <div className={styles.systemCard}>
                <div className={styles.systemValue}>27</div>
                <div className={styles.systemSubLabel}>TOTAL RESPONSES</div>
              </div>

              <div className={styles.systemCard}>
                <div className={styles.systemValue}>9.1/10</div>
                <div className={styles.systemSubLabel}>AVG RATING</div>
              </div>

              <div className={styles.systemCard}>
                <div className={styles.systemValue}>63</div>
                <div className={styles.systemSubLabel}>NPS SCORE</div>
              </div>
            </div>

            {/* NPS Categories */}
            <div className={styles.npsCategories}>
              <h3 className={styles.subsectionTitle}>NPS Categories (10-Level System)</h3>
              
              <div className={styles.npsGrid}>
                <div className={styles.npsCard} style={{ borderColor: '#22c55e' }}>
                  <div className={styles.npsIcon} style={{ color: '#22c55e' }}>●</div>
                  <div className={styles.npsLabel}>PROMOTERS (5,10)</div>
                  <div className={styles.npsCount}>22</div>
                  <div className={styles.npsPercentage}>(81.5%)</div>
                </div>

                <div className={styles.npsCard} style={{ borderColor: '#f59e0b' }}>
                  <div className={styles.npsIcon} style={{ color: '#f59e0b' }}>●</div>
                  <div className={styles.npsLabel}>PASSIVES (4,9)</div>
                  <div className={styles.npsCount}>0</div>
                  <div className={styles.npsPercentage}>(0.0%)</div>
                </div>

                <div className={styles.npsCard} style={{ borderColor: '#ef4444' }}>
                  <div className={styles.npsIcon} style={{ color: '#ef4444' }}>●</div>
                  <div className={styles.npsLabel}>DETRACTORS (1-3,6-8)</div>
                  <div className={styles.npsCount}>5</div>
                  <div className={styles.npsPercentage}>(18.5%)</div>
                </div>
              </div>

              <div className={styles.npsNote}>
                <p>Rating Scale: English (1-5) • Arabic (6-10) • Total Scale: /10</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
              <RatingDistribution data={statsData.ratingDistribution} />
            </div>

            <div className={styles.chartCard}>
              <DailyResponses data={statsData.dailyResponses} />
            </div>

            <div className={styles.chartCardFull}>
              <SatisfactionTrend data={statsData.satisfactionTrend} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardDetails;