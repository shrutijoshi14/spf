import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // dummy auth

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the child components
  return children;
};

export default ProtectedRoute;
