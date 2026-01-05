import { createContext, useContext, useState } from 'react';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [borrowers, setBorrowers] = useState([]);
  const [loans, setLoans] = useState([]);

  // ➕ ADD BORROWER (FULL FORM SUPPORT)
  const addBorrower = (formData) => {
    const newBorrower = {
      id: Date.now(),

      photo: formData.photo || null,
      fullName: formData.fullName,
      mobile: formData.mobile,
      alternateMobile: formData.alternateMobile || '',
      email: formData.email || '',

      address1: formData.address1 || '',
      address2: formData.address2 || '',
      city: formData.city || '',
      state: formData.state || '',
      pinCode: formData.pinCode || '',

      guarantorName: formData.guarantorName || '',
      guarantorPhone: formData.guarantorPhone || '',
      guarantorAddress: formData.guarantorAddress || '',

      relativesPhone: formData.relativesPhone || '',
      relation: formData.relation || '',

      // SYSTEM
      totalLoans: 0,
      activeLoans: 0,
      closedLoans: 0,
      totalLoanAmount: 0,
      pendingAmount: 0,
      paidAmount: 0,

      createdAt: new Date(),
    };

    setBorrowers((prev) => [...prev, newBorrower]);
    return newBorrower.id;
  };

  // ➕ ADD LOAN (CONNECTED TO BORROWER)
  const addLoan = (loanData) => {
    const borrowerIndex = borrowers.findIndex((b) => b.id === Number(loanData.borrowerId));

    if (borrowerIndex === -1) {
      alert('Please add borrower first');
      return;
    }

    const principal = Number(loanData.principal);
    const interestRate = Number(loanData.interestRate);
    const tenureValue = Number(loanData.tenureValue);

    const monthlyInterest =
      loanData.interestPeriod === 'monthly'
        ? (principal * interestRate) / 100
        : loanData.interestPeriod === 'yearly'
        ? (principal * interestRate) / 1200
        : (principal * interestRate) / 3000;

    const newLoan = {
      id: Date.now(),
      borrowerId: Number(loanData.borrowerId),

      principal,
      interestRate,
      interestPeriod: loanData.interestPeriod,
      interestType: loanData.interestType,

      tenureValue,
      tenureUnit: loanData.tenureUnit,

      disbursementDate: loanData.disbursementDate,
      purpose: loanData.purpose,

      outstanding: principal,
      monthlyInterest,

      status: loanData.status || 'active', // ✅ FIXED

      createdAt: new Date(),
    };

    setLoans((prev) => [...prev, newLoan]);

    const updatedBorrowers = [...borrowers];
    updatedBorrowers[borrowerIndex] = {
      ...updatedBorrowers[borrowerIndex],
      totalLoans: updatedBorrowers[borrowerIndex].totalLoans + 1,
      activeLoans:
        newLoan.status === 'active'
          ? updatedBorrowers[borrowerIndex].activeLoans + 1
          : updatedBorrowers[borrowerIndex].activeLoans,
      totalLoanAmount: updatedBorrowers[borrowerIndex].totalLoanAmount + principal,
      pendingAmount: updatedBorrowers[borrowerIndex].pendingAmount + principal,
    };

    setBorrowers(updatedBorrowers);
  };

  return (
    <LoanContext.Provider
      value={{
        borrowers,
        loans,
        addBorrower,
        addLoan,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => useContext(LoanContext);
