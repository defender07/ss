const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = { generateToken };
