// src/pages/OrderCompletePage.js
import React from 'react';

function OrderCompletePage() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Thank You for Your Order!</h2>
      <p>Your booking has been confirmed. Below are the details:</p>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          <p className="card-text"><strong>Event Date:</strong> January 15, 2024</p>
          <p className="card-text"><strong>Venue:</strong> Grand Palace Hall</p>
          <p className="card-text"><strong>Services:</strong> Event Planning, Catering</p>
          <p className="card-text"><strong>Total Paid:</strong> $1500</p>
          <p className="card-text"><strong>Transaction ID:</strong> ABCD1234</p>
        </div>
      </div>

      <a href="/my-bookings" className="btn btn-primary">View My Bookings</a>
      <a href="/" className="btn btn-secondary ml-2">Return to Home</a>
    </div>
  );
}

export default OrderCompletePage;
