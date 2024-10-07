const express = require('express');
const { getAllOrganisers, verifyOrganiser } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get all unverified event organizers
router.get('/organisers', authMiddleware, adminMiddleware, getAllOrganisers);

// Route to verify an event organizer by ID
router.patch('/organisers/:id/verify', authMiddleware, adminMiddleware, verifyOrganiser);

module.exports = router;
