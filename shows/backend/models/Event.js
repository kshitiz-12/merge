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
  // New fields for customizable content
  aboutEvent: { type: String, default: "" },
  featuredArtists: { type: String, default: "" },
  whatToExpect: { type: String, default: "" },
  venueInformation: { type: String, default: "" },
  importantNotes: { type: String, default: "" },
  trailer: { type: String, default: "" },
  // Sidebar categories
  duration: { type: String, default: "" },
  ageLimit: { type: String, default: "" },
  language: { type: String, default: "" },
  // Ticket types
  ticketType1: {
    name: { type: String, default: "General Admission" },
    price: { type: String, default: "" },
    description: { type: String, default: "" },
    use: { type: Boolean, default: false }
  },
  ticketType2: {
    name: { type: String, default: "VIP Seating" },
    price: { type: String, default: "" },
    description: { type: String, default: "" },
    use: { type: Boolean, default: false }
  },
  ticketType3: {
    name: { type: String, default: "Premium Package" },
    price: { type: String, default: "" },
    description: { type: String, default: "" },
    use: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);
