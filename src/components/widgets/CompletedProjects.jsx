import React from 'react';
import { THEME } from '../../theme';
import './Widgets.css'; // <-- Import your standard widget styles!

export default function CompletedProjects({ text }) {
  if (!text || text.trim() === '') return null;
  
  // Split the textarea input by new lines and remove any blank lines
  const projects = text.split('\n').filter(p => p.trim() !== '');
  if (projects.length === 0) return null;

  return (
    // Apply the universal widget-card class here
    <div className="widget-card" style={{ marginBottom: '40px' }}>
      
      {/* Use <h3> to match the other chart titles perfectly */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, marginBottom: '20px' }}>
        ✅ Successfully Completed Projects
      </h3>
      
      <ul style={{ margin: 0, paddingLeft: '24px', color: THEME.neutral900, lineHeight: '1.8', fontSize: '16px' }}>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>{project}</li>
        ))}
      </ul>
    </div>
  );
}