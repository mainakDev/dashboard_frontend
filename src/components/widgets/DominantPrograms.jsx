import React, { useMemo } from 'react';
import { THEME } from '../../theme';
import { getCourseName } from '../../utils/mappings';

// --- THE CSS ART GENERATOR ---
// Converts any course code string into a unique, beautiful CSS gradient banner
const generateCourseArt = (courseCode) => {
  // 1. Math hash: Convert string to a unique number
  let hash = 0;
  for (let i = 0; i < courseCode.length; i++) {
    hash = courseCode.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // 2. Pick two colors on the wheel based on the hash
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 50) % 360; // Offset by 50 degrees for a smooth complementary gradient

  return {
    background: `linear-gradient(135deg, hsl(${hue1}, 85%, 60%), hsl(${hue2}, 90%, 35%))`,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '140px',
    marginBottom: '24px',
    borderRadius: '8px'
  };
};

export default function DominantPrograms({ data }) {
  // 1. Automatically calculate the top 2 programs right from the raw data
  const topPrograms = useMemo(() => {
    if (!data) return [];
    
    const counts = {};
    data.forEach(row => {
      const code = row['course_code'];
      const uuid = row['event_instance_uuid'];
      
      // ONLY count it if BOTH the course_code and the event_instance_uuid exist and are not blank!
      if (
        code && String(code).trim() !== "" && 
        uuid && String(uuid).trim() !== "" && 
        String(uuid).toLowerCase() !== "nan" // Extra safety net for Python's empty values
      ) {
        counts[code] = (counts[code] || 0) + 1;
      }
    });

    return Object.keys(counts)
      .map(code => ({ code, count: counts[code] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 2); // Grab only the top 2 highest
  }, [data]);

  if (topPrograms.length === 0) return null;

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: THEME.neutral900, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        🔥 Dominant Programs This Month
      </h2>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        {topPrograms.map((program, index) => {
          const artStyle = generateCourseArt(program.code);
          const bgColor = index === 0 ? THEME.orange : THEME.neutral900;
          
          return (
            <div key={program.code} style={{ 
              flex: 1, 
              backgroundColor: bgColor, 
              borderRadius: '12px', 
              padding: '30px', 
              textAlign: 'center', 
              color: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              
              {/* --- DYNAMIC CSS BANNER --- */}
              <div style={artStyle}>
                {/* Geometric Abstract Shapes for Texture */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '10px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', transform: 'rotate(45deg)' }} />
                
                {/* The large stylized first letter of the course! */}
                <span style={{ fontSize: '64px', fontWeight: '900', color: 'rgba(255,255,255,0.8)', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                  {program.code.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* --- DYNAMIC TEXT --- */}
              <h2 style={{ margin: '0 0 12px 0', fontSize: '24px' }}>
                {getCourseName(program.code)} Program
              </h2>
              <p style={{ margin: 0, fontSize: '15px', opacity: 0.9 }}>
                {program.count} Total Sessions
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
}