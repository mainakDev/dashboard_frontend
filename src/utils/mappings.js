// A simple hash map of your raw codes to beautiful titles
export const COURSE_DICTIONARY = {
  "AI_PROMPT_ENGINEERING-501": "AI Prompt Engineering Certificate",
  "APPLYING_AI-501": "AI Fundamentals Certificate",
  "CYBERSECURITY-501": "Cybersecurity Certificate",
  "DATA_ANALYTICS-501": "Data Analytics Certificate",
  "DIGITAL_MARKETING-401": "Digital Marketing Certificate",
  "TECHNOLOGY_FUNDAMENTALS-501": "Technology Fundamentals Certificate",
  "UX-501": "UX/UI Design Certificate",
  "WEB_DEVELOPMENT-501": "Web Development Certificate",
  "AI_DATA_ANALYTICS-501": "Applying AI in Data Analytics Certificate",
  "DATA-401": "NEEDS CLARIFICATION",
  "FRONTLINE_LEADERSHIP-501": "NEEDS CLARIFICATION", 
  "AI_CYBERSECURITY-501": "NEEDS CLARIFICATION",
  "FRONT_END-501": "Frontend Web Development Certificate"
};

// A helper function that safely looks up the name.
// If a brand new course code appears that isn't in your dictionary yet, 
// it safely falls back to showing the raw code instead of crashing!
export const getCourseName = (rawCode) => {
  if (!rawCode) return "Unknown";
  return COURSE_DICTIONARY[rawCode] || rawCode;
};


