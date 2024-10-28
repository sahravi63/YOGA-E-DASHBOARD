import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing global styles
import App from './App'; // Main application component
import { UserProvider } from './context/UserContext'; // Import UserProvider
import reportWebVitals from './reportWebVitals'; // For performance metrics

// Creating a root for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside React.StrictMode for development checks
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

// Optional: Measure performance in your app and log results
reportWebVitals();
