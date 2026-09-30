const HallOfFame = require('../models/HallOfFame');

// Helper to parse winners from FormData string or Array
function parseWinners(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  return [];
}

// GET all Hall of Fame events
exports.getAllHallOfFame = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { isPublished: { $ne: false } };
    const items = await HallOfFame.find(filter).sort({ date: -1 });
    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching Hall of Fame events:', error);
    return res.status(500).json({ error: 'Internal server error fetching Hall of Fame' });
  }
};

const mongoose = require('mongoose');

// GET single Hall of Fame event by ID
exports.getHallOfFameById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid event ID format' });
    }
    const item = await HallOfFame.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Hall of Fame event not found' });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching Hall of Fame event:', error);
    return res.status(500).json({ error: 'Internal server error fetching Hall of Fame event' });
  }
};

// POST create Hall of Fame event
exports.createHallOfFame = async (req, res) => {
  try {
    const { eventName, date, description, category, isPublished, bannerUrl: bodyBannerUrl } = req.body;
    const winners = parseWinners(req.body.winners);

    if (!eventName || !date) {
      return res.status(400).json({ error: 'Event name and date are required' });
    }

    // req.file is set by multer Cloudinary middleware
    const bannerUrl = req.file ? req.file.path : (bodyBannerUrl || '');

    const newEntry = new HallOfFame({
      eventName: eventName.trim(),
      date: new Date(date),
      description: description || '',
      bannerUrl,
      category: category || 'Hackathon',
      winners,
      isPublished: isPublished !== undefined ? String(isPublished) === 'true' || isPublished === true : true
    });

    await newEntry.save();
    return res.status(201).json({
      message: 'Hall of Fame event created successfully',
      item: newEntry
    });
  } catch (error) {
    console.error('Error creating Hall of Fame event:', error);
    return res.status(500).json({ error: error.message || 'Internal server error creating Hall of Fame event' });
  }
};

// PUT update Hall of Fame event
exports.updateHallOfFame = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid event ID format' });
    }
    const { eventName, date, description, category, isPublished, bannerUrl: bodyBannerUrl } = req.body;
    const updateData = {};

    if (eventName !== undefined) updateData.eventName = eventName.trim();
    if (date !== undefined) updateData.date = new Date(date);
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (isPublished !== undefined) {
      updateData.isPublished = String(isPublished) === 'true' || isPublished === true;
    }

    if (req.body.winners !== undefined) {
      updateData.winners = parseWinners(req.body.winners);
    }

    if (req.file) {
      updateData.bannerUrl = req.file.path; // Cloudinary URL
    } else if (bodyBannerUrl !== undefined) {
      updateData.bannerUrl = bodyBannerUrl;
    }

    const updated = await HallOfFame.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Hall of Fame event not found' });
    }

    return res.status(200).json({
      message: 'Hall of Fame event updated successfully',
      item: updated
    });
  } catch (error) {
    console.error('Error updating Hall of Fame event:', error);
    return res.status(500).json({ error: error.message || 'Internal server error updating Hall of Fame event' });
  }
};

// DELETE Hall of Fame event
exports.deleteHallOfFame = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid event ID format' });
    }
    const deleted = await HallOfFame.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Hall of Fame event not found' });
    }
    return res.status(200).json({ message: 'Hall of Fame event deleted successfully' });
  } catch (error) {
    console.error('Error deleting Hall of Fame event:', error);
    return res.status(500).json({ error: 'Internal server error deleting Hall of Fame event' });
  }
};
