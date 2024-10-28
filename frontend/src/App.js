import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import Dashboard from './components/DashBoard/dashboard';
import Profile from './components/profile/profile';
import Home from './components/Home/homepage';
import Users from './components/Admin/Users';
import ResetPassword from './components/ResetPassword';
import ClassSchedule from './components/classes/ClassSchedule';
import VideoLibrary from './components/videoLibrary/VideoLibrary';
import Subscriptions from './components/Subscriptions/Subscriptions';
import Sidebar from './components/sidebar';
import AddProduct from './AddProduct';
import ProgressChart from './components/ProgressChart/progress';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} user={user} isAdmin={isAdmin} onLogout={handleLogout} />
        <div className="content">
          {loading && <div className="loading">Loading...</div>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login onLogin={handleLogin} setLoading={setLoading} />} />
            <Route 
              path="/admin-login" 
              element={!isLoggedIn ? <AdminLogin onLogin={handleLogin} setLoading={setLoading} /> : <Navigate to="/admin/dashboard" />}
            />

            {/* User-specific routes */}
            <Route path="/dashboard" element={isLoggedIn && !isAdmin ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/class-schedule" element={isLoggedIn ? <ClassSchedule /> : <Navigate to="/" />} />
            <Route path="/video-library" element={isLoggedIn ? <VideoLibrary /> : <Navigate to="/" />} />
            <Route path="/Subscriptions" element={isLoggedIn ? <Subscriptions user={user} /> : <Navigate to="/" />} />
            <Route path="/reset-password" element={isLoggedIn ? <ResetPassword /> : <Navigate to="/" />} />

            {/* Admin-specific routes */}
            <Route path="/admin/dashboard" element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
            <Route path="/admin/users" element={isLoggedIn && isAdmin ? <Users /> : <Navigate to="/admin-login" />} />

            {/* Sidebar structure for the admin dashboard */}
            <Route path="/admin" element={isLoggedIn && isAdmin ? <Sidebar user={user} isAdmin={isAdmin} /> : <Navigate to="/" />}>
              <Route path="add-products" element={<AddProduct />} />
              <Route path="progress-chart" element={<ProgressChart />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
