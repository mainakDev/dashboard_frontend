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

  const handleManualInputChange = (field, value) => {
    setDashboardData(prev => ({
      ...prev,
      Manual_Inputs: {
        ...(prev.Manual_Inputs || {}),
        [field]: value
      }
    }));
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
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
            <h3 style={{ color: '#302C41', marginTop: 0, marginBottom: '8px' }}>📝 Executive Summary Notes</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Add bullet points to your report. Enter multiple items by typing each on a new line.</p>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#302C41' }}>
                Successfully Completed Projects
              </label>
              <textarea 
                value={dashboardData.Manual_Inputs?.completedProjects || ''}
                onChange={(e) => handleManualInputChange('completedProjects', e.target.value)}
                placeholder="Example:&#10;Launched new UX/UI curriculum&#10;Onboarded 50 new coaches"
                style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '8px', border: '1px solid #CCC', fontFamily: 'inherit', fontSize: '15px', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#302C41' }}>
                Upcoming Initiatives
              </label>
              <textarea 
                value={dashboardData.Manual_Inputs?.upcomingInitiatives || ''}
                onChange={(e) => handleManualInputChange('upcomingInitiatives', e.target.value)}
                placeholder="Example:&#10;Advanced full-stack capstone projects&#10;AI-integrated web development modules"
                style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '8px', border: '1px solid #CCC', fontFamily: 'inherit', fontSize: '15px', resize: 'vertical' }}
              />
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