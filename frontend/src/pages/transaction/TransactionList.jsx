import React from "react";
import { Edit, Trash2 } from "lucide-react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
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
                ₹{tx.amount.toLocaleString("en-IN")}
              </td>
              <td>{tx.paymentMethod}</td>
              <td>{tx.date}</td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline btn-warning">
                    <Edit size={18} />
                  </button>
                  <button className="btn btn-sm btn-outline btn-error">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-6">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
