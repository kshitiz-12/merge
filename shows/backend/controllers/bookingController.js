const Booking = require('../models/Booking');

// Get all bookings for a user
exports.getBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ user: userId }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId, quantity } = req.body;
    const booking = new Booking({ user: userId, event: eventId, quantity });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Invalid booking data' });
  }
};
