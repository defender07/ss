// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organiser', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID of the customer receiving the notification
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', NotificationSchema);
