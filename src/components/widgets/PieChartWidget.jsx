import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { THEME, CHART_COLORS } from '../../theme';
import './Widgets.css';

export default function PieChartWidget({ data, dataKey, title }) {
  const chartData = useMemo(() => {
    const counts = {};
    data.forEach(item => { if (item[dataKey]) counts[item[dataKey]] = (counts[item[dataKey]] || 0) + 1; });
    return Object.keys(counts).map(name => ({ name, count: counts[name] }));
  }, [data, dataKey]);

  return (
    <div className="widget-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Legend wrapperStyle={{ color: THEME.neutral900 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}