import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../../../common/Modal';

const ViewLoanModal = ({ open, loanId, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!open || !loanId) return;

    const fetchDetails = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:4000/api/loans/${loanId}/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    };

    fetchDetails();
  }, [open, loanId]);

  if (!open || !data) return null;

  const { loan, payments, topups, penalties } = data;

  return (
    <Modal open={open} title="Loan Details" onClose={onClose}>
      <h4>Borrower Details</h4>
      <p>
        <b>Name:</b> {loan.full_name}
      </p>
      <p>
        <b>Mobile:</b> {loan.mobile}
      </p>

      <hr />

      <h4>Loan Summary</h4>
      <p>Principal: ₹{loan.principal_amount}</p>
      <p>Outstanding: ₹{loan.outstanding_amount}</p>
      <p>Status: {loan.status}</p>

      <hr />

      <h4>Payments</h4>
      {payments.length === 0
        ? 'No payments'
        : payments.map((p) => (
            <p key={p.payment_id}>
              ₹{p.payment_amount} ({p.payment_type})
            </p>
          ))}

      <h4>Topups</h4>
      {topups.length === 0
        ? 'No topups'
        : topups.map((t) => <p key={t.topup_id}>₹{t.topup_amount}</p>)}

      <h4>Penalties</h4>
      {penalties.length === 0
        ? 'No penalties'
        : penalties.map((p) => <p key={p.penalty_id}>₹{p.penalty_amount}</p>)}
    </Modal>
  );
};

export default ViewLoanModal;
