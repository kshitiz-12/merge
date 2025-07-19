const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { auth, adminAuth } = require('../middleware/auth');

// GET /api/events - Get all events (public)
router.get('/', eventController.getEvents);

// GET /api/events/:id - Get single event (public)
router.get('/:id', eventController.getEvent);

// POST /api/events - Create new event (admin only)
router.post('/', adminAuth, eventController.createEvent);

// PUT /api/events/:id - Update event (admin only)
router.put('/:id', adminAuth, eventController.updateEvent);

// DELETE /api/events/:id - Delete event (admin only)
router.delete('/:id', adminAuth, eventController.deleteEvent);

module.exports = router;
