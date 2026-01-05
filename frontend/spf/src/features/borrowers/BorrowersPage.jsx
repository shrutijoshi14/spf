import Button from '../../common/Button';
import AddBorrowerModal from './modals/AddBorrowerModal';
import React from 'react'

const BorrowersPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button text="➕ Add Borrower" onClick={() => setOpen(true)} />
      <AddBorrowerModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default BorrowersPage
