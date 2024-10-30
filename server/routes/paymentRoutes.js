const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Booking = require('../models/Booking');
const { authMiddleware } = require('../middlewares/authMiddleware');
const Catering = require('../models/cateringModel');
const Decoration = require('../models/decorationModel');
const Venue = require('../models/venueModel');

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance with your key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a payment order
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  // console.log("amount", currency);
  

  const options = {
    amount: amount *100, // Convert to paise (1 INR = 100 paise)
    currency: currency || 'INR',
    receipt: 'receipt_order_74394',
  };

  try {
    const order = await razorpay.orders.create(options);
    // console.log("order", order);
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Verify the payment signature

router.post('/verify-payment', authMiddleware, async (req, res) => {
  const { order_id, payment_id, signature, bookingDetails } = req.body;

  console.log("Booking Details:", req.body);

  // Step 1: Verify the Razorpay signature
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${order_id}|${payment_id}`);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature !== signature) {
    console.log("Signature mismatch");
    return res.status(400).json({ success: false, message: 'Payment verification failed' });
  }

  console.log("User ID from login:", req.user);

  // Step 2: Save the booking details
  try {
    const newBooking = new Booking({
      userId: req.user.userId,
      eventId: bookingDetails.eventId,
      bookedDates: bookingDetails.dates,
      eventType: bookingDetails.eventType,
      organiserId: bookingDetails.organiserId,
      paymentId: payment_id,
      amount: bookingDetails.totalBudget,
      currency: bookingDetails.currency || 'INR',
      status: 'Paid',
      createdAt: new Date()
    });

    await newBooking.save(); // Save booking to the database

    // Step 3: Identify the correct event model based on eventType
    let eventModel;
    if (bookingDetails.eventType === 'catering') {
      eventModel = Catering;
    } else if (bookingDetails.eventType === 'decoration') {
      eventModel = Decoration;
    } else if (bookingDetails.eventType === 'venue') {
      eventModel = Venue;
    } else {
      return res.status(400).json({ message: 'Invalid event type' });
    }

    // Step 4: Remove booked dates from availableDates
    const bookedDates = bookingDetails.dates; // Already in 'YYYY-MM-DD' format

    // Check if the event exists
    const event = await eventModel.findById(bookingDetails.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found or already booked' });
    }

    // Filter out the booked dates from availableDates
    event.availableDates = event.availableDates.filter(date => !bookedDates.includes(date));

    await event.save();

    console.log("Booking and date removal successful:", newBooking);

    res.status(200).json({ success: true, message: 'Payment verified, booking saved, and available dates updated.' });

  } catch (error) {
    console.log("Error during booking:", error);
    res.status(500).json({ success: false, message: 'Booking saving failed.', error });
  }
});

module.exports = router;
