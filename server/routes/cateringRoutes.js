const express = require('express');
const router = express.Router();
const { addCateringTeam, getAllCaterings, getAllCaterings_user, deleteCateringTeam } = require('../controllers/cateringController');
const upload = require('../middlewares/uploadMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Route to add a catering team with image upload
router.post('/add',authMiddleware, upload.fields([
  { name: 'logo', maxCount: 1 }, // Handle single logo upload
  { name: 'images', maxCount: 10 } // Handle multiple image uploads (max 10)
]), addCateringTeam);

// Route to get all catering teams
router.get('/', authMiddleware,getAllCaterings);

router.get('/user', authMiddleware,getAllCaterings_user);

router.delete('/:id', authMiddleware, deleteCateringTeam); // Define the delete route

module.exports = router;
