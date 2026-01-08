const loanService = require('../services/loan.service');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await loanService.getAllLoans();
    res.json({ success: true, data: loans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const loan = await loanService.createLoan(req.body);
    res.status(201).json({
      success: true,
      message: 'Loan created successfully',
      data: loan,
    });
  } catch (err) {
    console.error('Create Loan Error:', err.message);
    res.status(400).json({
      success: false,
      message: err.message || 'Server error',
    });
  }
};
