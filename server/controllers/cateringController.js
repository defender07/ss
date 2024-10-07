const Catering = require('../models/cateringModel');

// Add Catering Team
const addCateringTeam = async (req, res) => {
  const { name, services, location, availableDates, contact,budget} = req.body;

  console.log(req.files);

  try {
    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

    const newCatering = new Catering({
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

    await newCatering.save();
    res.json({ message: 'Catering team added successfully' });
  } catch (err) {
    console.error('Error adding catering team:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Catering Teams
const getAllCaterings = async (req, res) => {
  try {
    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

    console.log("getAllCaterings");
    const caterings = await Catering.find({ organizerId });
    res.json(caterings);
  } catch (err) {
    console.error('Error fetching caterings:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllCaterings_user = async (req, res) => {
  try {
    const organizerId = req.user.userId; // Get the organizer ID from the logged-in user

    console.log("getAllCaterings");
    const caterings = await Catering.find();
    res.json(caterings);
  } catch (err) {
    console.error('Error fetching caterings:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addCateringTeam, getAllCaterings,getAllCaterings_user };
