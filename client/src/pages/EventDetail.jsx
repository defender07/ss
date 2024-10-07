import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Modal,Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { getCateringTeams_user, getDecorationTeams_user, getVenueTeams_user } from '../services/decorationService';
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


  const navigate = useNavigate(); 

  console.log("selectedDates", selectedDates);

  console.log("cartItems", cartItems);
  

  // Fetching teams and converting dates
  useEffect(() => {
    const cleanAvailableDates = (dates) => {
      const parsedDates = JSON.parse(dates);
      return parsedDates.map(dateStr => {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
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

  const renderTeamList = (teamType, teams) => (
    <div className="row">
      {teams.map((team) => (
        <div key={team.id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{team.name}</h5>
              <button onClick={() => handleTeamClick(team, teamType)} className="btn btn-primary">
                Check Availability
              </button>
              {/* <button onClick={() => handleAddToCart(team, teamType)} className="btn btn-success ml-2">
                Add to Cart
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
          <Tab>Select Your Event</Tab>
          <Tab>Select Decoration Team</Tab>
          <Tab>Select Catering Team</Tab>
          <Tab>Select Venue Team</Tab>
        </TabList>

        <TabPanel>
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
        </TabPanel>

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
