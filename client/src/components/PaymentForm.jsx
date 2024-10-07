import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/bookingService';  // Your booking service

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    // Create a payment intent on the backend
    try {
      const { clientSecret } = await createPaymentIntent(totalAmount);
      
      // Confirm the payment using the client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        // You can proceed with booking confirmation here
      }
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? 'Processing...' : `Pay $${totalAmount}`}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default PaymentForm;
