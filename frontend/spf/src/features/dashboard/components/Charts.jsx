import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Charts = () => {
  const barData = {
    labels: ['Ramesh', 'Suresh', 'Anita', 'Pooja', 'Rahul'],
    datasets: [
      {
        label: 'Loan Amount (₹)',
        data: [50000, 70000, 30000, 90000, 60000],
        backgroundColor: '#9192e3ff',
        borderColor: '#76859aff',
        borderWidth: 2,
        borderRadius: 6, // ✅ small soft bars
      },
    ],
  };

  const pieData = {
    labels: ['Active', 'Closed', 'Overdues'],
    datasets: [
      {
        data: [78, 34, 16],
        backgroundColor: ['#7ddda0ff', '#828b98ff', '#e3b6b6ff'],
        borderColor: ['#22c55e', '#64748b', '#ef4444'],
        borderWidth: 2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#374151',
          font: {
            size: 13,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>📊 Monthly Loans</h3>
        <div className="chart-box">
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>

      <div className="chart-card">
        <h3>🥧 Loan Status</h3>
        <div className="chart-box">
          <Pie data={pieData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
