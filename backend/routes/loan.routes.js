const express = require('express');
const router = express.Router();

const loanController = require('../controllers/loan.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { validateCreateLoan } = require('../validators/loan.validator');

// ✅ Get all loans
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPERADMIN', 'STAFF'),
  loanController.getAllLoans
);

// ✅ Create loan
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPERADMIN'),
  validateCreateLoan,
  loanController.createLoan
);

module.exports = router;
