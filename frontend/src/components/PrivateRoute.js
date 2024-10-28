// src/components/PrivateRoute.js
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
  const navigate = useNavigate();
  
  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    navigate('/login');
    return null; // Return null to prevent rendering the route
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;