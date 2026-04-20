import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { THEME, PIE_COLORS } from '../../theme'; // <-- Imported new colors
import './Widgets.css';

export default function PieChartWidget({ data, dataKey, title }) {
  const chartData = useMemo(() => {
    const counts = {};
    data.forEach(item => { 
      if (item[dataKey]) counts[item[dataKey]] = (counts[item[dataKey]] || 0) + 1; 
    });
    // Sort by count descending so the biggest slices are first
    return Object.keys(counts)
      .map(name => ({ name, count: counts[name] }))
      .sort((a, b) => b.count - a.count);
  }, [data, dataKey]);

  return (
    <div className="widget-card">
      <h3>{title}</h3>
      {/* Increased height slightly to give the legend room to stack */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart margin={{ top: 20, right: 0, bottom: 20, left: 0 }}>
          <Pie 
            data={chartData} 
            dataKey="count" 
            nameKey="name" 
            cx="35%" // Shifts the pie to the left
            cy="50%" 
            outerRadius={110} 
            innerRadius={60} // Optional: Turns it into a modern Donut Chart! Set to 0 if you want a solid pie.
            label={false} // Turns off the messy overlapping lines
            stroke="#FFFFFF" // Adds a clean white border between slices
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
          
          {/* Stack the legend vertically on the right side */}
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            iconType="circle" // Makes the legend icons neat little dots
            wrapperStyle={{ 
              color: THEME.neutral900, 
              fontSize: '13px',
              paddingLeft: '20px',
              maxWidth: '50%' // Prevents long names from pushing the pie off screen
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}