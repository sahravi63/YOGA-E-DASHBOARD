const express = require('express');
const authenticateToken = require('../middleware/authenticateToken'); // Adjust the path to your middleware
const User = require('../db/User'); // Adjust the path to your User model

const router = express.Router();

// Get User Subscription
router.get('/:userId', authenticateToken, async (req, res) => {

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.subscription) return res.status(404).json({ error: 'Subscription not found' });
    
    res.status(200).json(user.subscription);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Upgrade Subscription
router.post('/upgrade/:userId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.subscription.plan = 'Premium';
    user.subscription.status = 'Active';
    user.subscription.startDate = new Date();
    user.subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    await user.save();
    res.status(200).json(user.subscription);
  } catch (error) {
    res.status(500).json({ error: 'Server error during upgrade.' });
  }
});

// Cancel Subscription
router.post('/cancel/:userId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.subscription.status = 'Cancelled';
    user.subscription.endDate = new Date(); // Set end date to current time

    await user.save();
    res.status(200).json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during cancellation.' });
  }
});

module.exports = router;
