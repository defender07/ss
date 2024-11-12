import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigating to other pages
  const { team, dates, totalBudget, eventType } = location.state;
  const [isPaymentComplete, setIsPaymentComplete] = useState(false); // Track payment completion

  const handlePayment = async () => {
    // Create order on the backend
    const orderResponse = await fetch('http://localhost:5000/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalBudget, // Total budget for the event
        currency: 'INR',
      }),
    });

    const order = await orderResponse.json();

    // Initialize Razorpay checkout with order details
    const options = {
      key: 'rzp_test_AQjlQQp7RxrHDu', // Replace with your Test Key ID
      amount: order.amount,
      currency: order.currency,
      name: eventType,
      description: 'Booking Payment',
      order_id: order.id, // Razorpay Order ID
      handler: async (response) => {
        // Payment successful, verify payment on the backend
        const verifyPayment = await fetch('http://localhost:5000/api/payments/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            bookingDetails: {
              team: team.name,
              userId: team._id,
              eventId: team._id,
              organiserId: team.organizerId,
              dates: dates,
              totalBudget: totalBudget,
              eventType: eventType
            },
          }),
        });

        const verificationResponse = await verifyPayment.json();
        if (verificationResponse.success) {
          alert('Payment verified successfully!');
          setIsPaymentComplete(true); // Set payment as complete
          console.log(response);
        } else {
          alert('Payment verification failed!');
        }
      },
      prefill: {
        name: 'Test User',
        email: 'vyshnavk891@example.com',
        contact: '+91 7025000141',
      },
      theme: {
        color: '#00B98E',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleDisabledClick = () => {
    if (isPaymentComplete) {
      alert('Payment has already been completed. You cannot make another payment.');
    }
  };

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the Home page
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="row align-items-center">
          {/* Team Logo */}
          <div className="col-md-4 text-center mb-3">
            <img
              src={`http://localhost:5000/${team.logo}`}
              alt={`${team.name} Logo`}
              className="img-fluid rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            {/* Booking Details */}
            <h2 className="mb-3">{eventType} Booking Details</h2>
            <div className="mb-4">
              <p><strong>Team Name:</strong> {team.name}</p>
              <p><strong>Team ID:</strong> {team._id}</p>
              <p><strong>Selected Dates:</strong> {dates.join(', ')}</p>
              <p><strong>Total Budget:</strong> ₹{totalBudget}</p>
            </div>
            <h3>Payment</h3>
            <button
              onClick={isPaymentComplete ? handleDisabledClick : handlePayment}
              className={`btn btn-lg ${isPaymentComplete ? 'btn-danger' : 'btn-success'}`} // Change to red if payment is complete
              disabled={isPaymentComplete} // Disable button after payment
            >
              {isPaymentComplete ? 'Payment Completed' : 'Pay Now'}
            </button>
            <button
              onClick={handleBackToHome}
              className="btn btn-primary btn-lg mt-3"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
