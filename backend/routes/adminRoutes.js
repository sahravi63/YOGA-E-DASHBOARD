const express = require('express');
const User = require('../db/User');
const authenticateToken = require('../middleware/authenticateToken');
const adminAuthenticate = require('../middleware/adminAuthenticate'); // Changed to adminAuthenticate
const router = express.Router();
const mongoose = require('mongoose'); // Ensure mongoose is imported

// Admin Dashboard
router.get('/dashboard', adminAuthenticate, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ userCount });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Fetch all users
router.get('/users', adminAuthenticate, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Delete User by ID
router.delete('/users/:id', adminAuthenticate, async (req, res) => { // Use router instead of app
  const { id } = req.params;

  // Validate if ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update User Info by ID
router.put('/users/:id', adminAuthenticate, async (req, res) => { // Use router instead of app
  const { id } = req.params;
  const updateData = req.body;

  // Validate if ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
