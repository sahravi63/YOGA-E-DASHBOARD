// middleware/twilioMiddleware.js
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Middleware to validate Twilio credentials
const validateTwilioCredentials = (req, res, next) => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return res.status(500).json({ message: 'Twilio credentials are missing.' });
  }
  next();
};

// Optionally, you can create a middleware function to log messages being sent
const logWhatsAppMessage = (req, res, next) => {
  console.log(`Sending WhatsApp message to ${req.body.to}: ${req.body.message}`);
  next();
};

module.exports = { validateTwilioCredentials, logWhatsAppMessage };
