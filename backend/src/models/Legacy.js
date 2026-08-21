const mongoose = require('mongoose');

const LegacySchema = new mongoose.Schema({});

module.exports = mongoose.model('Legacy', LegacySchema);
