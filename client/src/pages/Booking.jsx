import React from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const { team, dates, totalBudget, eventType } = location.state;

  const handlePayment = async () => {
    const options = {
      key: 'rzp_test_VV4f2wnWIgVXRP', // Replace with your Test Key ID from Razorpay dashboard
      amount: totalBudget * 100, // Razorpay accepts amount in paise, so multiply by 100
      currency: 'INR',
      name: eventType,
      description: 'Booking Payment',
      handler: function (response) {
        // Callback function after payment is successful
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log(response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#00B98E' // Razorpay theme color to match your preference
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
            <button onClick={handlePayment} className="btn btn-success btn-lg">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
