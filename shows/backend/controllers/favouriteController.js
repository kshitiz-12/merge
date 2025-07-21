const Favourite = require('../models/Favourite');
const Event = require('../models/Event');

// List all favourites for a user
exports.getFavourites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const favourites = await Favourite.find({ user: userId }).populate('event');
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a favourite event
exports.addFavourite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId } = req.body;
    // Prevent duplicates
    const exists = await Favourite.findOne({ user: userId, event: eventId });
    if (exists) return res.status(400).json({ error: 'Already favourited' });
    const favourite = new Favourite({ user: userId, event: eventId });
    await favourite.save();
    await favourite.populate('event');
    res.status(201).json(favourite);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Remove a favourite event
exports.removeFavourite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId } = req.body;
    const result = await Favourite.findOneAndDelete({ user: userId, event: eventId });
    if (!result) return res.status(404).json({ error: 'Favourite not found' });
    res.json({ message: 'Removed from favourites' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 