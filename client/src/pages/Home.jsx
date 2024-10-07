import React from 'react';
import { Link } from 'react-router-dom';
import CarouselComponent from '../components/Carsoule';
import EventListing from '../components/EventListing';
import './Home.css'; // Import the CSS file


const Home = () => {
  return (
    <div>
      <CarouselComponent />
     
      {/* <EventListing /> */}

    </div>
  );
};

export default Home;

