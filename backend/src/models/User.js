const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'student'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
