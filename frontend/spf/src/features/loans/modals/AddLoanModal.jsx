import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { useLoanContext } from '../../../context/LoanContext';

const AddLoanModal = ({ open, onClose }) => {
  const { borrowers, addLoan } = useLoanContext();

  const [form, setForm] = useState({
    borrowerId: '',
    principal: '',
    disbursementDate: '',
    interestRate: '',
    interestType: 'flat',
    tenureValue: '',
    tenureUnit: 'month',
    status: 'ACTIVE',
    purpose: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDueDate = (date, value, unit) => {
    if (!date || !value || !unit) return '';

    const d = new Date(date);
    const normalizedUnit = unit.toUpperCase();

    if (normalizedUnit === 'DAY') {
      d.setDate(d.getDate() + Number(value));
    } else if (normalizedUnit === 'WEEK') {
      d.setDate(d.getDate() + Number(value) * 7);
    } else if (normalizedUnit === 'MONTH') {
      d.setMonth(d.getMonth() + Number(value));
    }

    return d.toISOString().split('T')[0];
  };

  const dueDate = calculateDueDate(form.disbursementDate, form.tenureValue, form.tenureUnit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // ✅ Validation
      if (!form.borrowerId) {
        toast.error('Please select a borrower');
        return;
      }
      if (!form.principal) {
        toast.error('Please enter principal amount');
        return;
      }
      if (!form.disbursementDate) {
        toast.error('Please select disbursement date');
        return;
      }
      if (!form.tenureValue) {
        toast.error('Please enter tenure value');
        return;
      }
      if (!form.tenureUnit) {
        toast.error('Please select tenure unit');
        return;
      }

      // ✅ Prepare loan data with CORRECT types and case
      const loanData = {
        borrowerId: Number(form.borrowerId),
        principal: Number(form.principal),
        interestRate: form.interestRate ? Number(form.interestRate) : 0,
        tenureValue: Number(form.tenureValue),
        tenureUnit: form.tenureUnit.toLowerCase(),
        interestType: form.interestType.toLowerCase(),
        disbursementDate: form.disbursementDate,
        status: form.status || 'ACTIVE',
        purpose: form.purpose || '',
      };

      console.log('📤 Submitting loan data:', loanData);

      const result = await addLoan(loanData);

      if (result?.success) {
        // Reset form
        setForm({
          borrowerId: '',
          principal: '',
          disbursementDate: '',
          interestRate: '',
          interestType: 'flat',
          tenureValue: '',
          tenureUnit: 'month',
          status: 'ACTIVE',
          purpose: '',
        });

        onClose();
      }
      // ✅ Error toast is already shown in Context, no need to show again
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="add-loan-modal">
        <div className="modal-header">
          <h3 className="modal-title">💰 Add Loan</h3>
          <button
            className="modal-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form className="loan-form">
            {/* Borrower */}
            <div className="form-field">
              <label>Borrower *</label>
              <select
                name="borrowerId"
                value={form.borrowerId}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select Borrower</option>
                {borrowers && borrowers.length > 0 ? (
                  borrowers.map((b) => (
                    <option key={b.borrower_id} value={b.borrower_id}>
                      {b.full_name} ({b.mobile})
                    </option>
                  ))
                ) : (
                  <option disabled>No borrowers available</option>
                )}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                min="0"
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
                disabled={isSubmitting}
                min="0"
              />
            </div>

            {/* Interest Type */}
            <div className="form-field">
              <label>Interest Type</label>
              <select
                name="interestType"
                value={form.interestType}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="flat">Flat</option>
                <option value="compound">Compound</option>
              </select>
            </div>

            {/* Tenure Value */}
            <div className="form-field">
              <label>Tenure Value *</label>
              <input
                type="number"
                name="tenureValue"
                placeholder="Example: 12"
                value={form.tenureValue}
                onChange={handleChange}
                disabled={isSubmitting}
                min="1"
              />
            </div>

            {/* Tenure Unit */}
            <div className="form-field">
              <label>Tenure Unit *</label>
              <select
                name="tenureUnit"
                value={form.tenureUnit}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="form-field">
              <label>Due Date (Auto Calculated)</label>
              <input type="date" value={dueDate} readOnly />
            </div>

            {/* Status */}
            <div className="form-field">
              <label>Loan Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="ACTIVE">Active</option>
                <option value="CLOSED">Closed</option>
                <option value="OVERDUE">Overdue</option>
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
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <Button text="Cancel" variant="outline" onClick={onClose} disabled={isSubmitting} />
          <Button
            text={isSubmitting ? 'Saving...' : 'Save Loan'}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddLoanModal;
