const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

// Get all borrowers
router.get('/', authenticate, authorize('ADMIN', 'SUPERADMIN', 'STAFF'), (req, res) => {
  db.query(`SELECT * FROM borrowers`, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add borrower
router.post('/', authenticate, authorize('ADMIN', 'SUPERADMIN'), (req, res) => {
  const data = req.body;
  db.query(`INSERT INTO borrowers SET ?`, data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Borrower added', borrower_id: result.insertId });
  });
});

// Update borrower
router.put('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), (req, res) => {
  const borrower_id = req.params.id;
  db.query(`UPDATE borrowers SET ? WHERE borrower_id=?`, [req.body, borrower_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Borrower updated' });
  });
});

// Delete borrower (soft delete example)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), (req, res) => {
  const borrower_id = req.params.id;
  db.query(`UPDATE borrowers SET status='DISABLED' WHERE borrower_id=?`, [borrower_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Borrower disabled' });
  });
});

module.exports = router;
