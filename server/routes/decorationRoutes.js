const express = require('express');
const router = express.Router();
const { addDecorationTeam, getAllDecorations, getAllDecorations_user, deleteDecorationTeam } = require('../controllers/decorationController');
const upload = require('../middlewares/uploadMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Route to add a decoration team with image upload
router.post('/add',authMiddleware, upload.fields([
  { name: 'logo', maxCount: 1 }, // Handle single logo upload
  { name: 'images', maxCount: 10 } // Handle multiple image uploads (max 10)
]), addDecorationTeam);

// Route to get all decoration teams
router.get('/',authMiddleware, getAllDecorations);

router.delete('/:id', authMiddleware, deleteDecorationTeam);

router.get('/user',authMiddleware, getAllDecorations_user);

module.exports = router;
