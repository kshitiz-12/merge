const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// GET /api/bookings (user's bookings)
router.get('/', auth, bookingController.getBookings);

// POST /api/bookings (create booking)
router.post('/', auth, bookingController.createBooking);

module.exports = router;
