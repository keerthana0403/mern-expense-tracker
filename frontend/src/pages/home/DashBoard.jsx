import React from "react";
import Button from "../../components/Button";

const DashBoard = ({ setShowModal, income, expense, balance }) => {
  return (
    <>
      <div className="flex justify-end p-3 ">
        <Button
          onClick={() => setShowModal(true)}
          className="btn btn-accent btn-sm"
          children={"Add Transaction"}
        />
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="card text-white shadow"
          style={{ backgroundColor: "#2F5249" }}
        >
          <div className="card-body">
            <h2 className="card-title">💰 Income</h2>
            <p>₹{income.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div
          className="card text-emerald-950 shadow"
          style={{ backgroundColor: "#E3DE61" }}
        >
          <div className="card-body">
            <h2 className="card-title">💸 Expenses</h2>
            <p>₹{expense.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div
          className="card  text-white shadow"
          style={{ backgroundColor: "#437057" }}
        >
          <div className="card-body">
            <h2 className="card-title">🧾 Balance</h2>
            <p>₹{balance.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
