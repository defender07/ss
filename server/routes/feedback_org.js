// routes/feedbackRoutes.js
const express = require('express');
const { getFeedbacksByOrganizer } = require('../controllers/feedbackController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/organiser', authMiddleware, getFeedbacksByOrganizer); // Route to get feedback for a specific organizer

module.exports = router;
