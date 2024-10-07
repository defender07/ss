const mongoose = require('mongoose');

const cateringSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
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

const Catering = mongoose.model('Catering', cateringSchema);

module.exports = Catering;
