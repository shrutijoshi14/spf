import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

import ForgotPassword from './pages/ForgetPassword';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import StaffDashboard from './pages/StaffDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

import { BorrowerProvider } from './context/BorrowerContext';
import { LoanProvider } from './context/LoanContext';

function App() {
  return (
    <Router>
      <BorrowerProvider>
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
      </BorrowerProvider>
    </Router>
  );
}

export default App;
