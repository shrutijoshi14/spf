import '../activityModal.css';

const ActivityModal = ({ isOpen, onClose, activity }) => {
  if (!isOpen || !activity) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h3>{activity.title}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="detail-row">
            <span className="label">Borrower Name</span>
            <span className="value">{activity.borrower}</span>
          </div>

          <div className="detail-row">
            <span className="label">Loan ID</span>
            <span className="value">{activity.refId}</span>
          </div>

          <div className="detail-row">
            <span className="label">Amount</span>
            <span className="value highlight">{activity.amount}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status</span>
            <span className={`status-badge ${activity.status}`}>{activity.status}</span>
          </div>

          <div className="detail-row">
            <span className="label">Date & Time</span>
            <span className="value">{activity.time}</span>
          </div>

          <div className="detail-row">
            <span className="label">Description</span>
            <span className="value">{activity.description}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
