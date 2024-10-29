// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  organiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organiser', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  bookedDates: {
    type: [String],  // An array of strings representing booked dates
    required: true
  },
  eventType: { type: String },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, default: 'Paid' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
