import DashboardPage from '../features/dashboard/DashboardPage';
import LoansPage from '../features/loans/LoansPage';
import PaymentsPage from '../features/payments/PaymentsPage';
import ReportsPage from '../features/reports/ReportsPage';
import SettingsPage from '../features/settings/SettingsPage';

const Dashboard = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardPage />;

    case 'loans':
      return <LoansPage />;

    case 'payments':
      return <PaymentsPage />;

    case 'reports':
      return <ReportsPage />;

    case 'settings':
      return <SettingsPage />;

    default:
      return <DashboardPage />;
  }
};

export default Dashboard;
