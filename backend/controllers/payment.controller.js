const paymentService = require('../services/payment.service');

exports.addPayment = async (req, res) => {
  try {
    const payment = await paymentService.addPayment(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await paymentService.getPayments(req.query.loan_id);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
