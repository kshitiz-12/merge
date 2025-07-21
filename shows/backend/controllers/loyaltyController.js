const LoyaltyPoint = require('../models/LoyaltyPoint');

// Get current points and history for a user
exports.getLoyaltyPoints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await LoyaltyPoint.find({ user: userId }).sort({ createdAt: -1 });
    const total = history.reduce((sum, lp) => sum + (lp.type === 'earn' ? lp.amount : -lp.amount), 0);
    res.json({ total, history });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Redeem points
exports.redeemPoints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, description } = req.body;
    // Calculate current points
    const history = await LoyaltyPoint.find({ user: userId });
    const total = history.reduce((sum, lp) => sum + (lp.type === 'earn' ? lp.amount : -lp.amount), 0);
    if (amount > total) return res.status(400).json({ error: 'Not enough points' });
    const redeem = new LoyaltyPoint({ user: userId, type: 'redeem', amount, description });
    await redeem.save();
    res.status(201).json(redeem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
}; 