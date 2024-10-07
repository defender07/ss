// src/pages/ServicesPage.js
import React from 'react';
import eventplanning from "../assets/eventplanning.jpg";
import venuebooking from "../assets/venuebooking.jpg";
import caterbooking from "../assets/cateringbooking.jpg";
import './ServicesPage.css'; // Import custom CSS for animations

function ServicesPage() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Services</h2>
      
      <div className="row">
        {/* Service 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 service-card">
            <img src={eventplanning} className="card-img-top service-img" alt="Event Planning" />
            <div className="card-body">
              <h5 className="card-title">Event Planning</h5>
              <p className="card-text">Comprehensive event planning services to make your event a success.</p>
              <a href="/services/event-planning" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 service-card">
            <img src={venuebooking} className="card-img-top service-img" alt="Venue Booking" />
            <div className="card-body">
              <h5 className="card-title">Venue Booking</h5>
              <p className="card-text">Find and book the perfect venue for your event.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>

         {/* Service 2 */}
         <div className="col-md-4 mb-4">
          <div className="card h-100 service-card">
            <img src={venuebooking} className="card-img-top service-img" alt="Venue Booking" />
            <div className="card-body">
              <h5 className="card-title">Decoration</h5>
              <p className="card-text">Beautiful and thematic decoration services to enhance your event.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>

        {/* Service 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 service-card">
            <img src={caterbooking} className="card-img-top service-img" alt="Catering Services" />
            <div className="card-body">
              <h5 className="card-title">Catering Services</h5>
              <p className="card-text">High-quality catering services for all types of events.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
