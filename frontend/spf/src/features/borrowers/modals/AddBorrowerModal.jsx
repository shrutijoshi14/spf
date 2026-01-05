import { useState } from 'react';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import '../../../styles/modal.css';

const AddBorrowerModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pinCode: '',
    idProofType: '',
    idProofNumber: '',
    referredBy: '',
    guarantorName: '',
    guarantorPhone: '',
    guarantorAddress: '',
    relativesPhone: '',
    relation: '',
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const err = {};

    if (!form.fullName.trim()) err.fullName = 'Full name is required';

    if (!/^\d{10}$/.test(form.mobile)) err.mobile = 'Enter valid 10-digit mobile';

    if (form.alternateMobile && !/^\d{10}$/.test(form.alternateMobile))
      err.alternateMobile = 'Enter valid 10-digit mobile';

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Enter valid email address';

    if (form.pinCode && !/^\d{6}$/.test(form.pinCode)) err.pinCode = 'Pin code must be 6 digits';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="borrower-modal">
        {/* LEFT PHOTO */}
        <div className="borrower-profile">
          <label>
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
            <div className="photo-circle">
              {preview ? <img src={preview} alt="Borrower" /> : '👤'}
            </div>
          </label>
          <p className="upload-text">Upload Borrower Photo</p>
        </div>

        {/* FORM */}
        <div className="form-section">
          {/* BORROWER DETAILS */}
          <Section title="Personal Details">
            <div className="form-grid">
              <Input
                label="Full Name *"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <Input
                label="Mobile *"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                error={errors.mobile}
              />
              <Input
                label="Alternate Mobile"
                name="alternateMobile"
                value={form.alternateMobile}
                onChange={handleChange}
                error={errors.alternateMobile}
              />
              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Address Line 1"
                name="address1"
                value={form.address1}
                onChange={handleChange}
                full
              />
              <Input
                label="Address Line 2"
                name="address2"
                value={form.address2}
                onChange={handleChange}
                full
              />
              <Input label="City" name="city" value={form.city} onChange={handleChange} />
              <Input label="State" name="state" value={form.state} onChange={handleChange} />
              <Input
                label="Pin Code"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                error={errors.pinCode}
              />
            </div>
          </Section>

          {/* GUARANTOR */}
          <Section title="Guarantor Details">
            <div className="form-grid">
              <Input
                label="Guarantor Name"
                name="guarantorName"
                value={form.guarantorName}
                onChange={handleChange}
              />
              <Input
                label="Guarantor Phone"
                name="guarantorPhone"
                value={form.guarantorPhone}
                onChange={handleChange}
              />
              <Input
                label="Guarantor Address"
                name="guarantorAddress"
                value={form.guarantorAddress}
                onChange={handleChange}
                full
              />
            </div>
          </Section>

          {/* RELATIVES */}
          <Section title="Relative Details">
            <div className="form-grid">
              <Input
                label="Relative Phone"
                name="relativesPhone"
                value={form.relativesPhone}
                onChange={handleChange}
              />
              <Input
                label="Relation"
                name="relation"
                value={form.relation}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ACTIONS */}
          <div className="modal-actions">
            <Button text="Cancel" variant="outline" onClick={onClose} />
            <Button text="Save Borrower" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const Input = ({ label, error, full, ...props }) => (
  <div className={`form-field ${full ? 'full' : ''}`}>
    <label>{label}</label>
    <input {...props} />
    {error && <span className="error">{error}</span>}
  </div>
);

const Section = ({ title, children }) => (
  <div className="form-section-block">
    <h3 className="section-title">{title}</h3>
    {children}
  </div>
);

export default AddBorrowerModal;
