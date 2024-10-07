import React from 'react';
import Calendar from 'react-calendar';

const DecorationCalendar = ({ team, onClose }) => {
  return (
    <div>
      <h3>{team.name} - Available Dates</h3>
      <Calendar
        value={team.availableDates.map(date => new Date(date))}
        tileDisabled={({ date }) => !team.availableDates.includes(date.toISOString().split('T')[0])}
      />
      <button className="btn btn-secondary mt-3" onClick={onClose}>Back</button>
    </div>
  );
};

export default DecorationCalendar;
