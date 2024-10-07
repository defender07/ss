const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Route to add item to cart (requires user to be authenticated)
router.post('/', authMiddleware, addToCart);

// Route to get all cart items for the logged-in user (requires user to be authenticated)
router.get('/', authMiddleware, getCartItems);

// Route to remove an item from the cart (requires user to be authenticated)
router.delete('/:itemId', authMiddleware, removeFromCart);

module.exports = router;
