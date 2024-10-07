// src/pages/Header.js
import React from 'react';
import './Header.css'; // Custom CSS for header styles

const Header = () => {
  return (
    <header className="header-section text-center text-white">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4">Welcome to Event Organizer</h1>
            <p className="lead">Your one-stop solution for planning and organizing events effortlessly.</p>
            <a href="#getstarted" className="btn btn-primary btn-lg">Get Started</a>
          </div>
          <div className="col-lg-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Event"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
