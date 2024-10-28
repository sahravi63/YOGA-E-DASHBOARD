import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar'; // Import Sidebar component

const Nav = ({ isLoggedIn, user, isAdmin, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState('default-avatar.png');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    if (isLoggedIn) {
      const fetchProfilePicture = async () => {
        try {
          const response = await axios.get('/api/profile'); // Adjust endpoint as needed
          setProfilePic(response.data.profilePicture || 'default-avatar.png');
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      };
      fetchProfilePicture();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsSidebarOpen(false); // Close the sidebar on route change
  }, [location]); // Trigger when the location changes

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleProfileUpdate = () => {
    navigate('/profile');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      <div className="dummy-header"></div>

      <header>
        <ul className="nav-ul">
          {/* Show Home link when not logged in */}
          {!isLoggedIn && <li><Link to="/">Home</Link></li>}

          {/* Sidebar toggle button */}
          {isLoggedIn && (
            <li>
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
              </button>
            </li>
          )}

          {/* Dashboard link with margin */}
          {isLoggedIn && (
            <li style={{ marginLeft: '10px' }}>
              {isAdmin ? (
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              ) : (
                <Link to="/dashboard">Dashboard</Link>
              )}
            </li>
          )}

          {/* Links for logged-in users */}
          {isLoggedIn && !isAdmin && (
            <>
              <li><Link to="/subscriptions">My Subscription</Link></li>
              <li><Link to="/live-classes">Live Classes</Link></li>
              <li><Link to="/video-library">Video Library</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </>
          )}

          {/* Links for visitors */}
          {!isLoggedIn && (
            <>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}

          {/* Profile dropdown for logged-in users */}
          {isLoggedIn && (
            <li className="profile-dropdown">
              <div onClick={() => setShowDropdown(!showDropdown)} className="profile-icon">
                <img src={profilePic} alt="Profile" className="profile-pic" />
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <p>{user?.name}</p>
                  <button onClick={handleProfileUpdate}>Update Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </header>

      {/* Render the Sidebar component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isAdmin={isAdmin} 
        isLoggedIn={isLoggedIn} 
      />
    </>
  );
};

export default Nav;
