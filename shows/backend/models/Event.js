const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: String, required: true },
  time: { type: String, default: "7:00 PM" },
  venue: { type: String, required: true },
  city: { type: String, default: "Kathmandu" },
  price: { type: Number, required: true },
  category: { type: String, default: "Event" },
  image: String, // URL or path to image
  attendees: { type: String, default: "1,000" },
  rating: { type: String, default: "4.8" },
  richDescription: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);
