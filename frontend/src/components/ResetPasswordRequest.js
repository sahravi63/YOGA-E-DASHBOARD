import React, { useState } from 'react';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/request-password-reset', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      setMessage(result.message || 'Password reset email sent');
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('Failed to send password reset email');
    }
  };

  return (
    <div>
      <h2>Request Password Reset</h2>
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Request Password Reset</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestPasswordReset;
