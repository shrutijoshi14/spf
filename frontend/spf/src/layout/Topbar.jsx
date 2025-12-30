import '../styles/topbar.css';

const Topbar = ({ username, toggleSidebar, isSidebarOpen }) => {
  return (
    <div className={'topbar'}>
      {/* Left (Logo) */}
      <div className="topbar-left">
        {/* Mobile toggle only when sidebar is hidden */}
        {!isSidebarOpen && (
          <button className="mobile-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        )}
      </div>

      {/* Center (App Name) */}
      <div className="topbar-center">
        <a href="/">
          <img src="/spf_logo-removebg-preview.png" alt="SNP Finance Logo" className="logo-img" />
        </a>
        <h1>SNP Finance</h1>
      </div>

      {/* Right (Notifications, Welcome, Profile) */}
      <div className="topbar-right">
        {/* Notification */}
        <div className="icon-wrapper">
          <span className="icon">🔔</span>
          <div className="dropdown">
            <p className="dropdown-title">Notifications</p>
            <p className="dropdown-item">📌 New loan application</p>
            <p className="dropdown-item">💰 EMI received</p>
            <p className="dropdown-item">⚠️ Payment pending</p>
          </div>
        </div>

        {/* Welcome Username */}
        <span className="welcome-text">Welcome! {username}</span>

        {/* Profile */}
        <div className="icon-wrapper">
          <span className="icon">👤</span>
          <div className="dropdown">
            <p className="dropdown-title">My Account</p>
            <p className="dropdown-item">Profile</p>
            <p className="dropdown-item">Settings</p>
            <p className="dropdown-item logout">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
