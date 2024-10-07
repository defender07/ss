const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availableDates: {
    type: [String],
    required: true,
  },
  logo: {
    type: String, // Path to the logo image
  },
  images: {
    type: [String], // Array of paths to uploaded images
  },
  organizerId: { // Add organizerId to associate a service with its creator
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizer',
    required: true
  }
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
