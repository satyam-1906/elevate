const mongoose = require('mongoose');

const WinnerSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
    default: '1st Place'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  projectTitle: {
    type: String,
    default: ''
  },
  projectUrl: {
    type: String,
    default: ''
  },
  prize: {
    type: String,
    default: ''
  },
  members: {
    type: [String],
    default: []
  }
}, { _id: true });

const HallOfFameSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  bannerUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Hackathon'
  },
  winners: {
    type: [WinnerSchema],
    default: []
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('HallOfFame', HallOfFameSchema);
