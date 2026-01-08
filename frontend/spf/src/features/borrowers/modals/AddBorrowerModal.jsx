import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { useBorrowerContext } from '../../../context/BorrowerContext';
import '../../../styles/modal.css';

const AddBorrowerModal = ({ open, onClose }) => {
  const { addBorrower } = useBorrowerContext();

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
    guarantorName: '',
    guarantorPhone: '',
    guarantorAddress: '',
    relativesPhone: '',
    relation: '',
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error('Please fix validation errors');
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Prepare data - send to API
      const borrowerData = {
        fullName: form.fullName,
        mobile: form.mobile,
        alternateMobile: form.alternateMobile || '',
        email: form.email || '',
        address1: form.address1 || '',
        address2: form.address2 || '',
        city: form.city || '',
        state: form.state || '',
        pinCode: form.pinCode || '',
        guarantorName: form.guarantorName || '',
        guarantorPhone: form.guarantorPhone || '',
        guarantorAddress: form.guarantorAddress || '',
        relativesPhone: form.relativesPhone || '',
        relation: form.relation || '',
      };

      console.log('📤 Submitting borrower data:', borrowerData);

      const result = await addBorrower(borrowerData);

      if (result?.success) {
        // Reset form
        setForm({
          fullName: '',
          mobile: '',
          alternateMobile: '',
          email: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          pinCode: '',
          guarantorName: '',
          guarantorPhone: '',
          guarantorAddress: '',
          relativesPhone: '',
          relation: '',
          photo: null,
        });
        setPreview(null);
        setErrors({});
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
      <div className="modal-header sticky-header">
        <h2>👤 Add Borrower</h2>
        <button className="modal-close" onClick={onClose} disabled={isSubmitting}>
          <span>×</span>
        </button>
      </div>

      <div className="modal-body-scroll">
        <div className="borrower-modal">
          <div className="borrower-profile">
            <label>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={isSubmitting}
              />
              <div className="photo-circle">
                {preview ? <img src={preview} alt="Borrower" /> : '👤'}
              </div>
            </label>
            <p className="upload-text">Upload Borrower Photo</p>
          </div>

          <div className="form-section">
            <Section title="Personal Details">
              <div className="form-grid">
                <Input
                  label="Full Name *"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  disabled={isSubmitting}
                />
                <Input
                  label="Mobile *"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  disabled={isSubmitting}
                />
                <Input
                  label="Alternate Mobile"
                  name="alternateMobile"
                  value={form.alternateMobile}
                  onChange={handleChange}
                  error={errors.alternateMobile}
                  disabled={isSubmitting}
                />
                <Input
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isSubmitting}
                />
                <Input
                  label="Address Line 1"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  full
                  disabled={isSubmitting}
                />
                <Input
                  label="Address Line 2"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  full
                  disabled={isSubmitting}
                />
                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  label="Pin Code"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  error={errors.pinCode}
                  disabled={isSubmitting}
                />
              </div>
            </Section>

            <Section title="Guarantor Details">
              <div className="form-grid">
                <Input
                  label="Guarantor Name"
                  name="guarantorName"
                  value={form.guarantorName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  label="Guarantor Phone"
                  name="guarantorPhone"
                  value={form.guarantorPhone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  label="Guarantor Address"
                  name="guarantorAddress"
                  value={form.guarantorAddress}
                  onChange={handleChange}
                  full
                  disabled={isSubmitting}
                />
              </div>
            </Section>

            <Section title="Relative Details">
              <div className="form-grid">
                <Input
                  label="Relative Phone"
                  name="relativesPhone"
                  value={form.relativesPhone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  label="Relation"
                  name="relation"
                  value={form.relation}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>

      <div className="modal-footer sticky-footer">
        <div className="modal-actions">
          <Button text="Cancel" variant="outline" onClick={onClose} disabled={isSubmitting} />
          <Button
            text={isSubmitting ? 'Saving...' : 'Save Borrower'}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </Modal>
  );
};

const Input = ({ label, error, full, disabled, ...props }) => (
  <div className={`form-field ${full ? 'full' : ''}`}>
    <label>{label}</label>
    <input {...props} disabled={disabled} />
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
