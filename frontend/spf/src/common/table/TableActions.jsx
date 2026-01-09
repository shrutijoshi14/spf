import { Eye, IndianRupee } from 'lucide-react';

const TableActions = ({ row, onView, onEdit, onPay, onTopup, onDelete }) => {
  return (
    <div className="table-actions">
      <button className="icon view" title="View" onClick={() => onView(row)}>
        <Eye size={18} />
      </button>

      {/* <button className="icon edit" title="Edit" onClick={() => onEdit(row)}>
        <Edit size={18} />
      </button> */}

      <button className="icon pay" title="Pay Now" onClick={() => onPay(row)}>
        <IndianRupee size={18} />
      </button>

      {/* {<row className="activeLoans"></row> > 0 && (
        <>
          <button className="icon topup" title="Top Up" onClick={() => onTopup(row)}>
            <Plus size={18} />
          </button>
        </>
      )} */}

      {/* <button className="icon delete" title="Delete" onClick={() => onDelete(row)}>
        <Trash2 size={18} />
      </button> */}
    </div>
  );
};

export default TableActions;
