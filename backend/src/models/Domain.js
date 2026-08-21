const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({});

module.exports = mongoose.model('Domain', DomainSchema);
