const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({});

module.exports = mongoose.model('Challenge', ChallengeSchema);
