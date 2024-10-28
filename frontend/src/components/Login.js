import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateInput = () => {
        if (!email || !password) {
            setError('Email and password are required.');
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateInput()) return;
      
        setLoading(true);
        setError('');
      
        try {
          const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          const result = await response.json();
          if (!response.ok) {
            setError(result.error || 'Login failed. Please try again.');
            return;
          }
      
          // Save token and admin status in localStorage
          localStorage.setItem('token', result.token); 
          localStorage.setItem('isAdmin', result.isAdmin); // Store admin status
      
          onLogin(result);  // Pass the result up to the parent component
          navigate('/recorded-videos');
        } catch (error) {
          setError('Authentication failed due to a network error. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
    
    
    
    

    return (
        <div className='login'>
            <h1>Login</h1>
            <input
                className='inputBox'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
                required
                aria-label="Email address"
            />
            <div className="passwordWrapper">
                <input
                    className='inputBox'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    required
                    aria-label="Password"
                />
                <button type="button" onClick={togglePasswordVisibility} className="toggleButton" aria-label="Toggle password visibility">
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin} className='appButton' type='button' disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p>
    <Link to="/reset-password" className="forgot-password-link">Forgot Password?</Link>
</p>

        </div>
    );
};

export default Login;
