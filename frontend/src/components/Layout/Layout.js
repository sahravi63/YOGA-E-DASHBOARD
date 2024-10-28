import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';

const Layout = ({ isLoggedIn, user, onLogout }) => {
  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
      <div className="content">
        <Outlet /> {/* This renders the nested routes */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
