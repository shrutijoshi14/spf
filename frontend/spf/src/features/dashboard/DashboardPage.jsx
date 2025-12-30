import Buttons from './components/Buttons';
import Charts from './components/Charts';
import RecentActivity from './components/RecenetAcitvity';
import StatsCards from './components/StatsCards';
import './dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">📊 Dashboard Overview</h2>
      <p className="dashboard-subtitle">
        Track loans, EMI collections, borrowers, and recent activities at a glance.
      </p>
      <Buttons />
      <StatsCards />
      <Charts />
      <RecentActivity />
    </div>
  );
};

export default DashboardPage;
