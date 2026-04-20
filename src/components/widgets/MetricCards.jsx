import React from 'react';
import './Widgets.css';
export default function MetricCards({ data, title }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="widget-card full-width">
      <h3>{title}</h3>
      <div className="metric-grid">
        {data.map((row, idx) => (
          // Inside MetricCards.jsx return statement:
          <div key={idx} className="metric-item">
            {/* Displays "Paired Student %", "Show Rate %", etc. */}
            <h4>{row['Metric_Name']}</h4> 
            
            {/* Displays the actual number from the Curriculum Coaching column */}
            <p>{row['Curriculum Coaching'] || 'N/A'}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}