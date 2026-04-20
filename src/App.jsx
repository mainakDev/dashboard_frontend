import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadView from './views/UploadView';
import DashboardView from './views/DashboardView';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadView />} />
      <Route path="/dashboard" element={<DashboardView />} />
    </Routes>
  );
}