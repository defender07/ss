import axios from 'axios';

// Add item to the cart
export const addToCart = async (cartItem) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  console.log("add cart cartItem", cartItem);
  

  try {
    const response = await axios.post('http://localhost:5000/api/cart', cartItem, {
      headers: {
        'Content-Type': 'application/json', // Ensure content-type is correct for JSON payload
        'x-auth-token': token, // Pass the token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Get all cart items for the authenticated user
export const getCartItems = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    const response = await axios.get('http://localhost:5000/api/cart', {
      headers: {
        'x-auth-token': token, // Pass the token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeFromCart = async (itemId) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
      headers: {
        'x-auth-token': token, // Pass the token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};
