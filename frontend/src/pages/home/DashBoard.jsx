import React from "react";

const DashBoard = ({ setShowModal, income, expense, balance }) => {
  return (
    <>
      <div className="flex justify-end p-3">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm"
        >
          Add Transaction
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-green-100 text-green-900 shadow">
          <div className="card-body">
            <h2 className="card-title">💰 Income</h2>
            <p>₹{income}</p>
          </div>
        </div>
        <div className="card bg-red-100 text-red-900 shadow">
          <div className="card-body">
            <h2 className="card-title">💸 Expenses</h2>
            <p>₹{expense}</p>
          </div>
        </div>
        <div className="card bg-blue-100 text-blue-900 shadow">
          <div className="card-body">
            <h2 className="card-title">🧾 Balance</h2>
            <p>₹{balance}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
