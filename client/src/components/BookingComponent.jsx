import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/bookings_organiser', {
          headers: {
            'x-auth-token': token,
          },
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleResponse = async (bookingId) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('Authentication token is missing. Please login again.');
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/bookings_organiser/${bookingId}/respond`,
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
  
      // Check if response was successful
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: 'Responded' } // Update status locally
              : booking
          )
        );
        setError(null); // Clear any previous errors
      } else {
        setError('Failed to respond to booking. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to respond to booking');
    }
  };
  

  return (
    <div className="booking-list">
      <h2>Customer Bookings</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookings.length > 0 ? (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li key={booking._id} className="list-group-item">
              <strong>User ID:</strong> {booking.userId} <br />
              <strong>Event Type:</strong> {booking.eventType} <br />
              <strong>Event ID:</strong> {booking.eventId} <br />
              <strong>Payment ID:</strong> {booking.paymentId} <br />
              <strong>Booked Dates:</strong> {booking.bookedDates.join(', ')} <br />
              <strong>Amount:</strong> {booking.amount} {booking.currency} <br />
              <strong>Status:</strong> {booking.status} <br />
              <strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()} <br />
              {booking.status === 'Paid' && (
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleResponse(booking._id)}
                >
                  Respond
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingComponent;
