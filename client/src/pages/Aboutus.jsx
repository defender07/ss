import React from 'react';
import { FaUsers, FaCalendarCheck, FaHandsHelping } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 style={{ fontWeight: 'bold', color: '#005F3B', textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>
          About Event Weddora
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          Bringing Your Events to Life with Elegance and Precision
        </p>
      </div>

      <div className="row text-center mb-5">
        <div className="col-md-4">
          <FaUsers size={50} className="mb-3" style={{ color: '#005F3B' }} />
          <h4>Our Team</h4>
          <p>
            A dedicated team of event experts who are passionate about making your vision come to life.
          </p>
        </div>
        <div className="col-md-4">
          <FaCalendarCheck size={50} className="mb-3" style={{ color: '#005F3B' }} />
          <h4>Our Commitment</h4>
          <p>
            Committed to ensuring every detail is perfectly planned and executed for your special day.
          </p>
        </div>
        <div className="col-md-4">
          <FaHandsHelping size={50} className="mb-3" style={{ color: '#005F3B' }} />
          <h4>Our Mission</h4>
          <p>
            To create unforgettable experiences with a seamless and personalized approach.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-lg mb-5"> {/* Added margin-bottom here */}
        <div className="card-body text-center">
          <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#005F3B' }}>
            Why Choose Event Weddora?
          </h5>
          <p className="card-text">
            At Event Weddora, we prioritize your needs and work diligently to bring a unique touch to every event. Our team of professionals
            collaborates closely with you to understand your vision, delivering a memorable experience that aligns with your expectations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
