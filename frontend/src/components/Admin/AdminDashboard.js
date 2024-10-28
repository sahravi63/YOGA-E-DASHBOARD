import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Use navigate instead of history
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState('');

  // Function to refresh the token
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('adminRefreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post('http://localhost:5000/admin/refresh-token', { token: refreshToken });
      if (response.data.accessToken) {
        localStorage.setItem('adminAccessToken', response.data.accessToken);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
      return false;
    }
  }, []); // No dependencies for refreshToken

  // Function to verify token and fetch dashboard data
  const verifyTokenAndFetchData = useCallback(async () => {
    const token = localStorage.getItem('adminAccessToken');
    if (!token) {
      navigate('/admin/login'); // Use navigate for redirection
      return;
    }

    try {
      await axios.get('http://localhost:5000/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false); // Data fetched successfully
    } catch (err) {
      if (err.response.status === 403) { // Token expired or invalid
        const refreshed = await refreshToken();
        if (refreshed) {
          // Retry fetching data with the new token
          await verifyTokenAndFetchData();
        } else {
          navigate('/admin/login'); // Use navigate for redirection
        }
      } else {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    }
  }, [navigate, refreshToken]); // Include navigate and refreshToken as dependencies

  useEffect(() => {
    verifyTokenAndFetchData();
  }, [verifyTokenAndFetchData]); // Use verifyTokenAndFetchData as the dependency

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Render other admin-specific content here */}
    </div>
  );
};

export default AdminDashboard;
