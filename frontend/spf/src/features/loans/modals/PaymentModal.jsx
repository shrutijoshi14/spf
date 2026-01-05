import { useState } from 'react';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import Select from '../../../common/Select';

const PaymentModal = ({ loan, onPay }) => {
  // ✅ HOOKS MUST BE INSIDE COMPONENT
  const [type, setType] = useState('EMI');
  const [amount, setAmount] = useState('');

  return (
    <Modal open title="Make Payment">
      <Select
        options={['EMI', 'PRINCIPAL', 'INTEREST', 'PENALTY', 'TOPUP']}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button
        text="Pay Now"
        onClick={() =>
          onPay({
            loanId: loan.id,
            type,
            amount: Number(amount),
          })
        }
      />
    </Modal>
  );
};

export default PaymentModal;
