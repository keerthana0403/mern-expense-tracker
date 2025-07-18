import React from "react";
import Input from "./Input";
import Button from "./Button";

const ExpenseForm = () => {
  return (
    <form className="space-y-4 max-w-sm mb-4">
      {/* Date */}
      <div className="form-control">
        <label className="label font-semibold text-base-content/70 mb-2">
          <span className="label-text">Date</span>
        </label>
        <Input type="date" placeholder={"Date"} name={"date"} />
      </div>

      {/* Income or Expense */}
      <div className="form-control">
        <label className="label font-semibold text-base-content/70 mb-2">
          <span className="label-text">Expense or Income</span>
        </label>
        <select className="select select-bordered w-full">
          <option value="">Select</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category */}
      <div className="form-control">
        <label className="label font-semibold text-base-content/70 mb-2">
          <span className="label-text">Category</span>
        </label>

        <select className="select select-bordered w-full">
          <option value="">Select</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="gifts">Gifts</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Amount */}
      <div className="form-control">
        <label className="label font-semibold text-base-content/70 mb-2">
          <span className="label-text">Amount</span>
        </label>

        <Input
          type="number"
          step="0.01"
          name="amount"
          //   onBlur={(e) => {
          //     const value = parseFloat(e.target.value).toFixed(2);
          //   }}
        />
      </div>

      {/* Payment Method */}
      <div className="form-control">
        <label className="label font-semibold text-base-content/70 mb-2">
          <span className="label-text">Payment Method</span>
        </label>

        <select className="select select-bordered w-full">
          <option value="">Select</option>
          <option value="cash">Cash</option>
          <option value="credit card">Credit Card</option>
          <option value="debit card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="online">Online</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="btn btn-success w-full"
        children={"Add Record"}
      />
    </form>
  );
};

export default ExpenseForm;
