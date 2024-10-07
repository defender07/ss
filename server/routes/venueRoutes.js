const express = require('express');
const router = express.Router();
const { addVenueTeam, getAllVenues, getAllVenues_user } = require('../controllers/venueController');
const upload = require('../middlewares/uploadMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Route to add a venue team with image upload
router.post('/add',authMiddleware, upload.fields([
  { name: 'logo', maxCount: 1 }, // Handle single logo upload
  { name: 'images', maxCount: 10 } // Handle multiple image uploads (max 10)
]), addVenueTeam);

// Route to get all venue teams
router.get('/',authMiddleware, getAllVenues);

router.get('/user',authMiddleware, getAllVenues_user);


module.exports = router;
