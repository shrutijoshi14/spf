const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const paymentController = require('../controllers/payment.controller');

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPERADMIN', 'STAFF'),
  paymentController.addPayment
);

router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPERADMIN', 'STAFF'),
  paymentController.getPayments
);

module.exports = router;
