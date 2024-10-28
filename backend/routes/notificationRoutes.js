const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
  sendWhatsAppMessage,
  createOrUpdateUserProfile,
  getUserProfile,
  deleteUserProfile,
} = require('../controllers/userController');

// Route to send WhatsApp message
router.post('/send-whatsapp', 
  body('message').isString().notEmpty().withMessage('Message is required'),
  body('to').isMobilePhone('any').withMessage('Valid phone number is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await sendWhatsAppMessage(req, res);
});

// Route to create or update user profile
router.post('/profile', createOrUpdateUserProfile);

// Route to get user profile
router.get('/profile', getUserProfile);

// Route to delete user profile
router.delete('/profile', deleteUserProfile);

module.exports = router;
