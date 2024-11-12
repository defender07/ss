import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addCateringTeam, deleteCateringTeam, getCateringTeams } from '../services/decorationService';

const DecorationComponent = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [decorationTeams, setDecorationTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchDecorationTeams();
  }, []);

  const fetchDecorationTeams = async () => {
    try {
      const teams = await getCateringTeams();
      setDecorationTeams(teams);
    } catch (error) {
      console.error('Error fetching decoration teams:', error);
    }
  };

  const handleAddDecoration = async (newDecoration) => {
    try {
      const addedTeam = await addCateringTeam(newDecoration);
      setDecorationTeams([...decorationTeams, addedTeam]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding decoration team:', error);
    }
  };

  const handleDeleteDecoration = async (id) => {
    try {
      await deleteCateringTeam(id);
      setDecorationTeams(decorationTeams.filter(team => team._id !== id));
    } catch (error) {
      console.error('Error deleting decoration team:', error);
    }
  };

  const cleanAvailableDates = (dates) => {
    return dates.map(dateStr => {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    });
  };

  const handleSelectTeam = (team) => {
    const cleanedDates = cleanAvailableDates(team.availableDates);
    setSelectedTeam({ ...team, availableDates: cleanedDates });
    setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {decorationTeams.map(team => (
              <li
                key={team._id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleSelectTeam(team)}
              >
                {team.name}
                <div>
                  <button className="btn btn-secondary btn-sm">Check Availability</button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDecoration(team._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9">
          {!showAddForm ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Decoration Teams</h3>
                <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                  Add Decoration Team
                </button>
              </div>
              {selectedTeam && (
                <div>
                  <h4>{selectedTeam.name}</h4>
                  <p><strong>Contact:</strong> {selectedTeam.contact}</p>
                  <p><strong>Budget:</strong> {selectedTeam.budget} /day</p>
                  <p><strong>Location:</strong> {selectedTeam.location}</p>
                  <p><strong>Services:</strong> {selectedTeam.services.join(', ')}</p>

                  <button className="btn btn-info" onClick={toggleDetails}>
                    {showDetails ? 'Hide Details' : 'Show Details'}
                  </button>

                  {showDetails && (
                    <div>
                      <div className="mt-3">
                        <h5>Team Logo</h5>
                        {selectedTeam.logo && (
                          <img src={`http://localhost:5000/${selectedTeam.logo}`} alt="Team Logo" style={{ width: '150px' }} />
                        )}
                      </div>
                      <div className="mt-3">
                        <h5>Available Dates</h5>
                        <CalendarComponent selectedTeam={selectedTeam} />
                      </div>
                      <div className="mt-3">
                        <h5>Team Images</h5>
                        <div className="d-flex">
                          {selectedTeam.images.map((image, index) => (
                            <img key={index} src={`http://localhost:5000/${image}`} alt={`Team Work ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <AddDecorationForm onAddDecoration={handleAddDecoration} onCancel={() => setShowAddForm(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

const AddDecorationForm = ({ onAddDecoration, onCancel }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [services, setServices] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [budget, setBudget] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleLogoUpload = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDates = availableDates.map(dateString => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });

    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', contact);
    formData.append('budget', budget);
    formData.append('location', location);
    formData.append('services', services.split(',').map(service => service.trim()).join(','));
    formattedDates.forEach(date => formData.append('availableDates[]', date));
    formData.append('logo', logo);
    images.forEach(image => formData.append('images', image));

    try {
      await onAddDecoration(formData);
    } catch (error) {
      console.error('Error adding decoration team:', error);
    }
  };

  return (
    <div>
      <h3>Add Decoration Team</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Team Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="services" className="form-label">Services Offered</label>
          <input
            type="text"
            className="form-control"
            id="services"
            placeholder="Separate services with commas"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="budget" className="form-label">Budget</label>
          <input
            type="number"
            className="form-control"
            id="budget"
            placeholder="per day"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="availableDates" className="form-label">Available Dates</label>
          <Calendar
            onChange={(date) => {
              const newDate = new Date(date).toDateString();
              setAvailableDates(
                availableDates.includes(newDate)
                  ? availableDates.filter((d) => d !== newDate)
                  : [...availableDates, newDate]
              );
            }}
            tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} // Ensures past dates are disabled
            tileClassName={({ date }) =>
              availableDates.includes(new Date(date).toDateString()) ? 'available-date' : null
            }
            minDate={new Date()} // Blocks past date selections
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Team Logo</label>
          <input type="file" className="form-control" id="logo" onChange={handleLogoUpload} />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Team Images</label>
          <input type="file" multiple className="form-control" id="images" onChange={handleImageUpload} />
        </div>
        <button type="submit" className="btn btn-primary">Add Decoration Team</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

const CalendarComponent = ({ selectedTeam }) => {
  const availableDates = selectedTeam.availableDates;

  return (
    <Calendar
      tileClassName={({ date }) =>
        availableDates.includes(new Date(date).toISOString().split('T')[0]) ? 'highlight-date' : null
      }
      tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} // Ensures past dates are disabled
      minDate={new Date()} // Blocks past date selections
    />
  );
};

export default DecorationComponent;
