import { useState } from 'react';
import { useLoanContext } from '../../../context/LoanContext';

import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import './addLoanModal.css';

const AddLoanModal = ({ open, onClose }) => {
  const { borrowers, addLoan } = useLoanContext();

  const [form, setForm] = useState({
    borrowerId: '',
    principal: '',
    interestRate: '',
    interestPeriod: 'monthly',
    interestType: 'flat',
    tenureValue: '',
    tenureUnit: 'month',
    disbursementDate: '',
    firstDueDate: '',
    purpose: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.borrowerId || !form.principal || !form.disbursementDate || !form.firstDueDate) {
      alert('Please fill required fields');
      return;
    }

    addLoan(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="add-loan-modal">
        {/* HEADER */}
        <div className="modal-header">
          <h3 className="modal-title">💰 Add Loan</h3>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <form className="loan-form">
            {/* Borrower */}
            <div className="form-field">
              <label>Borrower *</label>
              <select name="borrowerId" value={form.borrowerId} onChange={handleChange}>
                <option value="">Select Borrower</option>
                {borrowers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Disbursement Date */}
            <div className="form-field">
              <label>Disbursement Date *</label>
              <input
                type="date"
                name="disbursementDate"
                value={form.disbursementDate}
                onChange={handleChange}
              />
            </div>

            {/* Principal */}
            <div className="form-field">
              <label>Principal Amount *</label>
              <input
                type="number"
                name="principal"
                placeholder="Example: 50000"
                value={form.principal}
                onChange={handleChange}
              />
            </div>

            {/* Interest Rate */}
            <div className="form-field">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                name="interestRate"
                placeholder="Example: 2"
                value={form.interestRate}
                onChange={handleChange}
              />
            </div>

            {/* Interest Period */}
            <div className="form-field">
              <label>Interest Period</label>
              <select name="interestPeriod" value={form.interestPeriod} onChange={handleChange}>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Interest Type */}
            <div className="form-field">
              <label>Interest Type</label>
              <select name="interestType" value={form.interestType} onChange={handleChange}>
                <option value="flat">Flat</option>
                <option value="reducing">Reducing</option>
              </select>
            </div>

            {/* Tenure Value */}
            <div className="form-field">
              <label>Tenure Value</label>
              <input
                type="number"
                name="tenureValue"
                placeholder="Example: 12"
                value={form.tenureValue}
                onChange={handleChange}
              />
            </div>

            {/* Tenure Unit */}
            <div className="form-field">
              <label>Tenure Unit</label>
              <select name="tenureUnit" value={form.tenureUnit} onChange={handleChange}>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>

            {/* Loan Status */}
            <div className="form-field">
              <label>Loan Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Purpose */}
            <div className="form-field full-width">
              <label>Purpose / Remarks</label>
              <textarea
                name="purpose"
                placeholder="Optional remarks"
                value={form.purpose}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <Button text="Cancel" variant="outline" onClick={onClose} />
          <Button text="Save Loan" onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default AddLoanModal;
