const mongoose = require('mongoose');

const tutorialStepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  mediaUrl: { type: String }, // Store file path here
  order: { type: Number, required: true },
});

module.exports = mongoose.model('TutorialStep', tutorialStepSchema);
