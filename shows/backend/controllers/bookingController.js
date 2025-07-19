const Booking = require('../models/Booking');

// Get all bookings for a user
exports.getBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ user: userId })
      .populate('event')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error getting bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('event')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error getting all bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { 
      eventId, 
      ticketQuantities, 
      customerInfo, 
      totalAmount, 
      totalTickets,
      paymentMethod = 'card'
    } = req.body;
    
    const booking = new Booking({ 
      user: userId, 
      event: eventId, 
      ticketQuantities, 
      customerInfo, 
      totalAmount, 
      totalTickets,
      paymentMethod
    });
    
    await booking.save();
    
    // Populate event details for response
    await booking.populate('event');
    
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(400).json({ error: 'Invalid booking data' });
  }
};

// Update booking status (admin only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('event');
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(400).json({ error: 'Invalid booking data' });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
