const db = require('../db');

exports.addPayment = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO payments (loan_id, amount, payment_date)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [data.loan_id, data.amount, data.payment_date], (err, result) => {
      if (err) return reject(err);
      resolve({ payment_id: result.insertId, ...data });
    });
  });
};

exports.getPayments = (loanId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM payments`;
    let params = [];

    if (loanId) {
      sql += ` WHERE loan_id = ?`;
      params.push(loanId);
    }

    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};
