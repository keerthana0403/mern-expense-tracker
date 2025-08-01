import React, { useState } from "react";
import useExpenseRecords from "../zustand/useExpenseRecords";
import toast from "react-hot-toast";

const useAddExpense = () => {
  const [loading, setLoading] = useState(false);
  const { addRecord } = useExpenseRecords();

  const addExpenseRecord = async (
    { title, amount, type, category, paymentMethod, date },
    setShowModal
  ) => {
    if (!title || !amount || !type || !category || !paymentMethod || !date) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/expense-record/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          type,
          category,
          paymentMethod,
          date,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      addRecord(data);
      toast.success("Transaction added");
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addExpenseRecord };
};

export default useAddExpense;
