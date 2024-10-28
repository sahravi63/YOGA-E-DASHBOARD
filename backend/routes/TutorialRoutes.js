const express = require('express');
const multer = require('multer');
const path = require('path');
const TutorialStep = require('../db/TutorialStep'); // Adjust the path to your model

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tutorials'); // Set destination to 'uploads/tutorials' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`); // Example: media-123456789.mp4
  },
});

const upload = multer({ storage });

// Upload Meditation Tutorial Step (Local File Storage)
router.post('/upload-tutorial', upload.single('media'), async (req, res) => {
  const { title, description, order } = req.body;

  // Create a new tutorial step with local media file path
  const tutorialStep = new TutorialStep({
    title,
    description,
    mediaUrl: req.file ? req.file.path : null, // Store the local file path
    order,
  });

  try {
    await tutorialStep.save();
    res.status(201).json({ message: 'Tutorial step uploaded successfully', tutorialStep });
  } catch (error) {
    console.error('Error saving tutorial step:', error);
    res.status(500).json({ message: 'Error saving tutorial step', error });
  }
});

// Get all Tutorial Steps
router.get('/tutorial-steps', async (req, res) => {
  try {
    const steps = await TutorialStep.find({}).sort({ order: 1 });
    
    // Respond with the tutorial steps
    res.json(steps);
  } catch (error) {
    console.error('Error fetching tutorial steps:', error);
    res.status(500).json({ message: 'Error fetching tutorial steps' });
  }
});

module.exports = router;
