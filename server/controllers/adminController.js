const User = require('../models/userModel');

// Get all event organizers (both verified and unverified)
const getAllOrganisers = async (req, res) => {
    console.log("getAllOrganisers");

    try {
        // Fetch all users who are not admins
        const organisers = await User.find({ isAdmin: false });
        res.json(organisers);
    } catch (err) {
        console.error('Error fetching organisers:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Verify an event organizer by ID (toggle verification status)
const verifyOrganiser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const organiser = await User.findById(id);
        if (!organiser) {
            return res.status(404).json({ error: 'Organiser not found' });
        }

        // Toggle the isVerified field
        organiser.isVerified = !organiser.isVerified;
        await organiser.save();

        res.json({ message: `Organiser ${organiser.isVerified ? 'verified' : 'unverified'} successfully` });
    } catch (err) {
        console.error('Error verifying organiser:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getAllOrganisers, verifyOrganiser };
