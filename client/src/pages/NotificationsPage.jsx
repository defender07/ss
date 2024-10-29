import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    markNotificationsAsRead(); // Mark notifications as read when page loads
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { 'x-auth-token': token },
      });
      setNotifications(response.data); // Set all notifications from response
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markNotificationsAsRead = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        'http://localhost:5000/api/notifications/mark-as-read',
        {},
        {
          headers: { 'x-auth-token': token },
        }
      );
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };


  return (
    <div>
      <h2>Notifications</h2>

      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <small>{new Date(notification.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;
