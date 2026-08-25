const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  domain: { type: String, required: true },
  category: { type: String }, // type in frontend
  difficulty: { type: String },
  tags: [{ type: String }],
  url: { type: String }, // equivalent to links[0].url
  imageUrl: { type: String }, // thumbnail from Cloudinary
  isPublished: { type: Boolean, default: true },
  
  // Optional legacy fields for backward compatibility
  author: { type: String },
  cost: { type: String },
  official: { type: Boolean, default: false },
  rating: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);
