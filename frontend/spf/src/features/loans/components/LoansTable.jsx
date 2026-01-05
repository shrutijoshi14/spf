import Table from '../../../common/table/Table';
import TableActions from '../../../common/table/TableActions';
import { useLoanContext } from '../../../context/LoanContext';

const LoansTable = ({ onView, onPay }) => {
  const { loans, borrowers } = useLoanContext();

  const getBorrowerName = (id) => borrowers.find((b) => b.id === id)?.fullName || '—';

  const columns = [
    { key: 'sr', label: 'Sr No', render: (_, i) => i + 1 },
    {
      key: 'borrower',
      label: 'Borrower Name',
      render: (row) => getBorrowerName(row.borrowerId),
    },
    { key: 'principal', label: 'Principal' },
    { key: 'interestRate', label: 'Interest %' },
    { key: 'outstanding', label: 'Outstanding' },
    { key: 'monthlyInterest', label: 'Monthly Interest' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <span className={`loan-status ${row.status}`}>{row.status}</span>,
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <TableActions onView={() => onView(row)} onPay={() => onPay(row)} hideEdit hideDelete />
      ),
    },
  ];

  return <Table columns={columns} data={loans} />;
};

export default LoansTable;
