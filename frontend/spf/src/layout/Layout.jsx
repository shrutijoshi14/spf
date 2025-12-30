import { useState } from 'react';
import Dashboard from '../pages/Dashboard.jsx';
import '../styles/layout.css'; // make sure to import the CSS
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const username = localStorage.getItem('full_name') || 'User';

  return (
    <div className={`app-container`}>
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`page-wrapper ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        {/* <Topbar username={username} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}

        <Topbar
          username={username}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="content-area">
          <Dashboard activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
