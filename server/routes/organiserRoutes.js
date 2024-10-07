const express = require('express');
const { organiserDashboard } = require('../controllers/organiserController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, organiserDashboard);

module.exports = router;
