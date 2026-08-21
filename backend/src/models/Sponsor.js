const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({});

module.exports = mongoose.model('Sponsor', SponsorSchema);
