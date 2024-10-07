const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

// Hardcoded admin creation
const createAdmin = async () => {
  try {
    let admin = await User.findOne({ email: 'admin@admin.com' });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = new User({
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        isAdmin: true,
        isVerified: true, // Admins are verified by default
      });
      await admin.save();
      console.log('Admin created!');
    } else {
      console.log('Admin already exists!');
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  }
};

// Register normal user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      isVerified: true, // Automatically verified for normal users
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register event organiser
const registerOrganiser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      isVerified: false, // Event organisers are not verified by default
      isEventOrganiser: true
    });

    await user.save();
    res.status(201).json({ message: 'Event organiser registered. Awaiting admin verification.' });
  } catch (err) {
    console.error('Error registering organiser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user or organiser
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    const user = await User.findOne({ email });
    console.log("login user", user);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!user.isVerified && !user.isAdmin) {
      return res.status(403).json({ error: 'User not verified by admin' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      isAdmin: user.isAdmin,
      isEventOrganiser: user.isEventOrganiser, // Check if the user is a verified event organizer
      isVerified: user.isVerified
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createAdmin, registerUser, registerOrganiser, loginUser };
