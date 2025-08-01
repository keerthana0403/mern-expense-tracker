import React, { useState } from "react";
import useExpenseRecords from "../zustand/useExpenseRecords";
import toast from "react-hot-toast";

const useUpdateExpense = () => {
  const [loading, setLoading] = useState(false);
  const { updateRecord } = useExpenseRecords();

  const updateExpenseRecord = async (recordId, newRecord, setShowModal) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/expense-record/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      updateRecord(data);
      toast.success("Updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateExpenseRecord };
};

export default useUpdateExpense;
