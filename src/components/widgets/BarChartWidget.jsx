import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { THEME } from '../../theme';
import './Widgets.css';
import { getCourseName } from '../../utils/mappings';

export default function BarChartWidget({ data, dataKey, title }) {
  const chartData = useMemo(() => {
    const counts = {};
    data.forEach(item => { if (item[dataKey]) counts[item[dataKey]] = (counts[item[dataKey]] || 0) + 1; });
    return Object.keys(counts).map(name => ({ name, count: counts[name] }));
  }, [data, dataKey]);

  return (
    <div className="widget-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{ fill: 'var(--brand-subtext)', fontSize: 12 }} tickFormatter={getCourseName} />
          <YAxis tick={{ fill: 'var(--brand-subtext)', fontSize: 12 }} />
          <Tooltip cursor={{ fill: 'rgba(48, 44, 65, 0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} labelFormatter={getCourseName} />
          <Bar dataKey="count" fill={THEME.orange} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}