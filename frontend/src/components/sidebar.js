import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isAdmin, isLoggedIn }) => {
  // Sidebar will only render if the user is logged in
  if (!isLoggedIn) {
    return null; // If not logged in, do not display the sidebar
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/Subscriptions">My Subscription</Link></li>
        <li><Link to="/MeditationTutorial">MeditationTutorial</Link></li>
        <li><Link to="/ResetPassword">RequestPasswordReset</Link></li>
        
        <li><Link to="/ChangePassword">ChangePassword</Link></li>
        
        
        {isAdmin && (
          <>
            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/upload-video">Upload Video</Link></li>
            <li><Link to="/admin/AddProduct">AddProduct</Link></li>
            <li><Link to="/admin/ProgressChart">ProgressChart</Link></li>
          </>
        )}
        <li><Link to="/contact-us">Contact Us</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
