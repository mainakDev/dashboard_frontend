# Data Analytics Dashboard - Frontend

A modern, fast, and responsive Single Page Application (SPA) built to ingest data files (CSV/Excel), automatically detect their schemas, and generate interactive visual reports. It features an enterprise-grade PDF export pipeline that connects to a headless Python backend for pixel-perfect document generation.

## ✨ Features

* **Lightning Fast:** Bootstrapped with Vite for instant server start and rapid Hot Module Replacement (HMR).
* **Smart File Uploads:** Drag-and-drop interface using `react-dropzone`. Uploaded files are sent to the backend for automatic schema detection and cleaning.
* **Seamless SPA Experience:** Uses `react-router-dom` to transition instantly between the File Upload view and the Dashboard view without page reloads.
* **Component-Driven Visualizations:** Modular chart widgets built with `recharts` (Bar Charts, Pie Charts, KPI Metric Cards, and Composed Line/Bar charts).
* **Enterprise PDF Export:** Bypasses standard front-end canvas limitations by requesting a high-resolution, natively rendered PDF from the Python backend.

## 🛠 Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Routing:** React Router v6
* **Charting:** Recharts
* **File Handling:** React Dropzone
* **Styling:** Standard CSS (with global CSS variables for brand theming)

## 📁 Project Structure
```text
src/
├── main.jsx                 # Application entry point & Router provider
├── App.jsx                  # Main layout and Route definitions
├── index.css                # Global styles, CSS reset, and brand CSS variables
├── App.css                  # Core layout styles
├── theme.js                 # Javascript theme constants for Recharts
├── views/
│   ├── UploadView.jsx       # Drag & drop interface and file manager
│   └── DashboardView.jsx    # The generated report and PDF export controls
└── components/
    ├── Header.jsx           # Reusable page header
    ├── Uploader.jsx         # Dropzone logic and backend API integration
    └── widgets/
        ├── Widgets.css              # Shared styles for all dashboard cards
        ├── MetricCards.jsx          # KPI number cards
        ├── BarChartWidget.jsx       # Standard bar charts
        ├── PieChartWidget.jsx       # Standard pie charts
        └── CoachPerformanceWidget.jsx # Composed chart (Bar + Line)