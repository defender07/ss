import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addCateringTeam, getCateringTeams } from '../services/decorationService';


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

  console.log("decoration new",selectedTeam?.availableDates);
  

  const handleAddDecoration = async (newDecoration) => {
    try {
      const addedTeam = await addCateringTeam(newDecoration);
      setDecorationTeams([...decorationTeams, addedTeam]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding decoration team:', error);
    }
  };

  
  const cleanAvailableDates = (dates) => {
    // Assuming dates is a JSON string of an array
    const parsedDates = JSON.parse(dates);
  
    // Convert date strings to 'YYYY-MM-DD' format
    return parsedDates.map(dateStr => {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
    });
  };

  const handleSelectTeam = (team) => {
    console.log("decoration",team);

    const cleanedDates = cleanAvailableDates(team.availableDates);
    setSelectedTeam({ ...team, availableDates: cleanedDates });
    setShowDetails(false); // Reset details view on new selection

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
                <button className="btn btn-secondary btn-sm">Check Availability</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9">
          {!showAddForm ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Catering Teams</h3>
                <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                  Add Catering Team
                </button>
              </div>
              {selectedTeam && (
                <div>
                  <h4>{selectedTeam.name}</h4>
                  <p><strong>Contact:</strong> {selectedTeam.contact}</p>
                  <p><strong>Budget:</strong> {selectedTeam.budget} /day </p>

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
  const [budget, setbudget] = useState('')


  console.log("decoImages: ", images);
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Store file objects
  };

  // Handle logo file selection
  const handleLogoUpload = (e) => {
    setLogo(e.target.files[0]); // Store file object
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', contact);
    formData.append('budget', budget);
    formData.append('location', location);
    formData.append('services', services.split(',').map(service => service.trim()).join(','));
    formData.append('availableDates', JSON.stringify(availableDates));
    formData.append('logo', logo); // Append the logo file
    images.forEach(image => formData.append('images', image)); // Append each image file

    try {
      await onAddDecoration(formData);
    } catch (error) {
      console.error('Error adding decoration team:', error);
    }
  };

  return (
    <div>
      <h3>Add Catering Team</h3>
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
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
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
            placeholder='per day'
            value={budget}
            onChange={(e) => setbudget(e.target.value)}
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
            tileClassName={({ date }) =>
              availableDates.includes(new Date(date).toDateString())
                ? 'available-date'
                : null
            }
          />
          <div className="mt-2">
            <h6>Selected Dates:</h6>
            <ul>
              {availableDates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Upload Images</label>
          <input
            type="file"
            className="form-control"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="mt-2">
            <h6>Selected Images:</h6>
            <div className="d-flex">
              {images.map((image, index) => (
                <img key={index} src={`/uploads/${image}`} alt={`Upload Preview ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
              ))}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Upload Logo</label>
          <input
            type="file"
            className="form-control"
            id="logo"
            accept="image/*"
            onChange={handleLogoUpload}
          />
          {logo && (
            <div className="mt-2">
              <h6>Selected Logo:</h6>
              <img src={`/uploads/${logo}`} alt="Upload Preview" style={{ width: '150px' }} />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Add Catering Team</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

const CalendarComponent = ({ selectedTeam }) => {
  // Extract available dates and ensure they are in 'YYYY-MM-DD' format
  const availableDates = selectedTeam?.availableDates || [];


  


  // Function to check if a date is available
  const isDateAvailable = (date) => {
    // Format date to 'YYYY-MM-DD'
    const formattedDate = date.toISOString().split('T')[0];
    return availableDates.includes(formattedDate);
  };

  console.log("Available Dates:", availableDates); // For debugging

  return (
    <div>
      <Calendar
        tileClassName={({ date }) => isDateAvailable(date) ? 'available-date' : null}
        // You can add additional props to the Calendar component here if needed
      />
      <style jsx>{`
        .available-date {
          background: #00B98E; /* Your desired color */
          color: white;
        }
      `}</style>
    </div>
  );
};

export default DecorationComponent;
