import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import styles from './Charts.module.css';

const RatingDistribution = ({ data }) => {
  const COLORS = {
    satisfied: '#22c55e',
    neutral: '#f59e0b',
    dissatisfied: '#ef4444',
  };

  const chartData = [
    { name: 'Satisfied', value: data?.satisfied || 0, color: COLORS.satisfied },
    { name: 'Neutral', value: data?.neutral || 0, color: COLORS.neutral },
    { name: 'Dissatisfied', value: data?.dissatisfied || 0, color: COLORS.dissatisfied },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{payload[0].name}</p>
          <p className={styles.tooltipValue}>
            {payload[0].value} ({Math.round(payload[0].percent * 100)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Rating Distribution (10-Level System)</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className={styles.legendCustom}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ backgroundColor: COLORS.satisfied }}></span>
          <span className={styles.legendLabel}>Satisfied</span>
          <span className={styles.legendValue}>5/10 - English</span>
          <span className={styles.legendCount}>{chartData[0].value}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ backgroundColor: COLORS.neutral }}></span>
          <span className={styles.legendLabel}>محايد</span>
          <span className={styles.legendValue}>8/10 - Arabic</span>
          <span className={styles.legendCount}>{chartData[1].value}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ backgroundColor: COLORS.dissatisfied }}></span>
          <span className={styles.legendLabel}>غير راضي</span>
          <span className={styles.legendValue}>6/10 - Arabic</span>
          <span className={styles.legendCount}>{chartData[2].value}</span>
        </div>
      </div>
    </div>
  );
};

export default RatingDistribution;