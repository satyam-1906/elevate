const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// GET all events (public)
router.get('/all', eventController.getAllEvents);

// Health check
router.get('/', (req, res) => {
  res.json({ message: 'event route working' });
});

// Admin-only route to create an event with a cover image (Cloudinary via Multer)
router.post(
  '/',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  eventController.createEvent
);

// Admin-only route to update an event
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  eventController.updateEvent
);

// Admin-only route to delete an event
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  eventController.deleteEvent
);

module.exports = router;

