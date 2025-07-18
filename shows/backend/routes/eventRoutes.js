const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET /api/events
router.get('/', eventController.getEvents);

// POST /api/events
router.post('/', eventController.createEvent);

module.exports = router;
