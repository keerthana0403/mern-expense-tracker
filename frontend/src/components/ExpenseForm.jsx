import Input from "./Input";
import Button from "./Button";
import { categories } from "../constants/categories";
import { useEffect, useState } from "react";
import useAddExpense from "../hooks/useAddExpense.js";
import useExpenseRecords from "../zustand/useExpenseRecords.js";
import useUpdateExpense from "../hooks/useUpdateExpense.js";
import toast from "react-hot-toast";

const ExpenseForm = ({ setShowModal, edit }) => {
  const [inputs, setInputs] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    paymentMethod: "",
    date: "",
  });

  const { loading, addExpenseRecord } = useAddExpense();
  const { recordToUpdate, setRecordToUpdate } = useExpenseRecords();
  const { loading: editLoading, updateExpenseRecord } = useUpdateExpense();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const filteredCategories = categories.filter((c) => c.type === inputs.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(inputs.amount) > 999999) {
      toast.error("Amount too large. Please enter a value below ₹10 lakh.");
      return;
    }
    if (edit)
      await updateExpenseRecord(recordToUpdate?._id, inputs, setShowModal);
    else await addExpenseRecord(inputs, setShowModal);
  };

  useEffect(() => {
    if (edit && recordToUpdate) {
      setInputs({
        title: recordToUpdate.title || "",
        amount: recordToUpdate.amount || "",
        type: recordToUpdate.type || "",
        category: recordToUpdate.category || "",
        paymentMethod: recordToUpdate.paymentMethod || "",
        date: recordToUpdate.date?.split("T")[0] || "",
      });
    } else {
      setInputs({
        title: "",
        amount: "",
        type: "",
        category: "",
        paymentMethod: "",
        date: "",
      });
    }
  }, [recordToUpdate, edit]);

  return (
    <dialog id="add_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg"> Add Transaction</h3>
        <form className="py-4 flex flex-col gap-3">
          <select
            className="select select-bordered w-full"
            name="type"
            value={inputs.type}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Amount"
            max="999999"
            className="input input-bordered w-full"
            name="amount"
            value={inputs.amount}
            onChange={handleInputChange}
          />
          <select
            className="select select-bordered w-full"
            name="category"
            value={inputs.category}
            onChange={handleInputChange}
            disabled={!inputs.type}
          >
            <option value="">Select</option>

            {filteredCategories.map((opt) => (
              <option value={opt.name} key={opt.name}>
                {opt.icon} {opt.name}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered w-full"
            name="paymentMethod"
            value={inputs.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="cash">Cash</option>
            <option value="credit card">Credit Card</option>
            <option value="debit card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="online">Online</option>
            <option value="others">Others</option>
          </select>
          <input
            type="date"
            className="input input-bordered w-full"
            name="date"
            value={inputs.date}
            onChange={handleInputChange}
          />

          <div className="modal-action">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setRecordToUpdate(null);
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={loading || editLoading}
            >
              {" "}
              {edit ? (
                !editLoading ? (
                  "Edit"
                ) : (
                  <span className="loading loading-spinner"></span>
                )
              ) : !loading ? (
                "Add"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ExpenseForm;
