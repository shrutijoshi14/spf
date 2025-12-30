const StatsCards = () => {
  const stats = [
    { title: 'Total Loans', value: '₹ 1250000', icon: '💰', color: 'blue' },
    { title: 'Total Borrowers', value: '128', icon: '👥', color: 'green' },
    { title: 'Active Loans', value: '78', icon: '✅', color: 'purple' },
    { title: 'Closed Loans', value: '34', icon: '🔒', color: 'gray' },
    { title: 'Total Payments', value: '₹ 980000', icon: '💵', color: 'orange' },
    { title: 'Pending Dues', value: '₹ 120000', icon: '⚠️', color: 'red' },
    { title: 'Monthly Interest', value: '₹ 45500', icon: '📈', color: 'teal' },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, i) => (
        <div className={`stat-card ${item.color}`} key={i}>
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-text">
            <p>{item.title}</p>
            <h3>{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
