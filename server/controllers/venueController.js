const Venue = require('../models/venueModel');

// Add Venue Team
const addVenueTeam = async (req, res) => {
  const { name, services, location, availableDates,contact,budget } = req.body;
  const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

  console.log(req.files);

  try {
    const newVenue = new Venue({
      name,
      services: services.split(','), // Assuming services are sent as a comma-separated string
      location,
      contact,
      budget,
      availableDates: availableDates.split(','), // Assuming dates are sent as a comma-separated string
      logo: req.files['logo'] ? req.files['logo'][0].path : '', // Store the path of the logo image
      images: req.files['images'] ? req.files['images'].map(file => file.path) : [], // Store the paths of uploaded images
      organizerId
    });

    await newVenue.save();
    res.json({ message: 'Venue team added successfully' });
  } catch (err) {
    console.error('Error adding venue team:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Venue Teams
const getAllVenues = async (req, res) => {
  try {
    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

    console.log("getAllVenues");
    const venues = await Venue.find({ organizerId });
    res.json(venues);
  } catch (err) {
    console.error('Error fetching venues:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


const getAllVenues_user = async (req, res) => {
  try {
    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

    console.log("getAllVenues");
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    console.error('Error fetching venues:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteVenueTeam = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const deletedTeam = await Venue.findByIdAndDelete(id); // Use your model to delete

    if (!deletedTeam) {
      return res.status(404).json({ message: 'Venue team not found' });
    }

    res.status(200).json({ message: 'Venue team deleted successfully', team: deletedTeam });
  } catch (error) {
    console.error('Error deleting venue team:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addVenueTeam, getAllVenues,getAllVenues_user ,deleteVenueTeam};
