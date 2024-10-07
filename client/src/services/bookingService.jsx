import axios from 'axios';

// Create a booking
export const createBooking = async (bookingData) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
      headers: {
        'Content-Type': 'application/json', // Ensure content-type is correct for JSON payload
        'x-auth-token': token, // Pass the token for authentication
      },
    });
    return response.data; // Return the booking response data
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error; // Throw error to handle in UI
  }
};

// Create a payment intent with Stripe
export const createPaymentIntent = async (amount) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    const response = await axios.post('http://localhost:5000/api/payments', { amount }, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    return response.data; // Return the payment intent response
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error; // Throw error to handle in UI
  }
};
