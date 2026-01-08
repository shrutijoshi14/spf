// const db = require('../db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { generateToken } = require('../utils/jwt');

// exports.signup = async ({ full_name, email, mobile, password, role }) => {
//   const [existing] = await db.promise().query('SELECT * FROM users WHERE email=?', [email]);

//   if (existing.length) {
//     throw { status: 400, message: 'User already exists' };
//   }

//   const hash = await bcrypt.hash(password, 10);

//   await db
//     .promise()
//     .query('INSERT INTO users (full_name,email,mobile,password,role) VALUES (?,?,?,?,?)', [
//       full_name,
//       email,
//       mobile,
//       hash,
//       role,
//     ]);

//   return 'Signup successful';
// };

// exports.login = async ({ email, password }) => {
//   const [users] = await db.promise().query('SELECT * FROM users WHERE email=?', [email]);

//   if (!users.length) {
//     throw { status: 400, message: 'Invalid email/password' };
//   }

//   const user = users[0];
//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     throw { status: 400, message: 'Invalid email/password' };
//   }

//   const token = generateToken(user);

//   return {
//     token,
//     role: user.role,
//     full_name: user.full_name,
//   };
// };

// exports.forgotPassword = async (email) => {
//   const [users] = await db.promise().query('SELECT * FROM users WHERE email=?', [email]);

//   if (!users.length) {
//     throw { status: 404, message: 'User not found' };
//   }

//   const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   await db
//     .promise()
//     .query(
//       'UPDATE users SET reset_token=?, reset_token_expiry=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email=?',
//       [token, email]
//     );

//   return 'Reset link sent to email';
// };

// exports.resetPassword = async (token, password) => {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const [users] = await db
//     .promise()
//     .query('SELECT * FROM users WHERE email=? AND reset_token=? AND reset_token_expiry > NOW()', [
//       decoded.email,
//       token,
//     ]);

//   if (!users.length) {
//     throw { status: 400, message: 'Invalid or expired token' };
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   await db
//     .promise()
//     .query('UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE email=?', [
//       hashed,
//       decoded.email,
//     ]);

//   return 'Password reset successful';
// };

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt');

exports.signup = async ({ full_name, email, mobile, password, role }) => {
  const [existing] = await db.promise().query('SELECT * FROM users WHERE email=?', [email]);

  if (existing.length) {
    throw { status: 400, message: 'User already exists with this email' };
  }

  const hash = await bcrypt.hash(password, 10);

  await db
    .promise()
    .query('INSERT INTO users (full_name,email,mobile,password,role) VALUES (?,?,?,?,?)', [
      full_name,
      email,
      mobile,
      hash,
      role,
    ]);

  return 'Signup successful';
};

exports.login = async ({ email, password }) => {
  const [users] = await db.promise().query('SELECT * FROM users WHERE email=?', [email]);

  if (!users.length) {
    throw { status: 400, message: 'Invalid email or password' };
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 400, message: 'Invalid email or password' };
  }

  const token = generateToken(user);

  return {
    token,
    role: user.role,
    full_name: user.full_name,
    userId: user.user_id,
  };
};

exports.forgotPassword = async (email) => {
  const [users] = await db.promise().query('SELECT * FROM users WHERE email=?', [email]);

  if (!users.length) {
    throw { status: 404, message: 'User not found' };
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  await db
    .promise()
    .query(
      'UPDATE users SET reset_token=?, reset_token_expiry=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email=?',
      [token, email]
    );

  return 'Reset link sent to email';
};

exports.resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db
      .promise()
      .query('SELECT * FROM users WHERE email=? AND reset_token=? AND reset_token_expiry > NOW()', [
        decoded.email,
        token,
      ]);

    if (!users.length) {
      throw { status: 400, message: 'Invalid or expired token' };
    }

    const hashed = await bcrypt.hash(password, 10);

    await db
      .promise()
      .query(
        'UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE email=?',
        [hashed, decoded.email]
      );

    return 'Password reset successful';
  } catch (err) {
    throw { status: 400, message: 'Invalid or expired token' };
  }
};
