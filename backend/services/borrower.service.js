const db = require('../db');

exports.getAll = async () => {
  const [rows] = await db.promise().query('SELECT * FROM borrowers WHERE status != "DISABLED"');
  return rows;
};

exports.createBorrower = async (data) => {
  const [existing] = await db
    .promise()
    .query('SELECT borrower_id FROM borrowers WHERE mobile = ? OR email = ?', [
      data.mobile,
      data.email,
    ]);

  if (existing.length > 0) {
    throw new Error('Borrower already exists with this mobile or email');
  }

  const [result] = await db.promise().query(
    `INSERT INTO borrowers
     (full_name, mobile, alternate_mobile, email,
      address_line1, address_line2, city, state, pincode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.fullName,
      data.mobile,
      data.alternateMobile || null,
      data.email || null,
      data.address1 || null,
      data.address2 || null,
      data.city || null,
      data.state || null,
      data.pinCode || null,
    ]
  );

  const borrowerId = result.insertId;

  if (data.guarantorName) {
    await db.promise().query(
      `INSERT INTO guarantors
        (borrower_id, name, mobile, address, relation)
        VALUES (?, ?, ?, ?, ?)`,
      [
        borrowerId,
        data.guarantorName,
        data.guarantorPhone || null,
        data.guarantorAddress || null,
        data.relation || null,
      ]
    );
  }

  return { borrowerId };
};

exports.update = async (id, data) => {
  await db.promise().query('UPDATE borrowers SET ? WHERE borrower_id=?', [data, id]);
};

exports.remove = async (id) => {
  await db.promise().query("UPDATE borrowers SET status='DISABLED' WHERE borrower_id=?", [id]);
};

exports.getAllBorrowers = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        borrower_id,
        full_name,
        mobile,
        address,
        created_at
      FROM borrowers
      ORDER BY borrower_id DESC
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ DB Error:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
