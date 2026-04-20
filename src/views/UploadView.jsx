import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Uploader from '../components/Uploader';

export default function UploadView() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(() => {
    const saved = localStorage.getItem('dashboardData');
    return saved ? JSON.parse(saved) : {};
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
  }, [dashboardData]);

  const handleUploadComplete = (tag, data) => setDashboardData(prev => ({ ...prev, [tag]: data }));
  const handleRemoveFile = (tagToRemove) => {
    setDashboardData(prev => {
      const newData = { ...prev };
      delete newData[tagToRemove];
      return newData;
    });
    setMessages([{ type: 'success', text: `Removed ${tagToRemove.replace(/_/g, ' ')}` }]);
  };
  const handleAddMessage = (msg) => {
    setMessages([msg]);
    setTimeout(() => setMessages([]), 5000);
  };

  const hasData = Object.keys(dashboardData).length > 0;

  return (
    <div className="app-container">
      <div className="app-content">
        <Header />
        <div style={{ marginBottom: '40px' }}>
          <Uploader onUploadComplete={handleUploadComplete} setLoading={setLoading} addMessage={handleAddMessage} />
          {loading && <p className="loading-text">Processing data...</p>}
          {messages.map((msg, idx) => <p key={idx} className={`message ${msg.type}`}>{msg.text}</p>)}
        </div>

        {hasData && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
            <h3 style={{ color: '#302C41', marginTop: 0 }}>Ready to Generate</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.keys(dashboardData).map(tag => (
                <div key={tag} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#F4F5F7', borderRadius: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#302C41' }}>📄 {tag.replace(/_/g, ' ')}</span>
                  <button onClick={() => handleRemoveFile(tag)} style={{ backgroundColor: '#FFEBEE', color: '#D32F2F', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasData && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#EB7100', color: 'white', padding: '16px 40px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(235, 113, 0, 0.3)' }}>
              Generate Dashboard 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}