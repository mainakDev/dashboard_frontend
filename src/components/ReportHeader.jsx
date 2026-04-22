import React from 'react';

export default function ReportHeader() {
  return (
    <div style={{ backgroundColor: '#EB7100', textAlign: 'center', padding: '32px 24px', marginBottom: '32px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(235, 113, 0, 0.2)' }}>
      <p style={{ color: '#FFFFFF', margin: 0, fontSize: '15px', fontWeight: '500', opacity: 0.9 }}>
        Weekly Summary
      </p>
      <h1 style={{ color: '#FFFFFF', margin: '0 0 8px 0', fontSize: '28px' }}>
        ADO | Team Weekly Health and Project Overview
      </h1>
    </div>
  );
}