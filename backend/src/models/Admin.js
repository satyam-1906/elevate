const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({});

module.exports = mongoose.model('Admin', AdminSchema);
