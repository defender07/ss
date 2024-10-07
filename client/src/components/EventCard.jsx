import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EventCard.css';

const EventCard = ({ title, description, image, link }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card event-card shadow-sm">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href="/event_detail" className="btn btn-primary mt-auto">View Event Page</a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
