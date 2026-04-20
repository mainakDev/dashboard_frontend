import React from 'react';

export default function TopPerformers({ data }) {
  if (!data || data.length === 0) return null;

  // 1. Sort the coaches by # of Actual Sessions (highest to lowest)
  const sortedCoaches = [...data].sort((a, b) => {
    const aSessions = parseFloat(a['# of Actual Sessions']) || 0;
    const bSessions = parseFloat(b['# of Actual Sessions']) || 0;
    return bSessions - aSessions;
  });

  // 2. Grab the top 3
  const topCoaches = sortedCoaches.slice(0, 3);

  if (topCoaches.length === 0) return null;

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      padding: '20px 24px',
      borderRadius: '8px',
      borderLeft: '4px solid #EB7100',
      marginBottom: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      color: '#302C41',
      fontSize: '16px',
      lineHeight: '1.6'
    }}>
      <strong>🏆 Performance Highlight:</strong> Leading the team this period are{' '}
      {topCoaches.map((coach, index) => (
        <span key={index}>
          <strong>{coach['Coach Name']}</strong> ({coach['# of Actual Sessions']} sessions)
          {/* Grammar logic: adds a comma, or ", and " for the last item */}
          {index === topCoaches.length - 2 ? ', and ' : index < topCoaches.length - 1 ? ', ' : '.'}
        </span>
      ))}
      {' '}Outstanding work driving our program's overall success!
    </div>
  );
}