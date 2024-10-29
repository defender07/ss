import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import img from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  const fetchNotificationsCount = async () => {
    const token = localStorage.getItem('token');
    console.log("token navbar", token);
    
    try {
      const response = await axios.get('http://localhost:5000/api/notifications/count', {
        headers: { 'x-auth-token': token },
      });
      setNotificationsCount(response.data.count); // Set count from API response
    } catch (error) {
      console.error('Failed to fetch notifications count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid d-flex justify-content-between">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ color: '#005F3B', fontSize: '20px' }}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" style={{ color: '#005F3B', fontSize: '20px' }}>
              About us
            </Link>
          </li>
        </ul>

        <div className="text-center">
          <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontSize: '24px', color: '#000' }}>
            Event Weddora
          </Link>
          <img src={img} alt="Event Weddora" style={{ height: '50px', marginTop: '5px' }} />
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/notifications" style={{ color: '#005F3B', fontSize: '20px' }}>
              <FaBell /> Notifications
              {notificationsCount > 0 && (
                <span className="badge bg-danger" style={{ marginLeft: '5px' }}>{notificationsCount}</span>
              )}
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout} style={{ color: '#005F3B', fontSize: '20px' }}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: '#005F3B', fontSize: '20px' }}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" style={{ color: '#005F3B', fontSize: '20px' }}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
