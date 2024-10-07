import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are dedicated to providing the best event management services.
              Our team ensures that your events are memorable and successful.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: rohith052@</li>
              <li>Phone: +91</li>
              <li>Address: 123 Event St, City, Country</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row text-center mt-3">
          <div className="col">
            <p>&copy; 2024 Event Weddora. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
