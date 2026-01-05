import { useState } from 'react';
import { useLoanContext } from '../../context/LoanContext';
import AddBorrowerModal from '../borrowers/modals/AddBorrowerModal';
import AddLoanModal from '../loans/modals/AddLoanModal';
import Buttons from './components/Buttons';
import Charts from './components/Charts';
import RecentActivity from './components/RecenetAcitvity';
import StatsCards from './components/StatsCards';
import './dashboard.css';

const DashboardPage = () => {
  const [openBorrowerModal, setOpenBorrowerModal] = useState(false);
  const [openLoanModal, setOpenLoanModal] = useState(false);

  const { addBorrower, addLoan } = useLoanContext();

  return (
    <div className="dashboard-page">
      {/* ✅ STANDARD HEADER */}
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">📊 Dashboard Overview</h2>
          <p className="page-subtitle">
            Track loans, EMI collections, borrowers, and recent activities at a glance.
          </p>
        </div>

        <div className="page-header-right">
          <Buttons
            onAddBorrower={() => setOpenBorrowerModal(true)}
            onAddLoan={() => setOpenLoanModal(true)}
          />
        </div>
      </div>

      <StatsCards />
      <Charts />
      <RecentActivity />

      {/* ✅ NOW CONNECTED TO CONTEXT */}
      <AddBorrowerModal
        open={openBorrowerModal}
        onClose={() => setOpenBorrowerModal(false)}
        onSave={addBorrower}
      />

      <AddLoanModal open={openLoanModal} onClose={() => setOpenLoanModal(false)} onSave={addLoan} />
    </div>
  );
};

export default DashboardPage;
