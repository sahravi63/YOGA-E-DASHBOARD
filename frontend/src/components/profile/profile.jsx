import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const ProfileComponent = ({ onLogout }) => {
  const [profilePic, setProfilePic] = useState('default-avatar.png'); // Default picture
  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '' });
  const [preferences, setPreferences] = useState({ meditationLevel: '', preferredLanguage: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('You need to log in to access this page.');
        navigate('/login'); // Redirect to login page
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback to localhost:5000
        const response = await axios.get(`${apiUrl}/api/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const { name, profilePicture, phone, address, preferences } = response.data;
        setUserName(name || '');
        setProfilePic(profilePicture || 'default-avatar.png');
        setPhone(phone || '');
        setAddress(address || { street: '', city: '', state: '', zipCode: '' });
        setPreferences(preferences || { meditationLevel: '', preferredLanguage: '' });
      } catch (error) {
        console.error('Error fetching user data:', error.response || error.message);
        setErrorMessage('Error fetching user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePic(URL.createObjectURL(selectedFile)); // Preview the selected file
    }
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  const handlePreferencesChange = (event) => {
    const { name, value } = event.target;
    setPreferences(prevPreferences => ({ ...prevPreferences, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (userName.trim().length < 3) {
      setErrorMessage('Username must be at least 3 characters long.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', userName);
    formData.append('phone', phone);
    if (file) {
      formData.append('profilePicture', file);
    }

    // Send address fields individually
    formData.append('address.street', address.street);
    formData.append('address.city', address.city);
    formData.append('address.state', address.state);
    formData.append('address.zipCode', address.zipCode);

    // Send preferences fields individually
    formData.append('preferences.meditationLevel', preferences.meditationLevel);
    formData.append('preferences.preferredLanguage', preferences.preferredLanguage);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback to localhost:5000
      const response = await axios.put(`${apiUrl}/api/profile`, formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2 className="profile-title">Profile</h2>

      {loading && <p>Loading...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="profile-content">
        <div className="profile-picture-section">
          <img
            src={profilePic}
            alt="User's Profile"
            className="profile-picture"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            aria-label="Upload profile picture"
          />
        </div>
        <div className="profile-details-section">
          <label className="profile-label">
            <strong>User Name:</strong>
          </label>
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className="profile-input"
            required
          />
          <label className="profile-label">
            <strong>Phone:</strong>
          </label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className="profile-input"
          />
          <label className="profile-label">
            <strong>Address:</strong>
          </label>
          <input
            type="text"
            name="street"
            value={address.street}
            placeholder="Street"
            onChange={handleAddressChange}
            className="profile-input"
          />
          <input
            type="text"
            name="city"
            value={address.city}
            placeholder="City"
            onChange={handleAddressChange}
            className="profile-input"
          />
          <input
            type="text"
            name="state"
            value={address.state}
            placeholder="State"
            onChange={handleAddressChange}
            className="profile-input"
          />
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            placeholder="Zip Code"
            onChange={handleAddressChange}
            className="profile-input"
          />
          <label className="profile-label">
            <strong>Preferences:</strong>
          </label>
          <input
            type="text"
            name="meditationLevel"
            value={preferences.meditationLevel}
            placeholder="Meditation Level"
            onChange={handlePreferencesChange}
            className="profile-input"
          />
          <input
            type="text"
            name="preferredLanguage"
            value={preferences.preferredLanguage}
            placeholder="Preferred Language"
            onChange={handlePreferencesChange}
            className="profile-input"
          />
          <button type="submit" className="submit-button">Update Profile</button>
        </div>
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
    </form>
  );
};

export default ProfileComponent;
