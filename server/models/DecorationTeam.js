const mongoose = require('mongoose');

const DecorationTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  services: { type: [String], required: true },
  location: { type: String, required: true },
  availableDates: { type: [Date], required: true },
  images: { type: [String] }, // Store URLs or paths to images
  logo: { type: String }, // Store URL or path to the logo
}, { timestamps: true });

module.exports = mongoose.model('DecorationTeam', DecorationTeamSchema);
