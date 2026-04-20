import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Uploader.css';

export default function Uploader({ onUploadComplete, setLoading, addMessage }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch('http://localhost:8000/api/upload', { method: 'POST', body: formData });
        const result = await response.json();
        if (response.ok && result.status === 'success') {
          onUploadComplete(result.detected_tag, result.full_data);
          addMessage({ type: 'success', text: result.message });
        } else {
          addMessage({ type: 'error', text: result.detail || 'Upload failed' });
        }
      } catch (error) {
        addMessage({ type: 'error', text: `Network error on ${file.name}.` });
      }
    }
    setLoading(false);
  }, [onUploadComplete, setLoading, addMessage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className={`uploader-box ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <div className="uploader-icon">+</div>
      <h3>{isDragActive ? 'Drop files now...' : 'Upload your datasets'}</h3>
      <p>Drag and drop Excel or CSV files, or click to browse.</p>
    </div>
  );
}