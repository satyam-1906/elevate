const Resource = require('../models/Resource');

// GET all resources
exports.getAllResources = async (req, res) => {
  try {
    const query = {};
    if (!req.user || req.user.role !== 'admin') {
      query.isPublished = true;
    }
    const resources = await Resource.find(query).sort({ createdAt: -1 });
    return res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({ error: 'Internal server error fetching resources' });
  }
};

// POST create resource
exports.createResource = async (req, res) => {
  try {
    const { title, description, domain, category, difficulty, tags, url, isPublished, author, cost, official, rating } = req.body;
    
    // multer-storage-cloudinary places the file URL in req.file.path
    const imageUrl = req.file ? req.file.path : null;

    if (!title || !domain) {
      return res.status(400).json({ error: 'Title and domain are required' });
    }

    const newResource = new Resource({
      title,
      description,
      domain,
      category,
      difficulty,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      url,
      imageUrl,
      isPublished: isPublished === 'true' || isPublished === true,
      author,
      cost,
      official: official === 'true' || official === true,
      rating
    });

    await newResource.save();
    return res.status(201).json({ message: 'Resource created successfully', resource: newResource });
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(500).json({ error: 'Internal server error while creating resource' });
  }
};

// PUT update resource
exports.updateResource = async (req, res) => {
  try {
    const { title, description, domain, category, difficulty, tags, url, isPublished, author, cost, official, rating } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (domain !== undefined) updateData.domain = domain;
    if (category !== undefined) updateData.category = category;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (tags !== undefined) updateData.tags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    if (url !== undefined) updateData.url = url;
    if (isPublished !== undefined) updateData.isPublished = isPublished === 'true' || isPublished === true;
    if (author !== undefined) updateData.author = author;
    if (cost !== undefined) updateData.cost = cost;
    if (official !== undefined) updateData.official = official === 'true' || official === true;
    if (rating !== undefined) updateData.rating = rating;

    if (req.file) {
      updateData.imageUrl = req.file.path; // Cloudinary URL
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    return res.status(200).json({
      message: 'Resource updated successfully',
      resource: updatedResource,
    });
  } catch (error) {
    console.error('Error updating resource:', error);
    return res.status(500).json({ error: 'Internal server error while updating resource' });
  }
};

// DELETE resource
exports.deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Resource not found' });
    return res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return res.status(500).json({ error: 'Internal server error while deleting resource' });
  }
};
