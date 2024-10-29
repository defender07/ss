const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const decorationRoutes = require('./routes/decorationRoutes');
const venueRoutes = require('./routes/venueRoutes');
const cateringRoutes = require('./routes/cateringRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Feedback routes
const feedbackRoutes_org = require('./routes/feedback_org'); // Feedback routes
const notificationsRoute = require('./routes/notifications'); // Feedback routes
// const notificationsRoute_new = require('./routes/notificationRoute'); // Feedback routes
const { createAdmin } = require('./controllers/authController');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' folder


app.use(cors({
  origin:true
})); // Enable CORS for cross-origin requests

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  createAdmin(); // Call createAdmin after successful MongoDB connection
})
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/decorations', decorationRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/caterings', cateringRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings_organiser', bookingRoutes); // Add this line to use the booking routes
app.use('/api/feedback', feedbackRoutes); // Use feedback routes
app.use('/api/feedback_org', feedbackRoutes_org); // Use feedback routes
app.use('/api/notifications',notificationsRoute ); // Use feedback routes
// app.use('/api/notifications/new',notificationsRoute_new ); // Use feedback routes




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
