import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MetricCards from '../components/widgets/MetricCards';
import PieChartWidget from '../components/widgets/PieChartWidget';
import BarChartWidget from '../components/widgets/BarChartWidget';
import CoachPerformanceWidget from '../components/widgets/CoachPerformanceWidget';
import TopPerformers from '../components/widgets/TopPerformers';
import ReportHeader from '../components/ReportHeader';
import ReportFooter from '../components/ReportFooter';
import DominantPrograms from '../components/widgets/DominantPrograms';
import CompletedProjects from '../components/widgets/CompletedProjects';
import UpcomingInitiatives from '../components/widgets/UpcomingInitiatives';
import ConfluenceLink from '../components/widgets/ConfluenceLink';

export default function DashboardView() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  // --- NEW: Track hover state for the download button ---
  const [isHovered, setIsHovered] = useState(false);
  const [searchParams] = useSearchParams();
  const isPrintMode = searchParams.get('print') === 'true';

  useEffect(() => {
    const saved = localStorage.getItem('dashboardData');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('http://localhost:8000/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
      });
      if (!response.ok) throw new Error("Failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Analytics_Report.pdf';
      a.click();
    } catch (error) {
      alert("Error generating PDF. Is your Python server running?");
    }
    setIsDownloading(false);
  };

  if (Object.keys(data).length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center' }}><h2>No data found.</h2><button onClick={() => navigate('/')}>Go Back</button></div>;
  }

  return (
    <div className="app-container" style={{ padding: isPrintMode ? '0' : '40px' }}>
      <div className="app-content">
        {!isPrintMode && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid rgba(48, 44, 65, 0.1)', paddingBottom: '20px' }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#302C41', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>←</span> Back to File Upload
            </button>
            {/* --- UPDATED: Hover Events Added --- */}
            <button 
              onClick={handleDownloadPDF} 
              disabled={isDownloading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ 
                // Toggle background color based on hover state
                backgroundColor: isHovered && !isDownloading ? '#242035' : '#EB7100', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '6px', 
                fontWeight: 'bold', 
                border: 'none', 
                cursor: isDownloading ? 'not-allowed' : 'pointer', 
                opacity: isDownloading ? 0.7 : 1, 
                boxShadow: '0 4px 6px rgba(235, 113, 0, 0.2)',
                transition: 'background-color 0.2s ease' // Smooth transition effect
              }}
            >
              {isDownloading ? 'Generating PDF...' : 'Download High-Res PDF'}
            </button>
          </div>
        )}

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: isPrintMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)' }}>
          {/* Note: I removed the hardcoded header text that was sitting above <ReportHeader/> here to clean it up! */}
          <ReportHeader />
          {data.Coach_Performance && (<TopPerformers data={data.Coach_Performance} />)}
          <div className="dashboard-grid">
            {data.Coaching_Summary && <MetricCards data={data.Coaching_Summary} title="Coaching Key Metrics" />}
            {data.Coach_Performance && <CoachPerformanceWidget data={data.Coach_Performance} title="Coach Performance Overview" />}
            {data.Event_Team_Data && <PieChartWidget data={data.Event_Team_Data} dataKey="team_name" title="Event Team Distribution" />}
            {data.Tutoring_Team_Data && (<PieChartWidget data={data.Tutoring_Team_Data} dataKey="team_name" title="Tutoring Sessions by Team" />)}
            {data.Tutoring_Course_Data && (<BarChartWidget data={data.Tutoring_Course_Data} dataKey="course_code" title="Tutoring Events per Course" />)}
            {data.Student_Activity && (<BarChartWidget data={data.Student_Activity} dataKey="program_enrolled" title="Students per Program" />)}
            {data.Manual_Inputs?.completedProjects && (<CompletedProjects text={data.Manual_Inputs.completedProjects} />)}
          </div>
          {data.Tutoring_Course_Data && <DominantPrograms data={data.Tutoring_Course_Data} />}
          {data.Manual_Inputs?.upcomingInitiatives && (<UpcomingInitiatives text={data.Manual_Inputs.upcomingInitiatives} />)}
          <ConfluenceLink />
          <ReportFooter />
        </div>
      </div>
    </div>
  );
}