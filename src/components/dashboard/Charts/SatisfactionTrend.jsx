import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './Charts.module.css';
import { format } from 'date-fns';

const SatisfactionTrend = ({ data = [] }) => {
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    satisfied: item.satisfied || 0,
    dissatisfied: item.dissatisfied || 0,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{payload[0].payload.date}</p>
          {payload.map((entry, index) => (
            <p key={index} className={styles.tooltipValue} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Satisfaction Trend</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'var(--light-text-secondary)' }}
            stroke="var(--light-text-secondary)"
          />
          <YAxis 
            tick={{ fill: 'var(--light-text-secondary)' }}
            stroke="var(--light-text-secondary)"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="satisfied" 
            stroke="#22c55e" 
            strokeWidth={3}
            name="Satisfied"
            dot={{ fill: '#22c55e', r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="dissatisfied" 
            stroke="#ef4444" 
            strokeWidth={3}
            strokeDasharray="5 5"
            name="Dissatisfied"
            dot={{ fill: '#ef4444', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SatisfactionTrend;