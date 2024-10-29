import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Decoration' ? 'active' : ''}`}
              onClick={() => setActiveTab('Decoration')}
            >
              Decoration
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Venue' ? 'active' : ''}`}
              onClick={() => setActiveTab('Venue')}
            >
              Venue
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Catering' ? 'active' : ''}`}
              onClick={() => setActiveTab('Catering')}
            >
              Catering
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Booking' ? 'active' : ''}`} // New Booking tab
              onClick={() => setActiveTab('Booking')}
            >
              Booking
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Feedback' ? 'active' : ''}`} // New Booking tab
              onClick={() => setActiveTab('Feedback')}
            >
              Feedbacks
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
