const Event = require('../models/Event');

// GET all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'Internal server error fetching events' });
  }
};

// POST create event (with optional Cloudinary image upload via Multer)
exports.createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    
    // multer-storage-cloudinary places the file URL in req.file.path
    const imageUrl = req.file ? req.file.path : null;

    if (!title || !date) {
      return res.status(400).json({ error: 'Title and date are required' });
    }

    const newEvent = new Event({
      title,
      date: new Date(date),
      description,
      imageUrl
    });

    await newEvent.save();
    return res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ error: 'Internal server error while creating event' });
  }
};

// DELETE event by id
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ error: 'Internal server error while deleting event' });
  }
};

// PUT update event by id
exports.updateEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (date !== undefined) updateData.date = new Date(date);
    if (description !== undefined) updateData.description = description;
    if (req.file) {
      updateData.imageUrl = req.file.path; // Cloudinary URL
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ error: 'Internal server error while updating event' });
  }
};

