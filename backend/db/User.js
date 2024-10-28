const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure this is hashed in production
  isAdmin: { type: Boolean, default: false },
  
  // Customer personal details
  phone: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false }
  },
  preferences: {
    meditationLevel: { type: String, required: false }, // Beginner, Intermediate, Advanced
    preferredLanguage: { type: String, required: false }, // e.g., English, Hindi
  },

  // Subscriptions
  subscriptions: {
    plan: { type: String, required: true, default: 'free' }, // E.g., 'free', 'premium', 'pro'
    status: { type: String, required: true, default: 'inactive' }, // Active, Inactive, etc.
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
