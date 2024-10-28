// routes/dashboardRoutes.js

const express = require('express');
const User = require('../db/User'); // Adjust the path as necessary
const Product = require('../db/product'); // Adjust the path as necessary

const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const authenticateAdmin = require('../middleware/adminAuthenticate');

// GET dashboard stats
router.get('/dashboard-stats', authenticateAdmin, async (req, res) => { // Apply admin authentication
  try {
    const userCount = await User.countDocuments(); // Count total users
    const videoCount = await Product.countDocuments(); // Count total products (videos)

    // Send response with the counts
    res.json({ userCount, videoCount });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
