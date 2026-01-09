// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import Button from '../../../common/Button';
// import Modal from '../../../common/Modal';
// import { useLoanContext } from '../../../context/LoanContext';

// const AddLoanModal = ({ open, onClose }) => {
//   const { borrowers, addLoan } = useLoanContext();

//   const [form, setForm] = useState({
//     borrowerId: '',
//     principal: '',
//     disbursementDate: '',
//     interestRate: '',
//     interestType: 'flat',
//     tenureValue: '',
//     tenureUnit: 'month',
//     status: 'ACTIVE',
//     purpose: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const calculateDueDate = (date, value, unit) => {
//     if (!date || !value || !unit) return '';

//     const d = new Date(date);
//     const normalizedUnit = unit.toUpperCase();

//     if (normalizedUnit === 'DAY') {
//       d.setDate(d.getDate() + Number(value));
//     } else if (normalizedUnit === 'WEEK') {
//       d.setDate(d.getDate() + Number(value) * 7);
//     } else if (normalizedUnit === 'MONTH') {
//       d.setMonth(d.getMonth() + Number(value));
//     }

//     return d.toISOString().split('T')[0];
//   };

//   const dueDate = calculateDueDate(form.disbursementDate, form.tenureValue, form.tenureUnit);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       setIsSubmitting(true);

//       // ✅ Validation
//       if (!form.borrowerId) {
//         toast.error('Please select a borrower');
//         return;
//       }
//       if (!form.principal) {
//         toast.error('Please enter principal amount');
//         return;
//       }
//       if (!form.disbursementDate) {
//         toast.error('Please select disbursement date');
//         return;
//       }
//       if (!form.tenureValue) {
//         toast.error('Please enter tenure value');
//         return;
//       }
//       if (!form.tenureUnit) {
//         toast.error('Please select tenure unit');
//         return;
//       }

//       // ✅ Prepare loan data with CORRECT types and case
//       const loanData = {
//         borrowerId: Number(form.borrowerId),
//         principal: Number(form.principal),
//         interestRate: form.interestRate ? Number(form.interestRate) : 0,
//         tenureValue: Number(form.tenureValue),
//         tenureUnit: form.tenureUnit.toLowerCase(),
//         interestType: form.interestType.toLowerCase(),
//         disbursementDate: form.disbursementDate,
//         status: form.status || 'ACTIVE',
//         purpose: form.purpose || '',
//       };

//       console.log('📤 Submitting loan data:', loanData);

//       const result = await addLoan(loanData);

//       if (result?.success) {
//         // Reset form
//         setForm({
//           borrowerId: '',
//           principal: '',
//           disbursementDate: '',
//           interestRate: '',
//           interestType: 'flat',
//           tenureValue: '',
//           tenureUnit: 'month',
//           status: 'ACTIVE',
//           purpose: '',
//         });

//         onClose();
//       }
//       // ✅ Error toast is already shown in Context, no need to show again
//     } catch (err) {
//       console.error('Submit error:', err);
//       toast.error('An error occurred. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <div className="add-loan-modal">
//         <div className="modal-header">
//           <h3 className="modal-title">💰 Add Loan</h3>
//           <button
//             className="modal-close-btn"
//             onClick={onClose}
//             disabled={isSubmitting}
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="modal-body">
//           <form className="loan-form">
//             {/* Borrower */}
//             <div className="form-field">
//               <label>Borrower *</label>
//               <select
//                 name="borrowerId"
//                 value={form.borrowerId}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//               >
//                 <option value="">Select Borrower</option>
//                 {borrowers && borrowers.length > 0 ? (
//                   borrowers.map((b) => (
//                     <option key={b.borrower_id} value={b.borrower_id}>
//                       {b.full_name}
//                     </option>
//                   ))
//                 ) : (
//                   <option disabled>No borrowers available</option>
//                 )}
//               </select>
//             </div>

//             {/* Disbursement Date */}
//             <div className="form-field">
//               <label>Disbursement Date *</label>
//               <input
//                 type="date"
//                 name="disbursementDate"
//                 value={form.disbursementDate}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//               />
//             </div>

//             {/* Principal */}
//             <div className="form-field">
//               <label>Principal Amount *</label>
//               <input
//                 type="number"
//                 name="principal"
//                 placeholder="Example: 50000"
//                 value={form.principal}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//                 min="0"
//               />
//             </div>

//             {/* Interest Rate */}
//             <div className="form-field">
//               <label>Interest Rate (%)</label>
//               <input
//                 type="number"
//                 name="interestRate"
//                 placeholder="Example: 2"
//                 value={form.interestRate}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//                 min="0"
//               />
//             </div>

//             {/* Interest Type */}
//             <div className="form-field">
//               <label>Interest Type</label>
//               <select
//                 name="interestType"
//                 value={form.interestType}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//               >
//                 <option value="flat">Flat</option>
//                 <option value="compound">Compound</option>
//               </select>
//             </div>

//             {/* Tenure Value */}
//             <div className="form-field">
//               <label>Tenure Value *</label>
//               <input
//                 type="number"
//                 name="tenureValue"
//                 placeholder="Example: 12"
//                 value={form.tenureValue}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//                 min="1"
//               />
//             </div>

//             {/* Tenure Unit */}
//             <div className="form-field">
//               <label>Tenure Unit *</label>
//               <select
//                 name="tenureUnit"
//                 value={form.tenureUnit}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//               >
//                 <option value="day">Day</option>
//                 <option value="week">Week</option>
//                 <option value="month">Month</option>
//               </select>
//             </div>

//             {/* Due Date */}
//             <div className="form-field">
//               <label>Due Date (Auto Calculated)</label>
//               <input type="date" value={dueDate} readOnly />
//             </div>

//             {/* Status */}
//             <div className="form-field">
//               <label>Loan Status</label>
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//               >
//                 <option value="ACTIVE">Active</option>
//                 <option value="CLOSED">Closed</option>
//                 <option value="OVERDUE">Overdue</option>
//               </select>
//             </div>

//             {/* Purpose */}
//             <div className="form-field full-width">
//               <label>Purpose / Remarks</label>
//               <textarea
//                 name="purpose"
//                 placeholder="Optional remarks"
//                 value={form.purpose}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//               />
//             </div>
//           </form>
//         </div>

//         <div className="modal-footer">
//           <Button text="Cancel" variant="outline" onClick={onClose} disabled={isSubmitting} />
//           <Button
//             text={isSubmitting ? 'Saving...' : 'Save Loan'}
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default AddLoanModal;

import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { useLoanContext } from '../../../context/LoanContext';
import '../../../styles/modal.css';

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
    if (unit === 'day') d.setDate(d.getDate() + Number(value));
    if (unit === 'week') d.setDate(d.getDate() + Number(value) * 7);
    if (unit === 'month') d.setMonth(d.getMonth() + Number(value));
    return d.toISOString().split('T')[0];
  };

  const dueDate = calculateDueDate(form.disbursementDate, form.tenureValue, form.tenureUnit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!form.borrowerId) return toast.error('Select borrower');
      if (!form.principal) return toast.error('Enter principal');
      if (!form.disbursementDate) return toast.error('Select date');
      if (!form.tenureValue) return toast.error('Enter tenure');

      const loanData = {
        borrowerId: Number(form.borrowerId),
        principal: Number(form.principal),
        interestRate: Number(form.interestRate || 0),
        interestType: form.interestType,
        tenureValue: Number(form.tenureValue),
        tenureUnit: form.tenureUnit,
        disbursementDate: form.disbursementDate,
        status: form.status,
        purpose: form.purpose,
      };

      const res = await addLoan(loanData);
      if (res?.success) onClose();
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {/* HEADER */}
      <div className="modal-header sticky-header">
        <h2>💰 Add Loan</h2>
        <button className="modal-close" onClick={onClose} disabled={isSubmitting}>
          <span>×</span>
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body-scroll">
        <div className="form-section">
          <Section title="Loan Details">
            <div className="form-grid">
              <Field label="Borrower *">
                <select
                  name="borrowerId"
                  value={form.borrowerId}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select Borrower</option>
                  {borrowers?.map((b) => (
                    <option key={b.borrower_id} value={b.borrower_id}>
                      {b.full_name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Disbursement Date *">
                <input
                  type="date"
                  name="disbursementDate"
                  value={form.disbursementDate}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field label="Principal Amount *">
                <input
                  type="number"
                  name="principal"
                  value={form.principal}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  required
                />
              </Field>

              <Field label="Interest Rate (%) *">
                <input
                  type="number"
                  name="interestRate"
                  value={form.interestRate}
                  onChange={handleChange}
                  placeholder="e.g., 4"
                  required
                />
              </Field>

              <Field label="Interest Type *">
                <select
                  required
                  name="interestType"
                  value={form.interestType}
                  onChange={handleChange}
                  placeholder="Select Interest Type"
                >
                  <option value="flat">Flat</option>
                  <option value="reducing">Reducing</option>
                </select>
              </Field>

              <Field label="Tenure Value *">
                <input
                  type="number"
                  name="tenureValue"
                  value={form.tenureValue}
                  onChange={handleChange}
                  placeholder="eg., 12"
                  required
                />
              </Field>

              <Field label="Tenure Unit *">
                <select required name="tenureUnit" value={form.tenureUnit} onChange={handleChange}>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </Field>

              <Field label="Due Date">
                <input type="date" value={dueDate} readOnly />
              </Field>

              <Field label="Status *">
                <select required name="status" value={form.status} onChange={handleChange}>
                  <option value="ACTIVE">Active</option>
                  <option value="CLOSED">Closed</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </Field>

              <Field label="Purpose" full>
                <textarea
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  placeholder="Reason of Loan e.g., Personal Loan"
                />
              </Field>
            </div>
          </Section>
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer sticky-footer">
        <div className="modal-actions">
          <Button text="Cancel" variant="outline" onClick={onClose} />
          <Button text={isSubmitting ? 'Saving...' : 'Save Loan'} onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

/* 🔹 Reusable helpers (same pattern as borrower) */
const Field = ({ label, full, children }) => (
  <div className={`form-field ${full ? 'full' : ''}`}>
    <label>{label}</label>
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="form-section-block">
    <h3 className="section-title">{title}</h3>
    {children}
  </div>
);

export default AddLoanModal;
