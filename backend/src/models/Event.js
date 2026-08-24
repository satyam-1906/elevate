const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String, // Store Cloudinary URL here
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
