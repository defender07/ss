// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Add feedback
exports.addFeedback = async (req, res) => {
  const { feedback, eventId, organiserId } = req.body; // Add organiserId to request body
  const userId = req.user.userId; // Assumes `req.user` contains authenticated user's info

  console.log("feedback user", req.user);
  

  try {
    const newFeedback = new Feedback({
      feedback:feedback.feedback,
      user: userId,
      name: req.user.name,
      eventId:feedback.eventid,
      organiserId:feedback.organiserid,
    });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback added successfully', feedback: newFeedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while adding feedback' });
  }
};

// Get feedbacks for a specific event
exports.getFeedbacks = async (req, res) => {
  const { eventId } = req.params;

  console.log("eventId", eventId);

  try {
    const feedbacks = await Feedback.find({ eventId }) // Populate user and organiser names
    // console.log("get feedbacks", feedbacks);
    
    
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while retrieving feedbacks' });
  }
};

// Get feedbacks for a specific organizer
exports.getFeedbacksByOrganizer = async (req, res) => {
  const organiserId  = req.user.userId;

  console.log("organiserId getfeedback", organiserId);
  

  try {
    const feedbacks = await Feedback.find({ organiserId:organiserId })
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while retrieving organizer feedbacks' });
  }
};
