import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useBorrowerContext } from './BorrowerContext';
import { toast } from 'react-toastify';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { borrowers, fetchBorrowers } = useBorrowerContext();

  const API_URL = 'http://localhost:4000/api';

  const getAuthToken = () => localStorage.getItem('token');

  // ✅ Fetch all loans
  const fetchLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      if (!token) {
        setError('No authentication token found');
        setLoans([]);
        return;
      }

      const response = await axios.get(`${API_URL}/loans`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setLoans(response.data.data || []);
        setError(null);
        console.log('✅ Loans fetched:', response.data.data);
      }
    } catch (err) {
      console.error('❌ Fetch Loans Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch loans');
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add loan
  // ✅ Add loan
  const addLoan = async (loanData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error('No authentication token. Please login again.');
        return {
          success: false,
          message: 'No authentication token. Please login again.',
        };
      }

      console.log('📤 Sending loan data:', loanData);
      console.log('🔑 Token:', token);

      const response = await axios.post(`${API_URL}/loans`, loanData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Loan creation response:', response.data);

      if (response.data.success) {
        // Fetch fresh data from backend
        await fetchLoans();
        toast.success(response.data.message || 'Loan created successfully');
        return {
          success: true,
          message: response.data.message || 'Loan created successfully',
          data: response.data.data,
        };
      }
    } catch (err) {
      console.log('❌ Full Error Response:', err.response?.data);
      console.error('❌ Add Loan Error:', err);

      // ✅ Handle validation errors specifically
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((e) => `${e.field}: ${e.message}`)
          .join(', ');
        toast.error(errorMessages);
        return {
          success: false,
          message: errorMessages,
        };
      }

      const errorMessage = err.response?.data?.message || err.message || 'Failed to add loan';
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Load initial data
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchLoans();
      fetchBorrowers();
    }
  }, []);

  return (
    <LoanContext.Provider
      value={{
        loans,
        borrowers,
        loading,
        error,
        addLoan,
        fetchLoans,
        fetchBorrowers,
        setLoans,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within LoanProvider');
  }
  return context;
};
