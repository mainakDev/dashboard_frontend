import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { THEME } from '../../theme';
import './Widgets.css';

export default function CoachPerformanceWidget({ data, title }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="widget-card full-width">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={450}>
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 80, left: 0 }}>
          
          {/* X-Axis for Coach Names (Angled so they don't overlap) */}
          <XAxis 
            dataKey="Coach Name" 
            angle={-45} 
            textAnchor="end" 
            height={100} 
            tick={{ fill: THEME.neutral900, fontSize: 12 }} 
          />
          
          {/* Left Y-Axis for Raw Session Numbers */}
          <YAxis 
            yAxisId="left" 
            tick={{ fill: THEME.neutral900 }} 
          />
          
          {/* Right Y-Axis for LCE Usage Percentage */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tick={{ fill: THEME.neutral900 }} 
            tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} 
          />
          
          <Tooltip 
            cursor={{ fill: 'rgba(48, 44, 65, 0.05)' }} 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            formatter={(value, name) => {
              if (name === 'Total LCE Usage') return [`${(value * 100).toFixed(1)}%`, name];
              return [value, name];
            }}
          />
          
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          {/* The Data Visuals */}
          <Bar yAxisId="left" dataKey="# of Expected Sessions" fill="#5D5875" name="Expected Sessions" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="# of Actual Sessions" fill={THEME.orange} name="Actual Sessions" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="Total LCE Usage" stroke="#9B86F7" strokeWidth={3} name="Total LCE Usage" dot={{ r: 4 }} />
        
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}