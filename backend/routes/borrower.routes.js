const express = require('express');
const router = express.Router();

const borrowerController = require('../controllers/borrower.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
  validateCreateBorrower,
  validateUpdateBorrower,
} = require('../validators/borrower.validator');

router.get('/', authenticate, authorize('ADMIN', 'SUPERADMIN', 'STAFF'), borrowerController.getAll);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPERADMIN'),
  validateCreateBorrower,
  borrowerController.createBorrower
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPERADMIN'),
  validateUpdateBorrower,
  borrowerController.update
);

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), borrowerController.remove);

module.exports = router;
