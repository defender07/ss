const Decoration = require('../models/decorationModel');

// Add Decoration Team
const addDecorationTeam = async (req, res) => {
  const { name, services,contact, location, availableDates, budget } = req.body;

  const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

  // console.log("add dec",req.user);
  

  console.log(req.files);
  

  try {
    const newDecoration = new Decoration({
      name,
      services: services.split(','), // Assuming services are sent as a comma-separated string
      contact,
      budget,
      location,
      availableDates: availableDates.split(','), // Assuming dates are sent as a comma-separated string
      logo: req.files['logo'] ? req.files['logo'][0].path : '', // Store the path of the logo image
      images: req.files['images'] ? req.files['images'].map(file => file.path) : [], // Store the paths of uploaded images
      organizerId
    });

    await newDecoration.save();
    res.json({ message: 'Decoration team added successfully' });
  } catch (err) {
    console.error('Error adding decoration team:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Decoration Teams
const getAllDecorations = async (req, res) => {
  try {

    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user
    console.log("getAllDecorations");
    
    const decorations = await Decoration.find({ organizerId });
    res.json(decorations);
  } catch (err) {
    console.error('Error fetching decorations:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllDecorations_user = async (req, res) => {
  try {

    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user
    console.log("getAllDecorations");
    
    const decorations = await Decoration.find();
    res.json(decorations);
  } catch (err) {
    console.error('Error fetching decorations:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Delete a decoration team by ID
const deleteDecorationTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const deletedTeam = await Decoration.findByIdAndDelete(teamId);
    
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Decoration team not found' });
    }
    
    res.status(200).json({ message: 'Decoration team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting decoration team', error });
  }
};

module.exports = { addDecorationTeam, getAllDecorations,getAllDecorations_user,deleteDecorationTeam };
