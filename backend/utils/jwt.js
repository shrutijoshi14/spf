const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

module.exports = { generateToken };
