// src/components/ResetPassword.js
import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Password reset instructions sent to your email.');
      } else {
        setMessage(result.error || 'Failed to send reset instructions.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Failed to send reset instructions.');
    }
  };

  return (
    <div className='reset-password'>
      <h1>Reset Password</h1>
      <input 
        className='inputBox' 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
      />
      <button onClick={handleReset} className='appButton' type='button'>
        Send Reset Instructions
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
