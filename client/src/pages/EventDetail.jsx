import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Modal,Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { addFeedback, getCateringTeams_user, getDecorationTeams_user, getFeedbacks, getVenueTeams_user } from '../services/decorationService';
import { CalendarComponent } from '../components/CalendarComponent';
import { addToCart, getCartItems } from '../services/cartService';  // Import cart service
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import logoimg from "../assets/event-management.jpg"
import headerimg from "../assets/tq.jpeg"


const eventTypes = [
  'Wedding',
  'Bridal Shower',
  'Birthday Party',
  'Corporate Event',
  'Conference',
  'Workshop',
  'Seminar',
  'Engagement Party',
  'Baby Shower',
  'Anniversary',
  'Graduation Party',
  'Charity Event',
  'Product Launch',
  'Networking Event',
  'Concert',
  'Festival',
  'Team Building Event',
  'Holiday Party',
  'Award Ceremony',
  'Retirement Party',
  'Reunion',
  'Fundraiser',
  'Trade Show',
  'Exhibition',
  'Sports Event'
];

const EventDetail = () => {
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedDecorationTeam, setSelectedDecorationTeam] = useState(null);
  const [selectedCateringTeam, setSelectedCateringTeam] = useState(null);
  const [selectedVenueTeam, setSelectedVenueTeam] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [show, setShow] = useState(false);

  const [currentTeam, setCurrentTeam] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTeamType, setSelectedTeamType] = useState('');
  const [decorations, setDecorations] = useState([]);
  const [caterings, setCaterings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [cartItems, setCartItems] = useState([]);  // Cart items state

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ name: '', feedback: '' });


  const navigate = useNavigate(); 

  console.log("selectedDates", selectedDates);

  console.log("cartItems", cartItems);
  

  // Fetching teams and converting dates
  useEffect(() => {
    const cleanAvailableDates = (dates) => {
      return dates.map(dateStr => {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
      });
    };

    const fetchTeams = async () => {
      try {
        const [decorationData, cateringData, venueData] = await Promise.all([
          getDecorationTeams_user(),
          getCateringTeams_user(),
          getVenueTeams_user()
        ]);

        setDecorations(decorationData.map(team => ({
          ...team,
          availableDates: cleanAvailableDates(team.availableDates)
        })));
        setCaterings(cateringData.map(team => ({
          ...team,
          availableDates: cleanAvailableDates(team.availableDates)
        })));
        setVenues(venueData.map(team => ({
          ...team,
          availableDates: cleanAvailableDates(team.availableDates)
        })));
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleEventTypeSelect = (eventType) => {
    setSelectedEventType(eventType);
  };

  const handleTeamClick = (team, teamType) => {
    setCurrentTeam(team);
    setSelectedTeamType(teamType);
    setShowTeamModal(true);
  };

  const handleSelectTeam = () => {
    if (currentTeam) {
      const selectedDetails = { ...currentTeam, dates: selectedDates.map(date => format(date, 'yyyy-MM-dd')) };

      if (selectedTeamType === 'decoration') {
        setSelectedDecorationTeam(selectedDetails);
      } else if (selectedTeamType === 'catering') {
        setSelectedCateringTeam(selectedDetails);
      } else if (selectedTeamType === 'venue') {
        setSelectedVenueTeam(selectedDetails);
      }

      setShowTeamModal(false);
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleDateSelect = (date) => {
    console.log("Selected Date event detail:", date);
    
    // Use format from 'date-fns' to ensure date is in local timezone
    const formattedDate = format(date, 'yyyy-MM-dd');
  
    if (selectedDates.includes(formattedDate)) {
      setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
    } else {
      setSelectedDates([...selectedDates, formattedDate]);
    }
  };
  

  const handleAddToCart = async (team, teamType) => {
    try {
      console.log("team", team);
      console.log("teamType", teamType);
      
      
      await addToCart({ teamName: team.name, teamId: team._id, teamType });
      alert('Added to cart!');
      // Optionally fetch the updated cart items
      const updatedCartItems = await getCartItems();
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBooking = () => {
    if (!currentTeam || selectedDates.length === 0) return;
    
    const totalBudget = selectedDates.length * currentTeam.budget; // Calculate total budget

    // Navigate to the booking page with the team details and selected dates
    navigate('/booking', {
      state: {
        team: currentTeam,
        dates: selectedDates.map(date => format(date, 'yyyy-MM-dd')), // Format the dates
        totalBudget,
        eventType:selectedTeamType
      }
    });
  };

  const renderTeamDetailsModal = () => {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!currentTeam) return null;

    return (
      <Modal show={showTeamModal} onHide={() => setShowTeamModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentTeam.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`http://localhost:5000/${currentTeam.logo}`} alt={currentTeam.name} className="img-fluid mb-3" />
          <h6>Contact: {currentTeam.contact}</h6>
          <h6>Services: {currentTeam.services.map((service, index) => <li key={index}>{service}</li>)}</h6>

          <h6>Budget: {currentTeam.budget} /day</h6>
          <h6>Available Dates:</h6>

          <CalendarComponent selectedTeam={currentTeam} onDateSelect={handleDateSelect} />

          {selectedDates.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4>Selected Dates:</h4>
              <ul>
                {selectedDates.map((date, index) => <li key={index}>{date}</li>)}
              </ul>
            </div>
          )}

         

          <Button variant="primary" onClick={handleShow} style={{ marginTop: "20px" }}>
            View Images
          </Button>

          <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Image Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {currentTeam.images.map((image, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt={`team ${index}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



        </Modal.Body>
        <Modal.Footer>
        <button className="btn btn-primary" onClick={handleBooking} disabled={selectedDates.length === 0}>
          Book Now
        </button>

          {/* <button className="btn btn-success" onClick={() => handleAddToCart(currentTeam, selectedTeamType)}>
            Add to Cart
          </button> */}
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    const fetchInitialFeedbacks = async () => {
      if (currentTeam) {
        try {
          const feedbackData = await getFeedbacks(currentTeam._id); // Fetch feedbacks for the selected team
          setFeedbacks(feedbackData);
        } catch (error) {
          console.error('Error fetching initial feedback:', error);
        }
      }
    };
  
    fetchInitialFeedbacks();
  }, [currentTeam]); // Runs whenever the currentTeam changes
  

  const handleFeedbackButtonClick = async (team) => {
    setCurrentTeam(team);
    try {
      const feedbackData = await getFeedbacks(team._id); // Fetch feedbacks for the selected team
      setFeedbacks(feedbackData);
      
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      await addFeedback({eventid:currentTeam._id,organiserid:currentTeam.organizerId, feedback: newFeedback.feedback}); // Add feedback for the current team
      setFeedbacks([...feedbacks, newFeedback]);
      setNewFeedback({ name: '', feedback: '' });
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  console.log("feedbacks", feedbacks);
  

  const renderFeedbackModal = () => (
    <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Feedback for {currentTeam?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Existing Feedbacks:</h6>
        <ul>
          {feedbacks.map((fb, index) => (
            <li key={index}>
              <strong>{fb.name}</strong>: {fb.feedback}
            </li>
          ))}
        </ul>
        <h6>Add Your Feedback:</h6>
      
        <textarea
          placeholder="Your Feedback"
          value={newFeedback.feedback}
          onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
          className="form-control mb-2"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowFeedbackModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFeedbackSubmit}>
          Submit Feedback
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const renderTeamList = (teamType, teams) => (
    <div className="row">
      {teams.map((team) => (
        <div key={team.id} className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            
            {/* Header with logo and title */}
            <div 
              className="d-flex align-items-center justify-content-start" 
              style={{
                backgroundColor: '#f0f2f5',
                padding: '16px',
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              <img 
                src={`http://localhost:5000/${team.logo}`} 
                alt={team.name} 
                className="rounded-circle" 
                style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
              />
              <h5 className="card-title mb-0">{team.name}</h5>
            </div>
  
            {/* Main content area */}
            <div className="card-body text-center">
              <p className="card-text" style={{ color: '#6c757d' }}>
                {/* {`Specializes in ${team.specialty}. Discover their expertise!`} */}
                {`Specializes in Events. Discover their expertise!`}

              </p>
            </div>
  
            {/* Footer with buttons */}
            <div 
              className="card-footer d-flex flex-wrap justify-content-between align-items-center"
              style={{
                backgroundColor: '#f7f8fa',
                padding: '16px 20px',
                borderTop: '1px solid #e0e0e0'
              }}
            >
              <button 
                onClick={() => handleTeamClick(team, teamType)} 
                className="btn btn-sm btn-primary mx-1 mb-2"
                style={{ minWidth: '160px' }}
              >
                Check Availability
              </button>
              <button 
                onClick={() => handleFeedbackButtonClick(team)} 
                className="btn btn-sm btn-info mx-1 mb-2"
                style={{ minWidth: '160px' }}
              >
                Feedback
              </button>
              {/* <button 
                onClick={() => handlePreviousImagesClick(team)} 
                className="btn btn-sm btn-secondary mx-1 mb-2"
                style={{ minWidth: '160px' }}
              >
                Previous Images
              </button>
              <button 
                onClick={() => handleServicesProvidedClick(team)} 
                className="btn btn-sm btn-warning mx-1 mb-2"
                style={{ minWidth: '160px' }}
              >
                Services Provided
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="container mt-4">
     <div className="text-center my-5 p-5" style={{ backgroundImage:  `url(${headerimg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', color: 'white' }}>
     <div className="text-overlay" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '8px' }}>
  <h1 className="display-4 font-weight-bold mb-4" style={{ color: '#000' }}>
    EVENT PLANNING
  </h1>
  <p className="lead" style={{ color: '#000' }}>
    Plan your perfect event by selecting from our options below.
  </p>
</div>
  {/* Event Image */}
  <img
    src={logoimg}
    alt="Event Planning"
    className="img-fluid my-4"
    style={{ maxWidth: '300px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
  />
</div>

      <Tabs>
        <TabList>
          {/* <Tab>Select Your Event</Tab> */}
          <Tab>Select Decoration Team</Tab>
          <Tab>Select Catering Team</Tab>
          <Tab>Select Venue Team</Tab>
        </TabList>

        {/* <TabPanel>
          <div className="mt-4">
            <h4>Select Your Event</h4>
            <div className="d-flex flex-wrap">
  {eventTypes.map((eventType) => (
    <button
      key={eventType}
      className={`btn btn-outline-primary m-2 ${selectedEventType === eventType ? 'active' : ''}`}
      onClick={() => handleEventTypeSelect(eventType)}
    >
      {eventType}
    </button>
  ))}
</div>

          </div>
        </TabPanel> */}

        <TabPanel>
          <div className="mt-4">
            <h4>Select Decoration Team</h4>
            {renderTeamList('decoration', decorations)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mt-4">
            <h4>Select Catering Team</h4>
            {renderTeamList('catering', caterings)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mt-4">
            <h4>Select Venue Team</h4>
            {renderTeamList('venue', venues)}
          </div>
        </TabPanel>
      </Tabs>

      {renderTeamDetailsModal()}
      {renderFeedbackModal()}

      {/* <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>({item.items[0].teamName}) ({item.items[0].teamType})</li>
          ))}
        </ul>
      ) : (
        <p>No items in your cart.</p>
      )} */}
    </div>
  );
};

export default EventDetail;
