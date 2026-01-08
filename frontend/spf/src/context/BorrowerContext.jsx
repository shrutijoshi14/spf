import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BorrowerContext = createContext();

export const BorrowerProvider = ({ children }) => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:4000/api';

  const getAuthToken = () => localStorage.getItem('token');

  // ✅ Fetch all borrowers
  const fetchBorrowers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      if (!token) {
        setError('No authentication token found');
        setBorrowers([]);
        return;
      }

      const response = await axios.get(`${API_URL}/borrowers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setBorrowers(response.data.data || []);
        setError(null);
        console.log('✅ Borrowers fetched:', response.data.data);
      }
    } catch (err) {
      console.error('❌ Fetch Borrowers Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch borrowers');
      setBorrowers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add borrower
  // ✅ Add borrower
  const addBorrower = async (borrowerData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error('No authentication token. Please login again.');
        return {
          success: false,
          message: 'No authentication token. Please login again.',
        };
      }

      console.log('📤 Sending borrower data:', borrowerData);
      console.log('🔑 Token:', token);

      const response = await axios.post(`${API_URL}/borrowers`, borrowerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Response:', response.data);

      if (response.data.success) {
        // Fetch fresh data from backend
        await fetchBorrowers();
        toast.success(response.data.message || 'Borrower added successfully');
        return {
          success: true,
          message: response.data.message || 'Borrower added successfully',
          data: response.data.data,
        };
      }
    } catch (err) {
      console.log('❌ Full Error Response:', err.response?.data);
      console.error('❌ Add Borrower Error:', err);

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

      const errorMessage = err.response?.data?.message || err.message || 'Failed to add borrower';
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Load borrowers on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchBorrowers();
    }
  }, []);

  return (
    <BorrowerContext.Provider
      value={{
        borrowers,
        loading,
        error,
        addBorrower,
        fetchBorrowers,
        setBorrowers,
      }}
    >
      {children}
    </BorrowerContext.Provider>
  );
};

export const useBorrowerContext = () => {
  const context = useContext(BorrowerContext);
  if (!context) {
    throw new Error('useBorrowerContext must be used within BorrowerProvider');
  }
  return context;
};
