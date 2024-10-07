import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DecorationComponent from '../components/DecorationComponent';
import VenueComponent from '../components/VenueComponent';
import CateringComponent from '../components/CateringComponent';
import Sidebar from '../components/Sidebar';

const EventOrganizerPanel = () => {
  const [activeTab, setActiveTab] = useState('Decoration');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'Decoration':
        return <DecorationComponent />;
      case 'Venue':
        return <VenueComponent />;
      case 'Catering':
        return <CateringComponent />;
      default:
        return <DecorationComponent />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default EventOrganizerPanel;
