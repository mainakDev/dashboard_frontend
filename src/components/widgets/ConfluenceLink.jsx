import React from 'react';
import { THEME } from '../../theme';

export default function ConfluenceLink() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '32px', 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      border: `1px dashed ${THEME.border}`, 
      marginBottom: '32px' 
    }}>
      <h2 style={{ color: THEME.neutral900, marginTop: 0, marginBottom: '24px', fontSize: '22px' }}>
        For detailed analytics and full weekly metrics
      </h2>
      
      <button 
        onClick={() => window.open('YOUR_CONFLUENCE_LINK_HERE', '_blank')}
        style={{ 
          backgroundColor: THEME.orange, 
          color: 'white', 
          padding: '14px 32px', 
          borderRadius: '8px', 
          border: 'none', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(235, 113, 0, 0.2)',
          marginBottom: '24px',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        View Full Confluence Report
      </button>
      
      <p style={{ color: THEME.subtext, margin: '0 0 8px 0', fontSize: '15px' }}>
        Questions or feedback? Contact the Learning Experience Team
      </p>
      <h5 style={{ color: THEME.orange, margin: 0, fontSize: '16px' }}>
        amanaf@chegg.com
      </h5>
    </div>
  );
}