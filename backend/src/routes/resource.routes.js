const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const resourceController = require('../controllers/resource.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret_key'); } catch (e) { }
  }
  next();
};

// GET all resources (public, but filters drafts for non-admins)
router.get('/all', optionalAuth, resourceController.getAllResources);

// Admin-only route to create a resource with a thumbnail image
router.post(
  '/',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  resourceController.createResource
);

// Admin-only route to update a resource
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  resourceController.updateResource
);

// Admin-only route to delete a resource
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  resourceController.deleteResource
);

module.exports = router;
