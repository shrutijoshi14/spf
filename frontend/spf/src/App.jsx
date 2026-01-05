import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

import Dashboard from './pages/Dashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

import { LoanProvider } from './context/LoanContext';

function App() {
  return (
    <Router>
      <LoanProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Main Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          {/* Staff */}
          <Route
            path="/staff/*"
            element={
              <Layout>
                <StaffDashboard />
              </Layout>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/*"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />

          {/* Super Admin */}
          <Route
            path="/superadmin/*"
            element={
              <Layout>
                <SuperAdminDashboard />
              </Layout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LoanProvider>
    </Router>
  );
}

export default App;
