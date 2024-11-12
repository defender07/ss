import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import img from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [activeButton, setActiveButton] = useState('');

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
      setNotificationsCount(response.data.count);
    } catch (error) {
      console.error('Failed to fetch notifications count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid">
        {/* Left side with 3D style title and logo */}
        <div className="d-flex align-items-center">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontWeight: 'bold',
              fontSize: '32px',
              color: '#000',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0px 2px 8px rgba(0, 0, 0, 0.15)', // 3D effect
            }}
          >
            Event Weddora
          </Link>
          <img src={img} alt="Event Weddora" style={{ height: '50px', marginLeft: '10px' }} />
        </div>

        {/* Right side with navigation buttons */}
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${activeButton === 'home' ? 'text-primary' : 'text-dark'}`}
                onClick={() => { handleButtonClick('home'); navigate('/'); }}
                style={{ fontSize: '20px', textDecoration: activeButton === 'home' ? 'underline' : 'none' }}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${activeButton === 'about' ? 'text-primary' : 'text-dark'}`}
                onClick={() => { handleButtonClick('about'); navigate('/abt'); }}
                style={{ fontSize: '20px', textDecoration: activeButton === 'about' ? 'underline' : 'none' }}
              >
                About us
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${activeButton === 'notifications' ? 'text-primary' : 'text-dark'}`}
                onClick={() => { handleButtonClick('notifications'); navigate('/notifications'); }}
                style={{ fontSize: '20px', textDecoration: activeButton === 'notifications' ? 'underline' : 'none' }}
              >
                <FaBell /> Notifications
                {notificationsCount > 0 && (
                  <span className="badge bg-danger ms-2">{notificationsCount}</span>
                )}
              </button>
            </li>
            {localStorage.getItem('token') ? (
              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${activeButton === 'logout' ? 'text-primary' : 'text-dark'}`}
                  onClick={() => { handleButtonClick('logout'); handleLogout(); }}
                  style={{ fontSize: '20px', textDecoration: activeButton === 'logout' ? 'underline' : 'none' }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className={`btn btn-link nav-link ${activeButton === 'login' ? 'text-primary' : 'text-dark'}`}
                    onClick={() => { handleButtonClick('login'); navigate('/login'); }}
                    style={{ fontSize: '20px', textDecoration: activeButton === 'login' ? 'underline' : 'none' }}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-link nav-link ${activeButton === 'register' ? 'text-primary' : 'text-dark'}`}
                    onClick={() => { handleButtonClick('register'); navigate('/register'); }}
                    style={{ fontSize: '20px', textDecoration: activeButton === 'register' ? 'underline' : 'none' }}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
