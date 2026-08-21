const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({});

module.exports = mongoose.model('Resource', ResourceSchema);
