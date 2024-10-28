const express = require('express');
const router = express.Router();
const User = require('../db/User'); // Adjust path as necessary
const Video = require('../db/Video'); // Adjust path as necessary

// Get user count
router.get('/user-count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user count', error });
  }
});

// Get video count
router.get('/video-count', async (req, res) => {
  try {
    const count = await Video.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video count', error });
  }
});

module.exports = router;
