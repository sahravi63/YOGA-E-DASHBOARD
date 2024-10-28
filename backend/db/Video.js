const mongoose = require('mongoose');



const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: true }, // Store Cloudinary URL
  poster: { type: String }, // Store Cloudinary URL for poster
});

const Video = mongoose.model('Video', videoSchema);


module.exports = Video;
