import { FaCog, FaFileAlt, FaMoneyBillAlt, FaTachometerAlt } from 'react-icons/fa';
import '../styles/sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <a href="#">
          <img src="/spf_logo-removebg-preview.png" alt="SNP Finance Logo" className="logo-img" />
        </a>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>

        {isOpen}
      </div>
      <ul className="sidebar-menu">
        <li
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          <FaTachometerAlt />
          {isOpen && <span className="tab">Dashboard</span>}
        </li>
        <li className={activeTab === 'loans' ? 'active' : ''} onClick={() => setActiveTab('loans')}>
          <FaMoneyBillAlt />
          {isOpen && <span className="tab">Loans</span>}
        </li>
        <li
          className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          <FaFileAlt />
          {isOpen && <span className="tab">Payments</span>}
        </li>
        <li
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          <FaFileAlt />
          {isOpen && <span className="tab">Reports</span>}
        </li>
        <li
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog />
          {isOpen && <span className="tab">Settings</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
