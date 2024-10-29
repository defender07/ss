// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Get unread notifications count
router.get('/count', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from authenticated token

    console.log("userId navbar count", userId);
    
    // Count unread notifications for the user
    const unreadCount = await Notification.countDocuments({
      userId,
      read: false, // Only count unread notifications
    });

    console.log("unreadCount navbar count", unreadCount);
    res.status(200).json({ count: unreadCount });
  } catch (error) {
    console.error('Error fetching unread notifications count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// routes/notifications.js

// Get all notifications for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
  
      // Find all notifications for this user, sorted by date (most recent first)
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 });
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  router.put('/mark-as-read', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // Get user ID from authenticated token
  
      // Update all unread notifications to read: true for this user
      await Notification.updateMany(
        { userId, read: false },
        { $set: { read: true } }
      );
  
      res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
      console.error('Error updating notifications:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
  module.exports = router;
  