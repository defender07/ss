// routes/feedbackRoutes.js
const express = require('express');
const {getFeedbacks, getFeedbacksByOrganizer, addFeedback } = require('../controllers/feedbackController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addFeedback); // Route to add feedback (authenticated users only)
router.get('/:eventId', authMiddleware, getFeedbacks); // Route to get feedback for a specific event
router.get('/organiser', authMiddleware, getFeedbacksByOrganizer); // Route to get feedback for a specific organizer

module.exports = router;
