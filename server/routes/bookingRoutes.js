const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Import your middleware
const sendEmail = require('../mailer'); // Adjust the path as necessary
const Notification = require('../models/Notification');

// Respond to a booking
router.post('/:id/respond', authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const organiserId = req.user.userId; // Extract organiser's ID from the token

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking status
    booking.status = 'Responded';
    await booking.save();

    // Create a notification for the customer
    const notification = new Notification({
      senderId: organiserId,
      userId: booking.userId, // Customer receiving the notification
      message: `Your booking for the event ${booking.eventType} has been responded to.`,
      bookingId: booking._id,
    });

    await notification.save();

    // Prepare and send email notification
    // const emailSubject = `Booking Response for Event: ${booking.eventType}`;
    // const emailText = `Your booking for the event with ID ${booking.eventId} has been responded to. Current status: ${booking.status}.`;
    // await sendEmail(booking.userEmail, emailSubject, emailText);

    return res.status(200).json({ message: 'Booking responded successfully, notification created, and email sent.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET bookings for the authenticated organiser
router.get('/', authMiddleware, async (req, res) => {
  const organiserId = req.user.userId; // Extract organiserId from the token

  console.log("organiserId",  organiserId);
  

  try {
    // Find bookings by organiserId
    const bookings = await Booking.find({ organiserId });

    console.log("bookings", bookings);
    if (!bookings) {
      return res.status(404).json({ message: 'No bookings found for this organiser.' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;

