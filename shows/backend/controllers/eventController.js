const Event = require('../models/Event');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, venue, price, image } = req.body;
    const event = new Event({ title, description, date, venue, price, image });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: 'Invalid event data' });
  }
};
