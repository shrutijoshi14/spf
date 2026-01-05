import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBorrowerModal from '../borrowers/modals/AddBorrowerModal';
import Buttons from '../dashboard/components/Buttons';
import LoansTable from './components/LoansTable';
import './loans.css';
import AddLoanModal from './modals/AddLoanModal';

import { useLoanContext } from '../../context/LoanContext'; // ✅ ADD

const LoansPage = () => {
  const navigate = useNavigate();

  const { borrowers, addBorrower, addLoan } = useLoanContext(); // ✅ CONTEXT

  const [openBorrowerModal, setOpenBorrowerModal] = useState(false);
  const [openLoanModal, setOpenLoanModal] = useState(false);

  const handleView = (row) => navigate(`/loans/${row.id}`);
  const handleEdit = (row) => console.log('Edit Loan', row);
  const handleDelete = (row) => console.log('Delete later', row);
  const handlePay = (row) => console.log('Pay EMI', row);

  return (
    <div className="loans-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">💵 Loans</h2>
          <p className="page-subtitle">Manage borrowers, loans, and payments</p>
        </div>

        <div className="page-header-right">
          <Buttons
            onAddBorrower={() => setOpenBorrowerModal(true)}
            onAddLoan={() => setOpenLoanModal(true)}
          />
        </div>
      </div>

      {/* ✅ TABLE NOW USES CONTEXT DATA */}
      <LoansTable
        borrowers={borrowers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPay={handlePay}
      />

      <AddBorrowerModal
        open={openBorrowerModal}
        onClose={() => setOpenBorrowerModal(false)}
        onSave={addBorrower}
      />

      <AddLoanModal open={openLoanModal} onClose={() => setOpenLoanModal(false)} onSave={addLoan} />
    </div>
  );
};

export default LoansPage;
