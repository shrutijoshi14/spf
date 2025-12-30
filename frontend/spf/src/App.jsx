import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

import ForgotPassword from './pages/ForgetPassword';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import StaffDashboard from './pages/StaffDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Staff Dashboard */}
        <Route
          path="/staff/*"
          element={
            <Layout>
              <StaffDashboard />
            </Layout>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />

        {/* SuperAdmin Dashboard */}
        <Route
          path="/superadmin/*"
          element={
            <Layout>
              <SuperAdminDashboard />
            </Layout>
          }
        />

        {/* Main Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
