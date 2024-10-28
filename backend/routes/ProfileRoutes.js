const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../db/User');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Set your desired upload destination

// GET User Profile
const path = require('path');

// Assuming your uploads are served statically
const uploadsUrl = 'http://localhost:5000/uploads/'; // Adjust if necessary

// Adjust the profile fetching logic
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated request
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if profilePicture is defined
        const profilePictureUrl = user.profilePicture 
            ? path.join(uploadsUrl, user.profilePicture.split('\\').pop()) // Ensure proper URL format
            : null; // Handle the case when profilePicture is not set

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            preferences: user.preferences,
            profilePicture: profilePictureUrl,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Update User Profile
router.put('/profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, phone } = req.body; // Include phone in the body
        const profilePicture = req.file ? req.file.path : null; // Store the file path

        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        // Prepare the update object
        const updateData = {
            name,
            phone,
            profilePicture,
            address: {
                street: req.body['address.street'],
                city: req.body['address.city'],
                state: req.body['address.state'],
                zipCode: req.body['address.zipCode'],
            },
            preferences: {
                meditationLevel: req.body['preferences.meditationLevel'],
                preferredLanguage: req.body['preferences.preferredLanguage'],
            },
        };

        // Remove undefined fields to avoid overwriting them in the database
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }); // Return the updated user

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
