const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

// GET /api/bookings (user's bookings)
router.get('/', auth, bookingController.getBookings);

// GET /api/bookings/all (admin only - all bookings)
router.get('/all', adminAuth, bookingController.getAllBookings);

// POST /api/bookings (create booking)
router.post('/', auth, bookingController.createBooking);

// PUT /api/bookings/:id/status (admin only - update booking status)
router.put('/:id/status', adminAuth, bookingController.updateBookingStatus);

// DELETE /api/bookings/:id (delete booking)
router.delete('/:id', auth, bookingController.deleteBooking);

module.exports = router;
