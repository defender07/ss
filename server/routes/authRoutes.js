const express = require('express');
const {
  registerUser,
  loginUser,
  registerOrganiser
} = require('../controllers/authController');

const router = express.Router();

// Registration routes
router.post('/register', registerUser); // Register normal users
router.post('/register-organiser', registerOrganiser); // Register event organisers

// Login route
router.post('/login', loginUser); // Login for normal users and organisers

module.exports = router;
