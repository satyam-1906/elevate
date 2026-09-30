const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hallOfFameController = require('../controllers/hallOfFame.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    } catch (e) {}
  }
  next();
};

const handleUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (req.files && req.files.length > 0) {
      req.file = req.files.find(f => f.fieldname === 'banner') || 
                 req.files.find(f => f.fieldname === 'image') || 
                 req.files[0];
    }
    next();
  });
};

// GET all Hall of Fame events
router.get('/', optionalAuth, hallOfFameController.getAllHallOfFame);
router.get('/all', optionalAuth, hallOfFameController.getAllHallOfFame);

// GET single Hall of Fame event
router.get('/:id', optionalAuth, hallOfFameController.getHallOfFameById);

// Admin-only: Create Hall of Fame event
router.post(
  '/',
  requireAuth,
  requireAdmin,
  handleUpload,
  hallOfFameController.createHallOfFame
);

// Admin-only: Update Hall of Fame event
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  handleUpload,
  hallOfFameController.updateHallOfFame
);

// Admin-only: Delete Hall of Fame event
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  hallOfFameController.deleteHallOfFame
);

module.exports = router;
