const Event = require('../models/Event');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    console.log("Returning events:", events.map(e => ({ id: e._id, title: e.title, image: e.image })));
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
      rating,
      richDescription,
      // New fields for customizable content
      aboutEvent,
      featuredArtists,
      whatToExpect,
      venueInformation,
      importantNotes,
      // Sidebar categories
      duration,
      ageLimit,
      language,
      // Ticket types
      ticketType1,
      ticketType2,
      ticketType3,
      trailer
    } = req.body;
    
    console.log("Creating event with image:", image);
    
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
      rating,
      richDescription,
      // New fields for customizable content
      aboutEvent,
      featuredArtists,
      whatToExpect,
      venueInformation,
      importantNotes,
      // Sidebar categories
      duration,
      ageLimit,
      language,
      // Ticket types
      ticketType1,
      ticketType2,
      ticketType3,
      trailer
    });
    
    await event.save();
    console.log("Saved event:", event);
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
      rating,
      richDescription,
      // New fields for customizable content
      aboutEvent,
      featuredArtists,
      whatToExpect,
      venueInformation,
      importantNotes,
      // Sidebar categories
      duration,
      ageLimit,
      language,
      // Ticket types
      ticketType1,
      ticketType2,
      ticketType3,
      trailer
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
        rating,
        richDescription,
        // New fields for customizable content
        aboutEvent,
        featuredArtists,
        whatToExpect,
        venueInformation,
        importantNotes,
        // Sidebar categories
        duration,
        ageLimit,
        language,
        // Ticket types
        ticketType1,
        ticketType2,
        ticketType3,
        trailer
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
