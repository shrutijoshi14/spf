import { useState } from 'react';
import { useLoanContext } from '../../context/LoanContext';
import AddBorrowerModal from '../borrowers/modals/AddBorrowerModal';
import Buttons from '../dashboard/components/Buttons';
import LoansTable from './components/LoansTable';
import './loans.css';
import AddLoanModal from './modals/AddLoanModal';
import PaymentModal from './modals/PaymentModal';
import ViewLoanModal from './modals/ViewLoanModal';

const LoansPage = () => {
  const { loans, borrowers, addBorrower, addLoan } = useLoanContext();

  const [openBorrowerModal, setOpenBorrowerModal] = useState(false);
  const [openLoanModal, setOpenLoanModal] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openPay, setOpenPay] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleView = (row) => {
    setSelectedLoan(row);
    setOpenView(true);
  };

  const handlePayClick = (row) => {
    setSelectedLoan(row);
    setOpenPay(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('💰 Payment Submit:', paymentData);
    setOpenPay(false);
  };

  return (
    <div className="loans-page">
      <div className="page-header">
        <div>
          <h2>💵 Loans</h2>
          <p>Manage borrowers, loans and payments</p>
        </div>

        <Buttons
          onAddBorrower={() => setOpenBorrowerModal(true)}
          onAddLoan={() => setOpenLoanModal(true)}
        />
      </div>

      <LoansTable onView={handleView} onPay={handlePayClick} />

      <AddBorrowerModal
        open={openBorrowerModal}
        onClose={() => setOpenBorrowerModal(false)}
        onSave={addBorrower}
      />

      <AddLoanModal open={openLoanModal} onClose={() => setOpenLoanModal(false)} onSave={addLoan} />

      {/* ✅ VIEW LOAN MODAL */}
      <ViewLoanModal
        open={openView}
        loanId={selectedLoan?.loan_id}
        onClose={() => setOpenView(false)}
      />

      {/* ✅ PAYMENT MODAL */}
      <PaymentModal
        open={openPay}
        loan={selectedLoan}
        onClose={() => setOpenPay(false)}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
};

export default LoansPage;
