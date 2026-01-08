// const authService = require('../services/auth.service');

// exports.signup = async (req, res) => {
//   try {
//     const message = await authService.signup(req.body);
//     res.json({ message });
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const data = await authService.login(req.body);
//     res.json(data);
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// };

// exports.profile = (req, res) => {
//   res.json(req.user);
// };

// exports.forgotPassword = async (req, res) => {
//   try {
//     const message = await authService.forgotPassword(req.body.email);
//     res.json({ message });
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const message = await authService.resetPassword(req.params.token, req.body.password);
//     res.json({ message });
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// };

const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const message = await authService.signup(req.body);
    res.status(201).json({ success: true, message });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.profile = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

exports.forgotPassword = async (req, res) => {
  try {
    const message = await authService.forgotPassword(req.body.email);
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const message = await authService.resetPassword(req.params.token, req.body.password);
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};
