const Cart = require('../models/cartModel');

// Add item to the cart (No validation on existing cart for the same user)
const addToCart = async (req, res) => {
  const { teamName,teamId, teamType } = req.body;
  const userId = req.user.userId; // Fetching user ID from token

  console.log("add cart", teamId, teamType, userId);
  
  try {
    // Create a new cart entry for the user with the team item
    const cart = new Cart({ userId, items: [{teamName, teamId, teamType }] });
    await cart.save();

    res.status(201).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  const userId = req.user.userId; // Fetching user ID from token


  console.log("get cart", userId);
  

  try {
    // Find all cart entries for the user
    const cartItems = await Cart.find({ userId })

    console.log("cartItems", cartItems);
    

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'No cart items found for this user' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  const userId = req.user.userId; // Fetching user ID from token
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the specific item
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
};
