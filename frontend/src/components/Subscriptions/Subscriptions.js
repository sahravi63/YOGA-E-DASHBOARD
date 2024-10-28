import React, { useState, useEffect } from 'react';
import './Subscriptions.css';

const Subscriptions = ({ user }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);  // Loading state for button actions

  useEffect(() => {
    if (user && user.id) {
      const fetchSubscription = async () => {
        const token = localStorage.getItem('token'); // Get token from local storage
        console.log('Token:', token);

        if (!token) {
          setError('Token not found. Please log in.');
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(`http://localhost:5000/subscriptions/${user.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          if (response.ok) {
            setSubscription(data);
          } else {
            setError(data.error || 'Failed to fetch subscription details.');
          }
        } catch (error) {
          console.error('Fetch error:', error);
          setError('Something went wrong, please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchSubscription();
    } else {
      setError('User ID is not defined.');
      setLoading(false);
    }
  }, [user]);

  const handleUpgrade = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found. Please log in.');
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/subscriptions/upgrade/${user.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok) {
        setSubscription(result);
        setMessage('Subscription upgraded successfully!');
      } else {
        setError(result.error || 'Failed to upgrade subscription.');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      setError('Something went wrong during the upgrade.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found. Please log in.');
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/subscriptions/cancel/${user.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const result = await response.json();

      if (response.ok) {
        setSubscription(null);  // Clear subscription state upon cancellation
        setMessage('Subscription cancelled successfully.');
      } else {
        setError(result.error || 'Failed to cancel subscription.');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      setError('Something went wrong during the cancellation.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading subscription details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="subscription-container">
      <h2>Your Subscription</h2>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {subscription ? (
        <div>
          <p>Plan: {subscription.plan}</p>
          <p>Status: {subscription.status}</p>
          <button onClick={handleUpgrade} disabled={actionLoading}>
            {actionLoading ? 'Upgrading...' : 'Upgrade Subscription'}
          </button>
          <button onClick={handleCancel} disabled={actionLoading}>
            {actionLoading ? 'Cancelling...' : 'Cancel Subscription'}
          </button>
        </div>
      ) : (
        <div>
          <p>You don't have an active subscription.</p>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
