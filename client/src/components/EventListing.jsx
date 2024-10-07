import React from 'react';
import EventCard from './EventCard';
import event from '../assets/eventplanning.jpg';

const EventListing = () => {
  const events = [
    {
      title: 'Wedding Planning',
      description: 'Plan the perfect wedding with our comprehensive guides and resources.',
      image: event,
      link: '/wedding-planning' // Replace with the actual link
    },
    {
      title: 'Bridal Shower Planning',
      description: 'Get ideas and tips for planning a memorable bridal shower.',
      image: 'https://via.placeholder.com/300x200',
      link: '/bridal-shower-planning' // Replace with the actual link
    },
    {
      title: 'Corporate Event Planning',
      description: 'Everything you need to plan a successful corporate event.',
      image: 'https://via.placeholder.com/300x200',
      link: '/corporate-event-planning' // Replace with the actual link
    },
    // Add more events here
  ];

  return (
    <div className="container">
      <div className="row">
        {events.map((event, index) => (
          <EventCard 
            key={index} 
            title={event.title} 
            description={event.description} 
            image={event.image} 
            link={event.link} 
          />
        ))}
      </div>
    </div>
  );
};

export default EventListing;
