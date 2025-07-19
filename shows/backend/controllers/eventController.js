const Event = require('../models/Event');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new event
exports.createEvent = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      time, 
      venue, 
      city, 
      price, 
      category, 
      image,
      attendees,
      rating 
    } = req.body;
    
    const event = new Event({ 
      title, 
      description, 
      date, 
      time, 
      venue, 
      city, 
      price, 
      category, 
      image,
      attendees,
      rating 
    });
    
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ error: 'Invalid event data' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      time, 
      venue, 
      city, 
      price, 
      category, 
      image,
      attendees,
      rating 
    } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        date, 
        time, 
        venue, 
        city, 
        price, 
        category, 
        image,
        attendees,
        rating 
      },
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(400).json({ error: 'Invalid event data' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
