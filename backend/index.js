require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Import your database models and routes
const Video = require('./db/Video');
const TutorialStep = require('./db/TutorialStep');
const Product = require('./db/product');
const User = require('./db/User');


const userRoutes = require('./routes/userRoutes');
const countRoutes = require('./routes/countRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');
const VideoRoutes = require('./routes/VideoRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const TutorialRoutes = require('./routes/TutorialRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthenticate = require('./middleware/adminAuthenticate');
const authenticateToken = require('./middleware/authenticateToken');


const app = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Allow frontend to connect (CORS)
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your React frontend
}));

app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Multer for Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos', // Folder name in Cloudinary
    resource_type: 'video', // Specify that you're uploading videos
  },
});

const upload = multer({ storage });

app.use('/api/videos', VideoRoutes); 




// Video Library Endpoint
app.get('/video-library', async (req, res) => {
  try {
    const videos = await Video.find({}).select('-__v'); // Exclude the __v field from the response

    if (!videos.length) {
      return res.status(404).json({ message: 'No videos found.' });
    }

    res.status(200).json(videos); // Return the video library
  } catch (error) {
    console.error('Error fetching video library:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching video library', error: error.message });
  }
});


app.put('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, path, poster } = req.body;

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, path, poster },
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Error updating video', error });
  }
});

// Serve files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the tutorial routes
app.use('/api/tutorials', TutorialRoutes);


// Use imported routes
app.use('/api/users', userRoutes);
app.use('/api', countRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', ProfileRoutes);

// Admin Authentication Middleware
app.use('/api', adminAuthenticate);
app.use('/api/admin', adminRoutes);
app.use('/api', dashboardRoutes);





// User Subscription Routes
app.use('/subscriptions', subscriptionRoutes);



// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
