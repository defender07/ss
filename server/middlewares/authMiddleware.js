const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied, admin only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
