const db = require('../db');

const calculateDueDate = (date, value, unit) => {
  const d = new Date(date);
  const normalizedUnit = unit.toUpperCase();

  if (normalizedUnit === 'DAY') {
    d.setDate(d.getDate() + value);
  } else if (normalizedUnit === 'WEEK') {
    d.setDate(d.getDate() + value * 7);
  } else if (normalizedUnit === 'MONTH') {
    d.setMonth(d.getMonth() + value);
  }

  return d.toISOString().split('T')[0];
};

// ✅ Get all loans
exports.getAllLoans = async () => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM loans ORDER BY loan_id DESC');
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

// ✅ Create loan
exports.createLoan = async (data) => {
  try {
    // Verify borrower exists
    const [borrower] = await db
      .promise()
      .query('SELECT borrower_id FROM borrowers WHERE borrower_id = ? AND status != "DISABLED"', [
        data.borrowerId,
      ]);

    if (!borrower.length) {
      throw new Error('Borrower not found or is disabled');
    }

    const dueDate = calculateDueDate(
      data.disbursementDate,
      Number(data.tenureValue),
      data.tenureUnit
    );

    const [result] = await db.promise().query(
      `INSERT INTO loans
      (
      borrower_id,
      disbursement_date,
      due_date,
      principal_amount,
      interest_rate,
      interest_type,
      tenure_value,
      tenure_unit,
      outstanding_amount,
      status,
      purpose
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.borrowerId,
        data.disbursementDate,
        dueDate,
        data.principal,
        data.interestRate || 0,
        data.interestType.toUpperCase(),
        data.tenureValue,
        data.tenureUnit.toUpperCase(),
        data.principal,
        data.status || 'ACTIVE',
        data.purpose || null,
      ]
    );

    return { loanId: result.insertId };
  } catch (err) {
    throw new Error(err.message);
  }
};
