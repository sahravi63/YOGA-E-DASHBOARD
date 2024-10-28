// routes/VideoRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Video = require('../db/Video'); // Adjust the path as needed

const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const authenticateAdmin = require('../middleware/adminAuthenticate');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos', // Folder for storing videos
    resource_type: 'video', // Specify resource type
  },
});

const upload = multer({ storage });

// POST: Upload video with optional poster
router.post('/upload-video', upload.fields([{ name: 'video' }, { name: 'poster' }]), async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Check if video is provided
    if (!req.files || !req.files.video || req.files.video.length === 0) {
      return res.status(400).json({ message: 'No video file provided' });
    }

    // Extract video file
    const videoFile = req.files.video[0];

    // Upload video to Cloudinary and get the URL
    const resultVideo = await cloudinary.uploader.upload(videoFile.path, {
      folder: 'videos',
      resource_type: 'video',
    });

    let posterUrl = null;

    // Handle optional poster upload
    if (req.files.poster && req.files.poster[0]) {
      const posterFile = req.files.poster[0];
      try {
        const resultPoster = await cloudinary.uploader.upload(posterFile.path, {
          folder: 'posters', // Folder for posters
          resource_type: 'image',
        });
        posterUrl = resultPoster.secure_url; // Store the Cloudinary poster URL
      } catch (err) {
        console.error('Error uploading poster:', err);
        return res.status(500).json({ message: 'Error uploading poster', error: err.message });
      }
    }

    // Create video document in MongoDB
    const video = new Video({
      title: req.body.title,
      description: req.body.description || '',
      path: resultVideo.secure_url, // Use the Cloudinary URL for the video
      poster: posterUrl, // Cloudinary URL for the poster
      uploadedBy: req.user ? req.user._id : null, // Optional reference to the user
    });

    // Save video document to MongoDB
    await video.save();

    res.status(201).json({ message: 'Video and metadata uploaded successfully', video });
  } catch (err) {
    console.error('Error uploading video:', err);
    res.status(500).json({ message: 'Error saving video metadata', error: err.message });
  }
});

// GET: Count of videos
router.get('/video-count', async (req, res) => {
  try {
    const count = await Video.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching video count:', error);
    res.status(500).json({ message: 'Error fetching video count', error: error.message });
  }
});

module.exports = router;
