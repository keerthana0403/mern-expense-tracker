import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import useExpenseRecords from "../../zustand/useExpenseRecords";
import useDeleteExpense from "../../hooks/useDeleteExpense";

const TransactionList = ({ transactions, setShowModal }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const { setRecordToUpdate } = useExpenseRecords();
  const { deleteExpenseRecord } = useDeleteExpense();

  const handleDeleteClick = (record) => {
    setRecordToDelete(record);
    setDeleteModal(true);
  };

  const handleEdit = (tx) => {
    setRecordToUpdate(tx);
    setShowModal(true);
  };
  const handleDelete = async () => {
    await deleteExpenseRecord(recordToDelete?._id);
    setDeleteModal(false);
  };
  const formatAmount = (amount) =>
    amount >= 10000000
      ? `₹${(amount / 10000000).toFixed(2)} Cr`
      : amount >= 100000
      ? `₹${(amount / 100000).toFixed(2)} Lakh`
      : amount >= 1000
      ? `₹${(amount / 1000).toFixed(2)} K`
      : `₹${amount}`;
  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra ">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>
                <span
                  className={`badge badge-soft ${
                    tx.type === "income" ? "badge-info" : "badge-warning"
                  }`}
                >
                  {tx.type}
                </span>
              </td>
              <td>{tx.category}</td>
              <td className="font-semibold text-gray-500">
                {formatAmount(tx.amount)}
              </td>
              <td>{tx.paymentMethod}</td>
              <td> {new Date(tx?.date).toLocaleDateString()}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-warning"
                    onClick={() => handleEdit(tx)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDeleteClick(tx)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <tr>
          <td colSpan={6} className="text-center text-gray-500 py-6">
            No transactions found.
          </td>
        </tr>
      )}
      {deleteModal && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete this transaction?
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TransactionList;
