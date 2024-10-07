import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid d-flex justify-content-between">
        {/* Left side: Home and About us */}
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

        {/* Center: Event Weddora with logo below */}
        <div className="text-center">
          <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontSize: '24px', color: '#000' }}>
            Event Weddora
          </Link>
          <div>
            <img
              src={img}
              alt="Event Weddora"
              style={{ height: '50px', marginTop: '5px' }}
            />
          </div>
        </div>

        {/* Right side: Event service and Contact us */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/eventservice" style={{ color: '#005F3B', fontSize: '20px' }}>
              Event service
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact" style={{ color: '#005F3B', fontSize: '20px' }}>
              Contact us
            </Link>
          </li>
          {isLoggedIn ? (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/admin" style={{ color: '#005F3B', fontSize: '20px' }}>Admin Panel</Link>
                </li> */}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout} style={{ color: '#005F3B', fontSize: '20px' }}>Logout</button>
                </li>
              </>
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
