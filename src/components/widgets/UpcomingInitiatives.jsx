import React from 'react';
import { THEME } from '../../theme';

export default function UpcomingInitiatives({ text }) {
  if (!text || text.trim() === '') return null;
  
  const initiatives = text.split('\n').filter(i => i.trim() !== '');
  if (initiatives.length === 0) return null;

  return (
    <div style={{ backgroundColor: THEME.neutral900, padding: '50px 40px', borderRadius: '12px', marginBottom: '40px', color: 'white' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 40px 0', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        🚀 Upcoming Initiatives
      </h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {initiatives.map((initiative, index) => (
          <div key={index} style={{
            backgroundColor: THEME.orange,
            padding: '30px 24px',
            borderRadius: '8px',
            flex: '1 1 250px', // Allows cards to grow evenly and wrap on small screens
            maxWidth: '350px',
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            lineHeight: '1.5',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {initiative}
          </div>
        ))}
      </div>
    </div>
  );
}