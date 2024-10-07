import React, { useState } from 'react';
import Calendar from 'react-calendar';

const AddDecorationForm = ({ onAddTeam, onCancel }) => {
  const [teamName, setTeamName] = useState('');
  const [services, setServices] = useState('');
  const [contact, setContact] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleLogoUpload = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleImagesUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      id: Date.now(),
      name: teamName,
      services,
      contact,
      availableDates: selectedDates.map(date => date.toISOString().split('T')[0]),
      logo,
      images,
    };
    onAddTeam(newTeam);
  };

  return (
    <div>
      <h3>Add Decoration Team</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Team Name</label>
          <input type="text" className="form-control" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Services Offered</label>
          <textarea className="form-control" rows="3" value={services} onChange={(e) => setServices(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Details</label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Logo</label>
          <input type="file" className="form-control" onChange={handleLogoUpload} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input type="file" className="form-control" multiple onChange={handleImagesUpload} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Available Dates</label>
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={true}
            minDate={new Date()}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Decoration Team</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddDecorationForm;
