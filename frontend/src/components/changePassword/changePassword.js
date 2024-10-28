import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    // Validate current password with the backend (call API)
    if (newPassword === confirmPassword) {
      console.log('Password changed successfully');
      // Call API to save new password
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Current Password:</label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <br />
      <label>New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <label>Confirm New Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
