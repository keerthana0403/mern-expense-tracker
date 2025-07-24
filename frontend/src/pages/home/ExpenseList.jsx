import React from "react";

const ExpenseList = ({ records }) => {
  return (
    <div className="mt-3 space-y-4 mb-5 px-4">
      <p className="text-base-content/70">Your Recent Transactions</p>
      {/* you have 2 incomes and 23 expenses this month */}
      {records.map((record) => (
        <div key={record._id} className="card shadow-sm bg-base-200">
          <div className="card-body p-2 flex flex-row items-center justify-center">
            {/* Income/Expense Label */}
            <div className="w-full mb-2 ">
              <span
                className={`badge badge-lg ${
                  record.type === "income"
                    ? "bg-cyan-950 text-white"
                    : "bg-amber-300 text-black"
                }`}
              >
                {record.type}
              </span>
            </div>

            {/* Category & Payment Method */}
            <div className="w-full mb-2">
              <p className="font-semibold text-base-content">
                {record.category}
              </p>
              <p className="text-xs text-base-content/60">
                {record.paymentMethod}
              </p>
            </div>

            {/* Amount & Date */}
            <div className="w-full mb-2 ">
              <p className="font-semibold text-base-content">{record.amount}</p>
              <p className="text-xs text-base-content/60">
                {new Date(record?.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
