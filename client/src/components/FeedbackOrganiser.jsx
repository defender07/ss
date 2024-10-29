// FeedbackComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackOrganiser = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback_org/organiser', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setFeedbacks(response.data);
      } catch (err) {
        setError('Failed to fetch feedback. Please try again later.');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <h2>Feedback for Your Events</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="list-group">
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="list-group-item">
              <strong>{feedback.name}</strong>: {feedback.feedback}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackOrganiser;
