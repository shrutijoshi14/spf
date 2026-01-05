// import Button from '../../../common/Button';

// const Buttons = ({ onAddBorrower, onAddLoan }) => {
//   return (
//     <div className="quick-actions">
//       <Button
//         onClick={onAddBorrower}
//         className="action-btn primary"
//         text={
//           <>
//             <span className="btn-icon">👤</span>
//             <span>Add Borrower</span>
//           </>
//         }
//       />

//       <Button
//         onClick={onAddLoan}
//         variant="outline"
//         className="action-btn secondary"
//         text={
//           <>
//             <span className="btn-icon">💰</span>
//             <span>Add Loan</span>
//           </>
//         }
//       />
//     </div>
//   );
// };

// export default Buttons;

import Button from '../../../common/Button';
import { useLoanContext } from '../../../context/LoanContext';
// import '../buttons.css';

const Buttons = ({ onAddBorrower, onAddLoan }) => {
  const { borrowers } = useLoanContext();

  const hasBorrowers = borrowers.length > 0;

  return (
    <div className="quick-actions">
      {/* ADD BORROWER */}
      <Button
        onClick={onAddBorrower}
        className="action-btn primary"
        text={
          <>
            <span className="btn-icon">👤</span>
            <span>Add Borrower</span>
          </>
        }
      />

      {/* ADD LOAN */}
      <Button
        onClick={onAddLoan}
        variant="outline"
        className="action-btn secondary"
        disabled={!hasBorrowers}
        text={
          <>
            <span className="btn-icon">💰</span>
            <span>Add Loan</span>
          </>
        }
      />

      {/* WARNING */}
      {!hasBorrowers && (
        <p className="borrower-warning">⚠️ Please add borrower first to create a loan</p>
      )}
    </div>
  );
};

export default Buttons;
